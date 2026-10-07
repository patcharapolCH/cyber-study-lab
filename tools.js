'use strict';
// Cyber Study Lab - Interactive Security Tools & Calculators

window.initSecurityTools = function() {
    initSyslogTool();
    initCVSSTool();
    initCryptoSimulator();
    initPacketInspector();
};

// ==========================================
// 1. Syslog PRI Live Calculator & Decoder
// ==========================================
function initSyslogTool() {
    const facilitySelect = document.getElementById('syslog-facility');
    const severitySelect = document.getElementById('syslog-severity');
    const forwardResult = document.getElementById('syslog-forward-result');
    const reverseInput = document.getElementById('syslog-reverse-input');
    const reverseResult = document.getElementById('syslog-reverse-result');

    if (!facilitySelect || !severitySelect) return;

    function updateForward() {
        const fac = parseInt(facilitySelect.value, 10);
        const sev = parseInt(severitySelect.value, 10);
        const pri = (fac * 8) + sev;
        const facName = facilitySelect.options[facilitySelect.selectedIndex].text;
        const sevName = severitySelect.options[severitySelect.selectedIndex].text;
        
        let sevClass = 'sev-low';
        if (sev <= 2) sevClass = 'sev-crit';
        else if (sev <= 4) sevClass = 'sev-warn';

        forwardResult.innerHTML = `
            <div class="calc-badge ${sevClass}">PRI = <strong>${pri}</strong></div>
            <div class="calc-breakdown">
                <code>PRI = (${fac} × 8) + ${sev} = ${fac * 8} + ${sev} = <strong>${pri}</strong></code>
                <p>📍 <strong>Facility:</strong> ${facName}</p>
                <p>⚠️ <strong>Severity:</strong> <span class="${sevClass}">${sevName}</span></p>
            </div>
        `;
    }

    facilitySelect.addEventListener('change', updateForward);
    severitySelect.addEventListener('change', updateForward);
    updateForward();

    if (reverseInput) {
        reverseInput.addEventListener('input', () => {
            const val = parseInt(reverseInput.value, 10);
            if (isNaN(val) || val < 0 || val > 191) {
                reverseResult.innerHTML = '<p class="muted">กรุณาใส่ตัวเลข PRI ระหว่าง 0 ถึง 191</p>';
                return;
            }
            const fac = Math.floor(val / 8);
            const sev = val % 8;
            
            const sevNames = ['Emergency (0)', 'Alert (1)', 'Critical (2)', 'Error (3)', 'Warning (4)', 'Notice (5)', 'Informational (6)', 'Debug (7)'];
            const facNames = {
                0: 'kernel messages (0)', 1: 'user-level (1)', 2: 'mail system (2)', 3: 'system daemons (3)',
                4: 'auth/security (4)', 5: 'syslogd (5)', 9: 'clock/cron (9)', 10: 'authpriv (10)',
                16: 'local0 (16)', 17: 'local1 (17)', 18: 'local2 (18)', 19: 'local3 (19)',
                20: 'local4 (20)', 21: 'local5 (21)', 22: 'local6 (22)', 23: 'local7 (23)'
            };
            const facText = facNames[fac] || `Facility ${fac}`;
            const sevText = sevNames[sev];

            let sevClass = 'sev-low';
            if (sev <= 2) sevClass = 'sev-crit';
            else if (sev <= 4) sevClass = 'sev-warn';

            reverseResult.innerHTML = `
                <div class="calc-breakdown">
                    <code>${val} ÷ 8 = <strong>${fac}</strong> เศษ <strong>${sev}</strong></code>
                    <p>📍 <strong>Facility:</strong> <strong>${fac}</strong> (${facText})</p>
                    <p>⚠️ <strong>Severity:</strong> <strong class="${sevClass}">${sev} (${sevText})</strong></p>
                </div>
            `;
        });
    }
}

