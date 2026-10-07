# 🛡️ Cyber Security Study Lab Pro

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://pages.github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **ศูนย์การเรียนรู้และคลังข้อสอบความมั่นคงปลอดภัยไซเบอร์ (Cyber Security Study Lab)**  
> พัฒนาขึ้นสำหรับการทบทวนเนื้อหา ติวสอบ และฝึกปฏิบัติการประเมินความปลอดภัย ครอบคลุม 7 บทเรียนหลักตามหลักสูตรมาตรฐาน พร้อม Interactive Calculators, 3D Flashcards และคลังข้อสอบ 70 ข้อ + 7 สถานการณ์จำลอง

---

## 🌟 จุดเด่นของโปรเจกต์ (Key Features)

| ฟีเจอร์ | รายละเอียด |
| :--- | :--- |
| 📖 **7 Comprehensive Chapters** | สรุปบทเรียนภาษาไทยเชิงลึก มีทั้ง Quick Review สรุปประเด็นสำคัญ และ Full Lesson เนื้อหาฉบับเต็ม |
| 📝 **70 Practice MCQs** | คลังข้อสอบปรนัย 70 ข้อ (บทละ 10 ข้อ) พร้อมระบบจับเวลา คำใบ้ (Hint) และเฉลยวิเคราะห์ตัวเลือกอย่างละเอียด |
| ✍️ **7 Scenario Essay Questions** | ข้อสอบอัตนัยสถานการณ์จำลอง 7 บท พร้อมแนวทางตอบแบบผู้เชี่ยวชาญ (Rubric Scoring) |
| 🗂️ **32 Interactive 3D Flashcards** | บัตรคำศัพท์ 3D พลิกดูคำอธิบาย (Flip Card) พร้อมระบบกรองแยกตามบทเรียน |
| 🧮 **4 Live Security Calculators** | เครื่องมือคำนวณจริง: Syslog PRI Calculator, CVSS v3.1 Score Estimator, Crypto Flow Simulator, 5-Tuple Inspector |
| 🚀 **Zero Dependency & Instant Load** | พัฒนาด้วย Pure Vanilla JS + CSS Glassmorphism ไม่ต้องใช้ `npm install` เปิดผ่าน Browser หรือ GitHub Pages ได้ทันที |
| 💾 **Progress Auto-Save** | บันทึกสถิติคลังข้อสอบและผลคะแนนลงใน `localStorage` อัตโนมัติ |

---

## 📚 โครงสร้างเนื้อหา 7 บทเรียน (Curriculum)

1. **บทที่ 6: ภัยคุกคามทั่วไป (Common Network Threats)**
   - DoS/DDoS, Amplification Attacks, Man-in-the-Middle (ARP Spoofing, DNS Poisoning), Reconnaissance
2. **บทที่ 7: ผู้โจมตีและเครื่องมือ (Threat Actors & Tools)**
   - ประเภทแฮกเกอร์ (White/Gray/Black, Script Kiddie, Hacktivist, State-Sponsored), เครื่องมือโจมตี vs เครื่องมือป้องกัน (Nmap, Wireshark, Metasploit)
3. **บทที่ 8: การตรวจสอบเครือข่ายและการเฝ้าระวัง (Network Monitoring)**
   - Network Taps vs SPAN/Port Mirroring, SIEM, SOAR, NetFlow v5 vs v9 vs IPFIX, Syslog RFC 3164/5424
4. **บทที่ 9: วิทยาการรหัสลับและความปลอดภัย (Cryptography in Network)**
   - Symmetric (AES, 3DES), Asymmetric (RSA, ECC), Hash (SHA-256, MD5), PKI, Digital Signatures, VPN (IPsec AH/ESP, TLS/SSL)
5. **บทที่ 10: การประเมินช่องโหว่ (Vulnerability Assessment)**
   - CVE vs NVD, มาตรฐาน CVSS v3.1 (Base Score, Metrics Vector), Vulnerability Scanning vs Penetration Testing
6. **บทที่ 11: ข้อมูลความปลอดภัยและข่าวกรองภัย (Security Data & Threat Intelligence)**
   - 5-Tuple Network Traffic, Host-based vs Network-based Data, Cyber Threat Intelligence (CTI), Indicators of Compromise (IoC), STIX/TAXII
7. **บทที่ 12: กรอบงานและนโยบายความมั่นคงปลอดภัย (Security Frameworks)**
   - CIA Triad, Defense-in-Depth, Zero Trust Architecture, NIST CSF 2.0 (GV-ID-PR-DE-RS-RC), ISO/IEC 27001, MITRE ATT&CK Framework

---

## 📁 โครงสร้างไดเรกทอรี (Directory Structure)