// ==========================================
// 2. CVSS v3.1 Base Score Calculator & Gauge
// ==========================================
function initCVSSTool() {
    const form = document.getElementById('cvss-calculator-form');
    const scoreDisplay = document.getElementById('cvss-score');
    const ratingDisplay = document.getElementById('cvss-rating');
    const vectorDisplay = document.getElementById('cvss-vector');

    if (!form) return;

    function calculateCVSS() {
        const av = form.elements['cvss-av'].value;
        const ac = form.elements['cvss-ac'].value;
        const pr = form.elements['cvss-pr'].value;
        const ui = form.elements['cvss-ui'].value;
        const s = form.elements['cvss-s'].value;
        const c = form.elements['cvss-c'].value;
        const i = form.elements['cvss-i'].value;
        const a = form.elements['cvss-a'].value;

        // Weights according to FIRST CVSS v3.1 specification
        const avWeights = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 };
        const acWeights = { L: 0.77, H: 0.44 };
        const prWeights = {
            U: { N: 0.85, L: 0.62, H: 0.27 },
            C: { N: 0.85, L: 0.68, H: 0.50 }
        };
        const uiWeights = { N: 0.85, R: 0.62 };
        const ciaWeights = { N: 0.0, L: 0.22, H: 0.56 };

        const wAV = avWeights[av];
        const wAC = acWeights[ac];
        const wPR = prWeights[s][pr];
        const wUI = uiWeights[ui];

        const wC = ciaWeights[c];
        const wI = ciaWeights[i];
        const wA = ciaWeights[a];

        // ISS (Impact Sub-Score)
        const iss = 1 - ((1 - wC) * (1 - wI) * (1 - wA));
        let impact = 0;
        if (s === 'U') {
            impact = 6.42 * iss;
        } else {
            impact = 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
        }

        // Exploitability
        const exploitability = 8.22 * wAV * wAC * wPR * wUI;

        let baseScore = 0;
        if (impact <= 0) {
            baseScore = 0.0;
        } else if (s === 'U') {
            baseScore = Math.min(10.0, Math.ceil((impact + exploitability) * 10) / 10);
        } else {
            baseScore = Math.min(10.0, Math.ceil((1.08 * (impact + exploitability)) * 10) / 10);
        }

        let rating = 'None';
        let badgeClass = 'badge-none';
        if (baseScore >= 9.0) {
            rating = 'Critical';
            badgeClass = 'badge-crit';
        } else if (baseScore >= 7.0) {
            rating = 'High';
            badgeClass = 'badge-high';
        } else if (baseScore >= 4.0) {
            rating = 'Medium';
            badgeClass = 'badge-med';
        } else if (baseScore >= 0.1) {
            rating = 'Low';
            badgeClass = 'badge-low';
        }

        scoreDisplay.textContent = baseScore.toFixed(1);
        ratingDisplay.textContent = rating;
        ratingDisplay.className = `cvss-rating-pill ${badgeClass}`;
        vectorDisplay.textContent = `CVSS:3.1/AV:${av}/AC:${ac}/PR:${pr}/UI:${ui}/S:${s}/C:${c}/I:${i}/A:${a}`;
    }

    form.addEventListener('change', calculateCVSS);
    calculateCVSS();
}

// ==========================================
// 3. Cryptography & Digital Signature Simulator
// ==========================================
function initCryptoSimulator() {
    const scenarioSelect = document.getElementById('crypto-scenario');
    const vizContainer = document.getElementById('crypto-viz');

    if (!scenarioSelect || !vizContainer) return;

    const scenarios = {
        confidentiality: {
            title: "1. การส่งข้อความลับ (Confidentiality) โดยใช้ Asymmetric Encryption",
            steps: [
                { title: "ขั้นตอนที่ 1: เตรียมคู่กุญแจ", desc: "Bob (ผู้รับ) สร้างคู่กุญแจ: <strong>Public Key ของ Bob</strong> (แจกให้ทุกคน) และ <strong>Private Key ของ Bob</strong> (เก็บเป็นความลับสูงสุด)" },
                { title: "ขั้นตอนที่ 2: ฝั่งผู้ส่งเข้ารหัส", desc: "Alice ต้องการส่งจดหมายลับหา Bob จึงนำข้อความ Plaintext มาเข้ารหัสด้วย <span class='hl-pub'>Public Key ของ Bob</span> ได้เป็น Ciphertext" },
                { title: "ขั้นตอนที่ 3: ส่งผ่านอินเทอร์เน็ต", desc: "Ciphertext วิ่งผ่านเครือข่าย หากคนร้ายดักจับได้ จะอ่านไม่ออก เพราะไม่มีกุญแจถอดรหัส" },
                { title: "ขั้นตอนที่ 4: ฝั่งผู้รับถอดรหัส", desc: "Bob ได้รับ Ciphertext จึงใช้ <span class='hl-priv'>Private Key ของ Bob</span> ที่มีคนเดียวในโลก มาถอดรหัส ได้ Plaintext ข้อความเดิม" }
            ],
            takeaway: "💡 จำแม่นๆ: ใครควรเปิดอ่านได้? → Bob → จึงเข้ารหัสด้วย Public Key ของผู้รับ และถอดด้วย Private Key ของผู้รับ"
        },
        signature: {
            title: "2. การลงนามดิจิทัล (Digital Signature) เพื่อพิสูจน์ผู้ส่งและป้องกันการแก้ไข",
            steps: [
                { title: "ขั้นตอนที่ 1: คำนวณ Hash", desc: "Alice นำสัญญาต้นฉบับเข้าฟังก์ชัน Hash (เช่น SHA-256) ได้ค่า Message Digest ความยาวคงที่" },
                { title: "ขั้นตอนที่ 2: ลงนามด้วยกุญแจส่วนตัว", desc: "Alice ใช้ <span class='hl-priv'>Private Key ของ Alice</span> เข้ารหัสค่า Digest นั้น ผลลัพธ์ที่ได้คือ <strong>Digital Signature</strong> แนบไปพร้อมสัญญา" },
                { title: "ขั้นตอนที่ 3: Bob ได้รับสัญญาและลายเซ็น", desc: "Bob นำ <span class='hl-pub'>Public Key ของ Alice</span> มาถอดรหัส Digital Signature ได้ค่า Digest ต้นทาง" },
                { title: "ขั้นตอนที่ 4: ตรวจสอบความถูกต้อง", desc: "Bob คำนวณ Hash ของเอกสารสัญญาที่ได้รับด้วยตนเอง แล้วเทียบกับ Digest ถ้าค่าตรงกัน = เอกสารมาจาก Alice จริง (Authenticity) และไม่ถูกแอบแก้ไข (Integrity & Non-repudiation)" }
            ],
            takeaway: "💡 จำแม่นๆ: ใครเป็นคนส่งและต้องพิสูจน์ตัวตน? → Alice → จึงลงนามด้วย Private Key ของผู้ส่ง และตรวจด้วย Public Key ของผู้ส่ง"
        },
        hybrid: {
            title: "3. การเข้ารหัสแบบผสม (Hybrid Encryption - เช่น HTTPS / TLS)",
            steps: [
                { title: "ขั้นตอนที่ 1: แลกเปลี่ยนกุญแจด้วย Asymmetric", desc: "ไคลเอนต์และเซิร์ฟเวอร์ใช้ Asymmetric (เช่น RSA หรือ Diffie-Hellman) ร่วมกับใบรับรอง CA เพื่อตกลงกุญแจลับชั่วคราว (Session Key)" },
                { title: "ขั้นตอนที่ 2: เข้ารหัสข้อมูลจริงด้วย Symmetric", desc: "เมื่อทั้งสองฝ่ายได้ Session Key ลับอันเดียวกันแล้ว จะเปลี่ยนมาเข้ารหัสข้อมูลจริงด้วย <strong>Symmetric (เช่น AES-256)</strong> ซึ่งมีความเร็วสูงมาก" },
                { title: "ข้อดีของการรวมสองแบบ", desc: "ได้ทั้งความปลอดภัยในการแจกจ่ายกุญแจของ Asymmetric และได้ความเร็วระดับกิกะบิตต่อวินาทีของ Symmetric" }
            ],
            takeaway: "💡 โลกจริงไม่ใช้ Asymmetric เข้ารหัสข้อมูลใหญ่ๆ เพราะช้าเกินไป จึงใช้ Asymmetric แค่ตอนจับมือก่อน แล้วใช้ Symmetric ส่งข้อมูลจริง"
        }
    };

    function renderScenario(key) {
        const sc = scenarios[key];
        if (!sc) return;
        vizContainer.innerHTML = `
            <div class="crypto-flow-card">
                <h4>${sc.title}</h4>
                <div class="flow-steps">
                    ${sc.steps.map((s, idx) => `
                        <div class="flow-step-item">
                            <div class="step-num">${idx + 1}</div>
                            <div class="step-content">
                                <strong>${s.title}</strong>
                                <p>${s.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="flow-takeaway">${sc.takeaway}</div>
            </div>
        `;
    }

    scenarioSelect.addEventListener('change', () => renderScenario(scenarioSelect.value));
    renderScenario(scenarioSelect.value);
}

// ==========================================
// 4. 5-Tuple Network Packet Inspector
// ==========================================
function initPacketInspector() {
    const presetSelect = document.getElementById('tuple-presets');
    const tableContainer = document.getElementById('tuple-display');

    if (!presetSelect || !tableContainer) return;

    const presets = {
        web: {
            name: "1. การเรียกดูเว็บปกติ (HTTPS Request)",
            srcIp: "192.168.1.105 (PC ภายใน)",
            dstIp: "142.250.190.46 (Google Server)",
            srcPort: "51423 (Ephemeral Port สุ่ม)",
            dstPort: "443 (HTTPS)",
            proto: "TCP (Protocol 6)",
            analysis: "ทราฟฟิกเว็บมาตรฐานขาออกจากไคลเอนต์ปลายทางพอร์ต 443 ข้อมูลใน Payload ได้รับการเข้ารหัสด้วย TLS"
        },
        dns: {
            name: "2. การสอบถามชื่อโดเมน (DNS Query)",
            srcIp: "192.168.1.105 (เครื่องลูกข่าย)",
            dstIp: "8.8.8.8 (Google DNS)",
            srcPort: "58921 (สุ่ม)",
            dstPort: "53 (DNS)",
            proto: "UDP (Protocol 17)",
            analysis: "การค้นหาหมายเลข IP จากชื่อโดเมน หากพบการส่งข้อมูลขนาดใหญ่หรือพอร์ต 53 ต่อเนื่องผิดปกติ อาจเป็น DNS Tunneling Exfiltration"
        },
        c2: {
            name: "3. สัญญาณเตือนภัย: การติดต่อ Command & Control (C2 Beacon)",
            srcIp: "10.0.0.54 (เครื่องการเงินในบริษัท)",
            dstIp: "185.220.101.4 (Known Malicious IP ในรัสเซีย)",
            srcPort: "49210",
            dstPort: "8080 (Non-standard HTTP)",
            proto: "TCP (Protocol 6)",
            analysis: "⚠️ ตรวจพบ Anomaly: เครื่องในแผนกการเงินติดต่อออกไปยัง IP ที่อยู่ในฐานข้อมูล Threat Intelligence อย่างสม่ำเสมอทุกๆ 60 วินาที บ่งชี้พฤติกรรมมัลแวร์ C2 Beaconing"
        }
    };

    function renderTuple(key) {
        const item = presets[key];
        if (!item) return;
        tableContainer.innerHTML = `
            <div class="tuple-card">
                <h4>${item.name}</h4>
                <div class="tuple-grid">
                    <div class="tuple-box">
                        <span class="tuple-label">Source IP (IP ต้นทาง)</span>
                        <strong>${item.srcIp}</strong>
                    </div>
                    <div class="tuple-box">
                        <span class="tuple-label">Destination IP (IP ปลายทาง)</span>
                        <strong>${item.dstIp}</strong>
                    </div>
                    <div class="tuple-box">
                        <span class="tuple-label">Source Port (พอร์ตต้นทาง)</span>
                        <strong>${item.srcPort}</strong>
                    </div>
                    <div class="tuple-box">
                        <span class="tuple-label">Destination Port (พอร์ตปลายทาง)</span>
                        <strong>${item.dstPort}</strong>
                    </div>
                    <div class="tuple-box tuple-proto">
                        <span class="tuple-label">Protocol (โปรโตคอล)</span>
                        <strong>${item.proto}</strong>
                    </div>
                </div>
                <div class="tuple-analysis">
                    <strong>การวิเคราะห์ของนักวิเคราะห์ SOC:</strong>
                    <p>${item.analysis}</p>
                </div>
            </div>
        `;
    }

    presetSelect.addEventListener('change', () => renderTuple(presetSelect.value));
    renderTuple(presetSelect.value);
}