```text
cyber-study-lab/
├── index.html            # หน้าเว็บหลัก Single Page Application (SPA)
├── styles.css            # ธีม Cyber Dark Modern + Glassmorphism + Responsive Design
├── app.js                # Core Controller, Navigation Router, State Management
├── lessons.js            # Metadata สรุปย่อ 7 บท และคลัง Flashcards 32 ชุด
├── full-lessons.js       # เนื้อหาบทเรียนฉบับเต็มภาษาไทย (Full In-depth Content)
├── questions.js          # คลังข้อสอบปรนัย 70 ข้อ และอัตนัย 7 สถานการณ์
├── tools.js              # ระบบคำนวณ Syslog, CVSS v3.1, Crypto & 5-Tuple Simulator
├── notes/                # เอกสารสรุปเนื้อหา Markdown สำหรับอ่านทบทวน
│   ├── 06_บทที่_6_ภัยคุกคามทั่วไป_CommonThreats.md
│   ├── 07_บทที่_7_ผู้โจมตีและเครื่องมือ_AttackerAndTools.md
│   ├── 08_บทที่_8_การตรวจสอบเครือข่าย_NetMonitor.md
│   ├── 09_บทที่_9_การเข้ารหัสและความปลอดภัย_CryptographyNet.md
│   ├── 10_บทที่_10_การประเมินช่องโหว่_VulnerabilityAssessment.md
│   ├── 11_บทที่_11_ข้อมูลความปลอดภัยและข่าวกรองภัย_SecurityData.md
│   ├── 12_บทที่_12_กรอบงานความมั่นคงปลอดภัย_SecurityFramework.md
│   └── README_สารบัญสรุปวิชา_CyberSecurity.md
├── slides/               # เอกสารสไลด์บรรยายประกอบการเรียน (PDF บทที่ 6-12)
├── README.md             # คู่มือและเอกสารแนะนำโปรเจกต์
├── LICENSE               # สิทธิ์การใช้งาน MIT License
└── .gitignore            # ตั้งค่าไฟล์ที่ไม่ต้องการให้อัปโหลดขึ้น Git
```

---

## 🚀 วิธีเปิดใช้งาน (Getting Started)

### 1. เปิดใช้งานในเครื่อง (Local Run)
ไม่ต้องติดตั้ง Dependencies ใด ๆ ทั้งสิ้น:
- **วิธีที่ 1:** ดับเบิลคลิกเปิดไฟล์ `index.html` บนเบราว์เซอร์ (Chrome, Edge, Firefox, Safari) ได้ทันที
- **วิธีที่ 2:** เปิดโฟลเดอร์นี้ใน VS Code แล้วคลิกขวาที่ `index.html` เลือก **Open with Live Server**

### 2. วิธีนำขึ้น GitHub และเปิด GitHub Pages ให้เพื่อนเข้าใช้งานได้ฟรี

1. สร้าง Repository ใหม่บน [GitHub.com](https://github.com/new) ตั้งชื่อว่า `cyber-study-lab`
2. เปิด Terminal หรือ PowerShell ในโฟลเดอร์นี้ แล้วสั่งคำสั่ง:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/cyber-study-lab.git
   git branch -M main
   git push -u origin main
   ```
3. **เปิด GitHub Pages:**
   - ไปที่แท็บ **Settings** ของ Repository บน GitHub
   - เลื่อนไปที่เมนู **Pages** ด้านซ้าย
   - ตรงส่วน **Branch** เลือก `main` และโฟลเดอร์ `/ (root)` แล้วกด **Save**
   - รอ 1-2 นาที คุณจะได้ URL เว็บไซต์ เช่น:  
     `https://<YOUR-USERNAME>.github.io/cyber-study-lab/`

---

## 🛠️ เครื่องมือคำนวณและทดลองในระบบ (Interactive Calculators)

1. **Syslog PRI Calculator:** คำนวณค่า Priority ตามสูตร `PRI = (Facility × 8) + Severity` พร้อมถอดรหัสแบบ Real-time
2. **CVSS v3.1 Quick Estimator:** คำนวณคะแนนความรุนแรงของช่องโหว่ตามเวกเตอร์ Base Metrics (AV, AC, PR, UI, S, C, I, A)
3. **Crypto Flow Visualizer:** จำลองการทำงานของการเข้ารหัสแบบ Symmetric, Asymmetric, Hash และ Digital Signature
4. **5-Tuple Network Inspector:** วิเคราะห์ Session Flow จาก Source IP, Destination IP, Source Port, Destination Port และ Protocol

---

## 📄 ใบอนุญาต (License)

โปรเจกต์นี้เผยแพร่ภายใต้ใบอนุญาต **MIT License** - สามารถนำไปใช้เพื่อการศึกษา ทบทวนบทเรียน และพัฒนาต่อยอดได้อย่างอิสระ
