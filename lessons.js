'use strict';
// Cyber Study Lab - Core Lessons & Metadata (Modules 6 to 12)
window.LESSONS = [
  {
    "id": 6,
    "title": "ภัยคุกคามและการโจมตีทั่วไป",
    "description": "Malware · Worms · Social Eng · DoS/DDoS · Evasion",
    "color": "#4e80ee",
    "slideCount": 39,
    "source": "slides/06-CommonThreats.pdf",
    "html": "<h2>บท 6 • ภัยคุกคามและการโจมตีทั่วไป (Common Threats & Attacks)</h2>\n<p class=\"ref\">อ้างอิง: 06-CommonThreats.pdf • 39 หน้า • สไลด์แกนหลักหน้า 4–15 (Malware), 16–26 (Recon/Access/Social Eng), 27–34 (DoS/DDoS/Buffer Overflow/Evasion)</p>\n<p class=\"big\">มัลแวร์ส่งผลร้าย → ลาดตระเวนหาช่องโหว่ → เจาะระบบ/ขัดขวางการทำงาน → หลบหลีกการตรวจจับ</p>\n<div class=\"example\"><b>จำแนก 3 มัลแวร์หลักให้แม่น:</b><br>\n• <b>Virus:</b> ต้องแทรกตัวในโปรแกรมอื่น (Host program) และต้องมีคนกดเปิดหรือรันโปรแกรมจึงจะแพร่กระจาย<br>\n• <b>Worm:</b> เป็นโปรแกรมอิสระ (Self-contained) จำลองและแพร่กระจายข้ามเครือข่ายได้เองอัตโนมัติผ่านช่องโหว่<br>\n• <b>Trojan horse:</b> พรางตัวเป็นโปรแกรมที่ดูน่าเชื่อถือ หลอกให้ผู้ใช้ติดตั้ง เพื่อเปิด Backdoor หรือขโมยข้อมูล</div>\n\n<table>\n<tr><th>ประเภทมัลแวร์</th><th>พฤติกรรมเด่นในข้อสอบ</th><th>ตัวอย่าง/กรณีศึกษา</th></tr>\n<tr><td>Worm</td><td>แพร่กระจายรวดเร็ว ทำเครือข่ายอืด ไม่ต้องอาศัยผู้ใช้</td><td><b>Code Red</b> (ปี 2001 ใน 19 ชม. ติด 300,000 เซิร์ฟเวอร์), <b>SQL Slammer</b> (buffer overflow ใน MS SQL เซิร์ฟเวอร์ติดเชื้อเพิ่มเท่าตัวทุก 8.5 วินาทีเพราะไม่ลงแพตช์ 6 เดือน)</td></tr>\n<tr><td>Worm Components</td><td>3 ส่วนประกอบสำคัญ</td><td>1. <b>Enabling vulnerability</b> (เจาะช่องโหว่ติดตั้งตัว) 2. <b>Propagation mechanism</b> (จำลองตัวและสแกนหาเป้าหมายใหม่) 3. <b>Payload</b> (โค้ดทำอันตราย เช่น Backdoor หรือ DoS)</td></tr>\n<tr><td>Ransomware</td><td>เข้ารหัสล็อกไฟล์/ระบบ เพื่อเรียกค่าไถ่</td><td>แพร่ผ่าน Phishing, Malvertising หรือโทรหลอกลวง</td></tr>\n<tr><td>Scareware</td><td>หลอกให้ตกใจกลัว (Shock/Anxiety) ด้วยคำเตือนปลอม</td><td>หน้าต่างเด้งเตือนว่าเครื่องติดไวรัส ให้รีบจ่ายเงินซื้อโปรแกรมกำจัด</td></tr>\n<tr><td>Rootkit</td><td>ฝังตัวลึกใน OS ซ่อนกระบวนการและไฟล์</td><td>ปกปิดการมีอยู่ของผู้โจมตี ดัดแปลงผลลัพธ์ของคำสั่งระบบ</td></tr>\n<tr><td>Spyware / Adware</td><td>แอบสอดแนมข้อมูล / แสดงโฆษณาป๊อปอัปน่ารำคาญ</td><td>ดักคีย์บอร์ด (Keylogger), ขโมยประวัติเว็บ</td></tr>\n</table>\n\n<h3>ขั้นตอนการลาดตระเวน (Reconnaissance Attacks)</h3>\n<p class=\"big\">Information Query (Whois/Google) → Ping Sweep → Port Scan (Nmap) → Vulnerability Scan (Nessus) → Exploitation (Metasploit)</p>\n\n<h3>การโจมตีเพื่อเข้าถึง (Access Attacks)</h3>\n<ul>\n<li><b>Password Attacks:</b> Brute-force, Dictionary attack</li>\n<li><b>Trust Exploitation:</b> เจาะเครื่อง A ที่ได้รับความไว้วางใจ เพื่อใช้เป็นสะพานผ่านเข้าเครื่อง B</li>\n<li><b>Port Redirection:</b> ส่งต่อทราฟฟิก (เช่น ผ่าน SSH port 22) เข้าสู่พอร์ตปลายทาง (เช่น Telnet port 23) ข้ามไฟร์วอลล์</li>\n<li><b>Man-in-the-Middle (MitM):</b> แทรกตัวกลางระหว่างคู่สนทนาเพื่อดักหรือดัดแปลงข้อมูล</li>\n<li><b>Buffer Overflow:</b> ส่งข้อมูลล้นพื้นที่หน่วยความจำที่จองไว้ ทำให้โปรแกรมทำงานผิดพลาดหรือ Crash เช่น <i>Ping of Death</i> (ส่ง IP packet เกิน 65,535 bytes)</li>\n</ul>\n\n<h3>เทคนิคหลอกลวงทางสังคม (Social Engineering)</h3>\n<table>\n<tr><th>เทคนิค</th><th>จุดจำข้อสอบ</th></tr>\n<tr><td>Pretexting</td><td>กุเรื่อง/สมมุติสถานการณ์เพื่อหลอกถามข้อมูลส่วนบุคคลหรือการเงิน</td></tr>\n<tr><td>Phishing</td><td>ส่งอีเมลปลอมแปลงเป็นสถาบันที่น่าเชื่อถือเพื่อหลอกเอารหัสผ่านหรือส่งมัลแวร์</td></tr>\n<tr><td>Spear Phishing</td><td>Phishing แบบเจาะจงเป้าหมายเฉพาะบุคคลหรือองค์กรโดยเฉพาะ</td></tr>\n<tr><td>Baiting</td><td>วางสื่อบันทึกข้อมูล (เช่น Flash Drive ติดมัลแวร์) ล่อไว้ในที่สาธารณะ</td></tr>\n<tr><td>Tailgating / Piggybacking</td><td>เดินตามคนมีบัตรเข้าประตูพื้นที่หวงห้ามอย่างกระชั้นชิด</td></tr>\n<tr><td>Shoulder Surfing</td><td>แอบชะโงกดูหน้าจอหรือแป้นพิมพ์ขณะเหยื่อพิมพ์รหัสผ่าน</td></tr>\n<tr><td>Dumpster Diving</td><td>คุ้ยถังขยะเพื่อค้นหาเอกสารสำคัญหรือรหัสผ่านที่ทิ้งแล้ว</td></tr>\n<tr><td>Quid Pro Quo</td><td>เสนอผลประโยชน์หรือของขวัญแลกเปลี่ยนกับข้อมูลลับ (Something for Something)</td></tr>\n<tr><td>SET (Social Engineer Toolkit)</td><td>ชุดเครื่องมือทดสอบเจาะระบบด้าน Social Engineering สำหรับฝ่ายป้องกัน</td></tr>\n</table>\n\n<h3>องค์ประกอบของ DDoS</h3>\n<p><b>Botmaster</b> (ผู้บงการ) → สั่งการ <b>Handler / C&C Server</b> (แม่ข่ายสั่งการ) → ควบคุม <b>Zombies / Bots (Botnet)</b> → รุมยิงทราฟฟิกถล่ม <b>Victim</b></p>\n\n<h3>เทคนิคหลบหลีกการตรวจจับ (Evasion Techniques)</h3>\n<ul>\n<li><b>Traffic Fragmentation:</b> แยกเพย์โหลดเป็นแพ็กเก็ตย่อยเพื่อหลบหลีก signature ของ IPS แล้วไปประกอบร่างใหม่ที่ปลายทาง</li>\n<li><b>Traffic Substitution / Insertion:</b> เข้ารหัสแบบอื่น (เช่น Unicode) หรือแทรกไบต์ขยะเพื่อหลอกระบบตรวจจับ</li>\n<li><b>Protocol-level Misinterpretation:</b> ใช้ประโยชน์จากข้อผิดพลาดในการตรวจสอบ TTL หรือ Checksum หลอกให้ไฟร์วอลล์ปล่อยผ่าน</li>\n<li><b>Pivoting:</b> ใช้เครื่องในเครือข่ายที่เจาะสำเร็จเป็นฐานขยายการโจมตีไปยังเครื่องอื่น</li>\n<li><b>Encryption & Tunneling:</b> ซ่อนเพย์โหลดในทราฟฟิกที่เข้ารหัสเพื่อไม่ให้ระบบเครือข่ายเปิดตรวจได้</li>\n</ul>\n<details class=\"study-check\"><summary>ลองตอบเอง: Code Red กับ SQL Slammer เป็นมัลแวร์ประเภทใด และต่างกันอย่างไร?</summary><p>ทั้งคู่เป็น <b>Worm</b> ที่แพร่กระจายได้เองข้ามเครือข่าย แต่ SQL Slammer มีจุดเด่นคือโจมตี Buffer Overflow ใน MS SQL Server ทำให้ติดเชื้อเร็วมาก (เพิ่มเท่าตัวทุก 8.5 วินาที) และแพร่ระบาดเพราะขาดการลงแพตช์ที่ออกมาก่อนนั้น 6 เดือน</p></details>\n"
  },
  {
    "id": 7,
    "title": "ผู้โจมตีและเครื่องมือ",
    "description": "Threat · Vulnerability · Exploit · Tools · IOC/IOA",
    "color": "#5cedd0",
    "slideCount": 30,
    "source": "slides/07-Attacker&tools.pdf",
    "html": "<h2>บท 7 • ผู้โจมตีและเครื่องมือ (Attackers and Their Tools)</h2>\n<p class=\"ref\">อ้างอิง: 07-Attacker&amp;tools.pdf • 30 หน้า • แกนหลักหน้า 4–15 (แนวคิด/ผู้โจมตี), 19–25 (เครื่องมือ)</p>\n<p class=\"big\">Asset (ทรัพย์สิน) มี Vulnerability (จุดอ่อน) → Threat Actor (ผู้ก่อภัย) ใช้ Exploit (วิธีโจมตี) → เกิด Risk และ Impact</p>\n<div class=\"example\"><b>ท่องให้ขึ้นใจ:</b><br>\n• <b>Asset:</b> สิ่งที่ต้องปกป้อง เช่น ฐานข้อมูล เซิร์ฟเวอร์<br>\n• <b>Vulnerability:</b> บั๊ก หรือการตั้งค่าผิดพลาดในระบบ<br>\n• <b>Threat / Threat Actor:</b> ภัย หรือบุคคล/กลุ่มคนที่เป็นแหล่งอันตราย<br>\n• <b>Exploit:</b> โค้ดหรือเทคนิคที่ใช้เจาะช่องโหว่<br>\n• <b>Risk:</b> โอกาสเกิดและความเสียหายที่อาจเกิดขึ้น (Likelihood × Impact)</div>\n\n<table>\n<tr><th>การจัดการความเสี่ยง 4 รูปแบบ</th><th>ความหมาย</th><th>ตัวอย่างจริง</th></tr>\n<tr><td><b>Acceptance / Retention</b></td><td>ยอมรับความเสี่ยงที่เหลืออยู่</td><td>ระบบทดสอบที่ไม่สำคัญ ต้นทุนป้องกันแพงกว่าความเสียหายที่อาจเกิด</td></tr>\n<tr><td><b>Avoidance</b></td><td>หลีกเลี่ยงโดยยุติกิจกรรมที่เป็นต้นเหตุ</td><td>ปิดบริการหรือพอร์ตเก่าที่ไม่จำเป็น ตัดการเชื่อมต่ออินเทอร์เน็ต</td></tr>\n<tr><td><b>Reduction / Mitigation</b></td><td>ลดโอกาสหรือผลกระทบด้วยมาตรการ</td><td>ติดตั้งแพตช์, ใช้ MFA, ติดตั้งไฟร์วอลล์, สำรองข้อมูล</td></tr>\n<tr><td><b>Transfer / Sharing</b></td><td>โอนหรือแบ่งปันภาระความเสียหายให้ผู้อื่น</td><td>ซื้อประกันภัยไซเบอร์ (Cyber Insurance), จ้างบริการภายนอก</td></tr>\n</table>\n\n<h3>ประเภทผู้โจมตีและแรงจูงใจ (Threat Actors)</h3>\n<ul>\n<li><b>White Hat:</b> ผู้เชี่ยวชาญที่มีจริยธรรม ทดสอบระบบโดยได้รับอนุญาตอย่างเป็นทางการเพื่อหาจุดบกพร่องและแก้ไข</li>\n<li><b>Black Hat:</b> แฮกเกอร์หมวกดำ บุกรุกโดยไม่ได้รับอนุญาตเพื่อหาผลประโยชน์หรือทำลายระบบ</li>\n<li><b>Gray Hat:</b> แอบทดสอบโดยไม่ได้รับอนุญาต แม้ไม่ได้มุ่งทำลายหรือหากำไร (รวมถึง Vulnerability Brokers ตามสไลด์)</li>\n<li><b>Script Kiddie:</b> ผู้มีทักษะน้อย ใช้สคริปต์หรือเครื่องมือสำเร็จรูปของผู้อื่นโดยไม่เข้าใจการทำงานลึกซึ้ง</li>\n<li><b>Hacktivist:</b> แฮกเกอร์ที่มีแรงจูงใจทางการเมือง สังคม หรืออุดมการณ์เพื่อเรียกร้องความสนใจ</li>\n<li><b>Cybercriminal:</b> อาชญากรไซเบอร์ที่มุ่งเน้นผลประโยชน์ทางการเงินเป็นหลัก (เช่น Ransomware, แฮกบัญชีธนาคาร)</li>\n<li><b>State-Sponsored:</b> ได้รับการสนับสนุนจากรัฐบาล มุ่งจารกรรมข้อมูลยุทธศาสตร์หรือทำลายโครงสร้างพื้นฐาน</li>\n</ul>\n\n<h3>เครื่องมือความปลอดภัย: จำหน้าที่ก่อนจำชื่อ</h3>\n<table>\n<tr><th>หน้าที่ของเครื่องมือ</th><th>ตัวอย่างเครื่องมือในสไลด์</th></tr>\n<tr><td>กู้/แคร็กรหัสผ่าน</td><td>John the Ripper, Ophcrack, L0phtCrack</td></tr>\n<tr><td>ตรวจจับ/วิเคราะห์เครือข่ายไร้สาย</td><td>Aircrack-ng, Kismet</td></tr>\n<tr><td>สแกนโฮสต์และพอร์ต</td><td>Nmap, SuperScan, Angry IP Scanner</td></tr>\n<tr><td>สร้างแพ็กเก็ตทดสอบ (Packet Crafting)</td><td>Hping, Scapy</td></tr>\n<tr><td>ดักจับและวิเคราะห์แพ็กเก็ต (Sniffing)</td><td>Wireshark, tcpdump, TShark</td></tr>\n<tr><td>ตรวจจับการดัดแปลงไฟล์และรูทคิท</td><td>AIDE (Advanced Intrusion Detection Environment)</td></tr>\n<tr><td>ตรวจหาช่องโหว่เว็บ (Fuzzers)</td><td>Skipfish, Wapiti</td></tr>\n<tr><td>ตรวจพิสูจน์พยานหลักฐานดิจิทัล (Forensics)</td><td>The Sleuth Kit, Helix, Autopsy</td></tr>\n<tr><td>ดีบักและวิเคราะห์โปรแกรม</td><td>GDB, WinDbg</td></tr>\n<tr><td>ระบบปฏิบัติการทดสอบความปลอดภัย</td><td>Kali Linux</td></tr>\n<tr><td>เข้ารหัสพื้นที่จัดเก็บข้อมูล</td><td>VeraCrypt, CipherShed</td></tr>\n<tr><td>ทดสอบเจาะระบบและรันช่องโหว่</td><td>Metasploit, Core Impact</td></tr>\n</table>\n\n<h3>IOC vs IOA</h3>\n<p>• <b>IOC (Indicator of Compromise):</b> วัตถุพยานหรือร่องรอยที่ชี้ว่าถูกบุกรุกไปแล้ว เช่น ค่า Hash ของมัลแวร์, IP/Domain อันตราย<br>\n• <b>IOA (Indicator of Attack):</b> พฤติกรรมและกลยุทธ์ในขณะเกิดเหตุ เช่น พยายามล็อกอินผิดพลาดซ้ำๆ แล้วสแกนพอร์ตต่อเนื่อง</p>\n<details class=\"study-check\"><summary>ลองตอบเอง: Local Exploit กับ Remote Exploit ต่างกันอย่างไร?</summary><p>Remote exploit สามารถโจมตีผ่านเครือข่ายได้โดยไม่ต้องมีสิทธิ์หรือบัญชีในระบบมาก่อน ส่วน Local exploit ผู้โจมตีต้องมีการเข้าถึงระบบเป้าหมายอยู่แล้วบางส่วน (เช่น มีบัญชีผู้ใช้ธรรมดา) เพื่อใช้ช่องโหว่ยกระดับสิทธิ์ (Privilege escalation)</p></details>\n"
  },
  {
    "id": 8,
    "title": "การตรวจสอบเครือข่าย",
    "description": "IDS/IPS · TAP/SPAN · NetFlow · SIEM/SOAR · ELK",
    "color": "#76ceff",
    "slideCount": 23,
    "source": "slides/08-Net_Monitor.pdf",
    "html": "<h2>บท 8 • การตรวจสอบเครือข่าย (Network Monitoring & Tools)</h2>\n<p class=\"ref\">อ้างอิง: 08-Net_Monitor.pdf • 23 หน้า • สไลด์หน้า 4–8 (Topology & TAP/SPAN), 10–18 (เครื่องมือ & SIEM/SOAR)</p>\n<p class=\"big\">เห็นทราฟฟิก → ตรวจจับพฤติกรรมน่าสงสัย → รวมศูนย์วิเคราะห์ Log → ตอบสนองอัตโนมัติ</p>\n<div class=\"example\"><b>เปรียบเทียบกลไกตรวจจับ:</b><br>\n• <b>Firewall:</b> คัดกรองทราฟฟิกตามกฎ (IP, Port, State)<br>\n• <b>IDS:</b> ตรวจจับทราฟฟิกแบบสำเนา (Out-of-band) และส่ง Alert แจ้งเตือน<br>\n• <b>IPS:</b> ติดตั้งขวางทางเดินข้อมูล (In-line) ตรวจจับและสั่งบล็อก/ดรอปทราฟฟิกอันตรายได้ทันที</div>\n\n<table>\n<tr><th>หัวข้อเปรียบเทียบ</th><th>ฝั่งซ้าย</th><th>ฝั่งขวา</th></tr>\n<tr><td><b>วิธีดึงทราฟฟิก</b></td><td><b>Network TAP:</b> ฮาร์ดแวร์ต่อคั่นสายจริง ส่งสำเนา 100% ไม่ดรอปแพ็กเก็ต ไม่กิน CPU สวิตช์</td><td><b>Switch SPAN (Port Mirroring):</b> สวิตช์คัดลอกเฟรม ประหยัดค่าใช้จ่าย แต่อาจดรอปแพ็กเก็ตหากทราฟฟิกแน่น</td></tr>\n<tr><td><b>ทิศทางทราฟฟิก</b></td><td><b>Ingress:</b> ทราฟฟิกขาเข้าสู่อุปกรณ์/พอร์ต</td><td><b>Egress:</b> ทราฟฟิกขาออกจากอุปกรณ์/พอร์ต</td></tr>\n<tr><td><b>ชนิดข้อมูลเครือข่าย</b></td><td><b>Full Packet Capture (Wireshark):</b> เก็บทุกไบต์รวมถึง Payload ละเอียดแต่เปลืองพื้นที่</td><td><b>NetFlow:</b> บันทึกเฉพาะสถิติและ Metadata ของ Flow (IP, Port, Protocol, Bytes, Time) เหมาะดูภาพรวม</td></tr>\n<tr><td><b>ระบบศูนย์ปฏิบัติการ</b></td><td><b>SIEM:</b> รวบรวม วิเคราะห์ และหาความสัมพันธ์ของ Log หลายแหล่ง</td><td><b>SOAR:</b> ประสานงานและรัน Playbook/Runbook เพื่อตอบสนองเหตุการณ์อัตโนมัติ</td></tr>\n</table>\n\n<h3>ฟังก์ชันหลักของระบบ SIEM</h3>\n<ul>\n<li><b>Normalization:</b> แปลงรูปแบบข้อความ Log ที่มาจากต่างอุปกรณ์ให้เป็นโครงสร้างมาตรฐานเดียวกัน</li>\n<li><b>Aggregation:</b> รวมรายการเหตุการณ์ที่ซ้ำซ้อนกันเพื่อลดขนาดและปริมาณข้อมูล</li>\n<li><b>Correlation:</b> เชื่อมโยงเหตุการณ์ต่างแหล่งที่มีความเกี่ยวข้องกันเพื่อสร้างเคสเหตุการณ์ (Security Incident)</li>\n<li><b>Forensic Analysis:</b> ค้นหาและตรวจสอบพยานหลักฐานย้อนหลังเพื่อสืบสวน</li>\n<li><b>Reporting & Compliance:</b> สร้างรายงานสำหรับผู้บริหารและการปฏิบัติตามกฎหมาย</li>\n</ul>\n\n<h3>ชุดเครื่องมือยอดนิยม</h3>\n<p>• <b>ELK Stack:</b> <b>Elasticsearch</b> (ระบบจัดเก็บและค้นหาข้อมูลดัชนี), <b>Logstash</b> (Data pipeline รับและแปลงข้อมูล), <b>Kibana</b> (Web dashboard แสดงผลภาพกราฟิก)<br>\n• <b>Security Onion:</b> Linux distro สำเร็จรูปสำหรับงาน Network Security Monitoring (NSM) รวม Snort, Suricata, Zeek, ELK ไว้ในชุดเดียว</p>\n<details class=\"study-check\"><summary>ลองตอบเอง: หากต้องการรู้ว่าเครื่องใดคุยกับใคร ปริมาณเท่าไร โดยไม่ต้องการเก็บเนื้อหาที่ส่ง ควรใช้อะไร?</summary><p>ใช้ <b>NetFlow</b> เพราะเก็บบันทึกเฉพาะสถิติ flow ของคู่สื่อสาร พอร์ต ปริมาณไบต์ และเวลา โดยไม่ต้องเก็บ payload ช่วยประหยัดพื้นที่จัดเก็บมหาศาล</p></details>\n"
  },
  {
    "id": 9,
    "title": "การเข้ารหัสและความปลอดภัย",
    "description": "Hash · HMAC · Symmetric · Asymmetric · PKI · Digital Signatures",
    "color": "#bea5ff",
    "slideCount": 70,
    "source": "slides/09-Cryptography-net.pdf",
    "html": "<h2>บท 9 • การเข้ารหัสและความปลอดภัยเครือข่าย (Cryptography)</h2>\n<p class=\"ref\">อ้างอิง: 09-Cryptography-net.pdf • 70 หน้า • พื้นฐานหน้า 3–19, Hash/HMAC หน้า 22–31, Encryption หน้า 33–45, Signatures/PKI หน้า 47–65</p>\n<p class=\"big\">ก่อนจำอัลกอริทึม ต้องรู้ก่อนว่าระบบความปลอดภัยต้องการรับประกันเรื่องอะไร</p>\n\n<table>\n<tr><th>เป้าหมายความมั่นคงปลอดภัย</th><th>คำถามหลัก</th><th>เครื่องมือที่ให้คุณสมบัตินี้</th></tr>\n<tr><td><b>Confidentiality (การรักษาความลับ)</b></td><td>คนที่ไม่มีสิทธิ์ แอบเปิดอ่านได้ไหม?</td><td>Encryption (Symmetric และ Asymmetric)</td></tr>\n<tr><td><b>Integrity (ความถูกต้องสมบูรณ์)</b></td><td>ข้อมูลถูกแอบแก้ไขหรือเปลี่ยนแปลงไหม?</td><td>Hash Functions (SHA-256, MD5), HMAC, Digital Signature</td></tr>\n<tr><td><b>Authentication (การยืนยันตัวตน)</b></td><td>ผู้ส่งหรือแหล่งที่มาเป็นตัวจริงไหม?</td><td>HMAC (ในกลุ่มที่แชร์คีย์), Digital Signature, Digital Certificate</td></tr>\n<tr><td><b>Non-repudiation (ปฏิเสธไม่ได้)</b></td><td>มีหลักฐานผูกมัดผู้ส่งเพื่อป้องกันการปฏิเสธไหม?</td><td>Digital Signature (ลงนามด้วย Private Key ของผู้ส่ง)</td></tr>\n</table>\n\n<h3>1. Hash vs HMAC</h3>\n<p>• <b>Hash Function:</b> One-way function แปลงข้อความความยาวใดๆ เป็น Digest ความยาวคงที่เสมอ ย้อนกลับไม่ได้ (MD5: 128 bits, SHA-1: 160 bits, SHA-256: 256 bits)<br>\n• <b>HMAC:</b> นำ Secret Key ที่แชร์ร่วมกันมาคำนวณร่วมกับ Hash เพื่อให้ได้ทั้ง <b>Integrity + Origin Authentication</b> แต่ไม่ได้ซ่อนข้อความ และไม่มี Non-repudiation เพราะทั้งสองฝ่ายถือกุญแจลับอันเดียวกัน</p>\n\n<h3>2. Symmetric vs Asymmetric Encryption</h3>\n<table>\n<tr><th>คุณสมบัติ</th><th>Symmetric (กุญแจสมมาตร)</th><th>Asymmetric (กุญแจอสมมาตร)</th></tr>\n<tr><td>กุญแจที่ใช้</td><td>กุญแจลับเดียวกัน (Shared Secret Key) ทั้งเข้ารหัสและถอดรหัส</td><td>คู่กุญแจ: Public Key (เปิดเผย) + Private Key (เก็บลับ)</td></tr>\n<tr><td>จุดเด่น</td><td>ประมวลผลเร็วมาก เหมาะกับข้อมูลขนาดใหญ่</td><td>แก้ปัญหาการแลกเปลี่ยนกุญแจลับ, รองรับการลงนามดิจิทัล</td></tr>\n<tr><td>ตัวอย่าง</td><td><b>AES</b> (Block 128 บิต, Key 128/192/256), DES, 3DES; RC4 (Stream cipher)</td><td><b>RSA</b>, Diffie-Hellman (แลกเปลี่ยนคีย์), DSA, ECDSA (ลงนาม)</td></tr>\n</table>\n\n<div class=\"example\"><b>ท่องจำหลักการใช้คู่กุญแจในข้อสอบ:</b><br>\n1. <b>ต้องการส่งข้อความลับให้ B:</b> A ใช้ <b>Public Key ของ B</b> เข้ารหัส → B ใช้ <b>Private Key ของ B</b> ถอดรหัส (ถามว่า “ใครควรเปิดอ่านได้? -> B”)<br>\n2. <b>A ต้องการลงนามดิจิทัลส่งให้ B:</b> A ใช้ <b>Private Key ของ A</b> ลงนาม → B ใช้ <b>Public Key ของ A</b> ตรวจสอบลายเซ็น (ถามว่า “ใครเป็นคนส่ง? -> A”)</div>\n\n<h3>3. PKI และ Digital Certificates</h3>\n<ul>\n<li><b>Digital Certificate (ใบรับรองดิจิทัล):</b> เอกสารตามมาตรฐาน <b>X.509 v3</b> ที่ผูกตัวตนเข้ากับ Public Key</li>\n<li><b>CA (Certificate Authority):</b> องค์กรผู้มีอำนาจออกและลงนามรับรองใบรับรองดิจิทัล</li>\n<li><b>CRL / OCSP:</b> กลไกตรวจสถานะใบรับรองที่ถูกเพิกถอนก่อนหมดอายุ (CRL เป็นไฟล์รายการ, OCSP ตรวจสอบออนไลน์แบบเรียลไทม์)</li>\n<li><b>Diffie-Hellman (DH):</b> โปรโตคอลตกลงกุญแจลับร่วมกันผ่านช่องทางที่ไม่ปลอดภัย ไม่ได้ใช้เข้ารหัสข้อความโดยตรง</li>\n</ul>\n<details class=\"study-check\"><summary>ลองตอบเอง: เหตุใด Digital Signature จึงให้ Non-repudiation แต่ HMAC ให้ไม่ได้?</summary><p>เพราะ Digital Signature ใช้ <b>Private Key ของผู้ส่ง</b> ซึ่งมีเพียงผู้ส่งคนเดียวในโลกที่ครอบครอง จึงผูกมัดผู้ส่งได้ ส่วน HMAC ใช้ Shared Secret Key ซึ่งทั้งผู้ส่งและผู้รับถือกุญแจอันเดียวกัน ผู้รับจึงอาจสร้างข้อความขึ้นมาเองได้</p></details>\n"
  },
  {
    "id": 10,
    "title": "การประเมินช่องโหว่เครื่องปลายทาง",
    "description": "Baseline · CVSS v3.1 · Lifecycle · Patching · ISMS",
    "color": "#ffd28a",
    "slideCount": 36,
    "source": "slides/10-Vulnerability-Asses.pdf",
    "html": "<h2>บท 10 • การประเมินช่องโหว่เครื่องปลายทาง (Vulnerability Assessment)</h2>\n<p class=\"ref\">อ้างอิง: 10-Vulnerability-Asses.pdf • 36 หน้า • หน้า 4–16 (Baseline & CVSS), 18–31 (การจัดการช่องโหว่ & ISMS)</p>\n<p class=\"big\">รู้สภาพปกติ (Baseline) → สแกนหาช่องโหว่ → ประเมินความรุนแรง (CVSS) → ลงแพตช์ → ตรวจสอบซ้ำ</p>\n\n<table>\n<tr><th>คำศัพท์</th><th>หน้าที่</th><th>ตัวอย่าง</th></tr>\n<tr><td><b>Baseline</b></td><td>ภาพจำลองสภาพการทำงานปกติ ใช้เทียบเพื่อหาความผิดปกติ (Anomaly)</td><td>ทราฟฟิกเฉลี่ย, พอร์ตที่เปิดปกติ, บัญชีผู้ใช้</td></tr>\n<tr><td><b>Vulnerability Assessment</b></td><td>ค้นหาและจัดทำรายการช่องโหว่ทั้งหมดที่มีในระบบ</td><td>Nessus, OpenVAS, Qualys</td></tr>\n<tr><td><b>Penetration Testing</b></td><td>ทดสอบเจาะระบบจริงตามขอบเขตที่ตกลง เพื่อดูว่าเจาะได้ลึกเพียงใด</td><td>Metasploit, Core Impact</td></tr>\n</table>\n\n<h3>CVE vs CVSS vs NVD</h3>\n<ul>\n<li><b>CVE (Common Vulnerabilities and Exposures):</b> รหัสอ้างอิงสากลสำหรับเรียกชื่อช่องโหว่ให้ตรงกัน</li>\n<li><b>CVSS (Common Vulnerability Scoring System):</b> ระบบและสูตรคำนวณคะแนนความรุนแรงเชิงเทคนิค (0.0–10.0)</li>\n<li><b>NVD (National Vulnerability Database):</b> ฐานข้อมูลช่องโหว่ของสหรัฐฯ จัดเก็บรายละเอียด CVE, CVSS, และคำแนะนำแก้ปัญหา</li>\n</ul>\n\n<table>\n<tr><th>ช่วงคะแนน CVSS v3.1</th><th>ระดับความรุนแรง (Severity)</th></tr>\n<tr><td>0.0</td><td>None</td></tr>\n<tr><td>0.1 – 3.9</td><td>Low</td></tr>\n<tr><td>4.0 – 6.9</td><td>Medium</td></tr>\n<tr><td>7.0 – 8.9</td><td>High</td></tr>\n<tr><td>9.0 – 10.0</td><td>Critical</td></tr>\n</table>\n\n<p><b>กลุ่มตัวชี้วัดใน CVSS:</b><br>\n1. <b>Base Metric Group:</b> คุณสมบัติคงที่ของช่องโหว่ (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, CIA Impact)<br>\n2. <b>Temporal Metric Group:</b> คุณสมบัติที่เปลี่ยนตามเวลา (มี Exploit แล้วหรือยัง, มีแพตช์ทางการแล้วหรือยัง)<br>\n3. <b>Environmental Metric Group:</b> บริบทเฉพาะขององค์กรและความสำคัญของระบบ</p>\n\n<h3>วงจรการบริหารจัดการช่องโหว่ 6 ขั้นตอน</h3>\n<p class=\"big\">1. Discover → 2. Prioritize Assets → 3. Assess → 4. Report → 5. Remediate → 6. Verify</p>\n<p class=\"note\"><b>จุดสำคัญในข้อสอบ:</b> หลังติดตั้งแพตช์ (Remediate) เสร็จแล้ว ขั้นตอนถัดไปคือ <b>Verify</b> เพื่อสแกนตรวจสอบซ้ำว่าช่องโหว่ถูกปิดสนิทและระบบทำงานได้ ไม่ใช่จบแค่ลงแพตช์</p>\n\n<h3>การบริหารจัดการแพตช์ (Patch Management)</h3>\n<ul>\n<li><b>Agent-based:</b> ติดตั้งโปรแกรม Agent บนเครื่องลูกข่าย เหมาะกับอุปกรณ์พกพาที่อยู่นอกออฟฟิศ</li>\n<li><b>Agentless:</b> สแกนและติดตั้งจากส่วนกลางผ่านเครือข่าย ต้องสามารถเข้าถึงเครื่องปลายทางได้</li>\n<li><b>Passive Monitoring:</b> ตรวจจับเวอร์ชันซอฟต์แวร์จากแพ็กเก็ตทราฟฟิกในเครือข่าย</li>\n<li><b>Configuration Management Tools:</b> Puppet, Chef, Ansible, SaltStack ควบคุมการตั้งค่าอัตโนมัติ</li>\n<li><b>ISMS:</b> ระบบบริหารความมั่นคงปลอดภัยสารสนเทศตามมาตรฐาน <b>ISO/IEC 27001</b> โดยใช้วงจร <b>PDCA</b> (Plan-Do-Check-Act)</li>\n</ul>\n<details class=\"study-check\"><summary>ลองตอบเอง: ช่องโหว่ได้คะแนน CVSS 9.8 ต้องลงแพตช์ก่อนช่องโหว่คะแนน 7.5 เสมอไปหรือไม่?</summary><p>ไม่เสมอไป ต้องพิจารณาบริบททางธุรกิจ (Environmental) ด้วย หากคะแนน 9.8 อยู่บนเซิร์ฟเวอร์ทดสอบที่ปิดกั้นจากภายนอก แต่คะแนน 7.5 อยู่บนเว็บเซิร์ฟเวอร์หลักที่เข้าถึงได้จากอินเทอร์เน็ต ระบบที่เปิดสู่ภายนอกอาจต้องได้รับการแก้ไขก่อน</p></details>\n"
  },
  {
    "id": 11,
    "title": "ข้อมูลความปลอดภัยและข่าวกรองภัย",
    "description": "Logs · Syslog Formula · 5-Tuple · STIX/TAXII · Talos",
    "color": "#ffb799",
    "slideCount": 58,
    "source": "slides/11-SecurityData.pdf",
    "html": "<h2>บท 11 • ข้อมูลความปลอดภัยและข่าวกรองภัย (Security Data & Threat Intelligence)</h2>\n<p class=\"ref\">อ้างอิง: 11-SecurityData.pdf • 58 หน้า • หน้า 4–35 (Network Security Data), หน้า 37–57 (Threat Intelligence)</p>\n<p class=\"big\">วิเคราะห์หลักฐานหลากหลายรูปแบบ → เชื่อมโยงข้อมูล → แลกเปลี่ยนข่าวกรองภัยคุกคาม</p>\n\n<table>\n<tr><th>ประเภทข้อมูลความปลอดภัย</th><th>ให้ข้อมูลอะไร</th><th>ตัวอย่าง</th></tr>\n<tr><td><b>Alert Data</b></td><td>การแจ้งเตือนเมื่อพบเหตุการณ์ตรงตามเงื่อนไขหรือ Signature</td><td>Snort Alert, IPS Drop Notification</td></tr>\n<tr><td><b>Session Data</b></td><td>ใครคุยกับใคร เมื่อไร นานเท่าไร ปริมาณไบต์เท่าไร (Metadata)</td><td>NetFlow, IPFIX</td></tr>\n<tr><td><b>Transaction Data</b></td><td>คำขอและคำตอบที่แลกเปลี่ยนกันในเซสชัน</td><td>HTTP Request/Response, DNS Query/Answer</td></tr>\n<tr><td><b>Full Packet Capture</b></td><td>ข้อมูลดิบทุกไบต์ของแพ็กเก็ตและ Payload</td><td>PCAP (Wireshark, tcpdump)</td></tr>\n<tr><td><b>Statistical Data</b></td><td>สถิติภาพรวมและการเบี่ยงเบนจากพฤติกรรมปกติ</td><td>MRTG, กราฟทราฟฟิกเฉลี่ยรายสัปดาห์</td></tr>\n</table>\n\n<p><b>5-Tuple</b> = <b>Source IP + Destination IP + Source Port + Destination Port + Protocol</b> (จำว่าไม่ใช่ IP 5 หมายเลข)</p>\n\n<h3>ระบบ Syslog และการคำนวณค่า PRI</h3>\n<p>ระดับความรุนแรง (Severity) ใน Syslog: <b>ตัวเลขยิ่งน้อย ยิ่งมีความร้ายแรงสูง</b></p>\n<table>\n<tr><th>ค่า</th><th>Severity</th><th>ความหมาย</th></tr>\n<tr><td><b>0</b></td><td><b>Emergency</b></td><td>ระบบใช้งานไม่ได้เลย (ร้ายแรงสูงสุด)</td></tr>\n<tr><td>1</td><td>Alert</td><td>ต้องดำเนินการแก้ไขทันที</td></tr>\n<tr><td>2</td><td>Critical</td><td>ภาวะวิกฤต</td></tr>\n<tr><td>3</td><td>Error</td><td>เกิดข้อผิดพลาด</td></tr>\n<tr><td>4</td><td>Warning</td><td>คำเตือน</td></tr>\n<tr><td>5</td><td>Notice</td><td>เหตุการณ์ปกติแต่ควรสังเกต</td></tr>\n<tr><td>6</td><td>Informational</td><td>ข้อมูลการทำงานทั่วไป</td></tr>\n<tr><td><b>7</b></td><td><b>Debug</b></td><td>ข้อมูลสำหรับดีบักแก้ปัญหา (ร้ายแรงน้อยสุด)</td></tr>\n</table>\n\n<div class=\"formula\"><b>สูตรคำนวณค่า PRI:</b> PRI = (Facility × 8) + Severity</div>\n<div class=\"example\"><b>ตัวอย่างการคำนวณในข้อสอบ:</b><br>\n• กำหนด Facility = 4 (auth), Severity = 3 (Error) → PRI = (4 × 8) + 3 = <b>35</b><br>\n• ในทางกลับกัน ถ้าได้ค่า PRI = 35 → นำ 35 ÷ 8 = 4 เศษ 3 → ได้ Facility = 4, Severity = 3<br>\n• ได้ค่า PRI = 82 → 82 ÷ 8 = 10 เศษ 2 → Facility = 10, Severity = 2 (Critical)</div>\n\n<h3>Threat Intelligence และมาตรฐานการแลกเปลี่ยน</h3>\n<ul>\n<li><b>STIX (Structured Threat Information Expression):</b> ภาษาและโครงสร้างข้อมูลมาตรฐาน (JSON) สำหรับอธิบายข้อมูลภัยคุกคามและ IOC</li>\n<li><b>TAXII (Trusted Automated eXchange of Intelligence Information):</b> โปรโตคอลขนส่งข้อมูล STIX ผ่าน HTTPS/REST APIs</li>\n<li><b>CybOX (Cyber Observable eXpression):</b> ข้อกำหนดสำหรับอธิบายสิ่งที่สังเกตได้ในระบบ (เช่น registry, packet, hash)</li>\n<li><b>TTPs:</b> Tactics, Techniques, and Procedures (กลยุทธ์ เทคนิค และขั้นตอนการปฏิบัติการของผู้โจมตี)</li>\n<li><b>Cisco Talos:</b> ทีมวิจัยข่าวกรองความปลอดภัยระดับโลกของ Cisco ที่สร้างกฎตรวจจับสำหรับ Snort และ ClamAV</li>\n<li><b>Honeypot:</b> เซิร์ฟเวอร์ล่อเพื่อดักจับและศึกษาพฤติกรรมการโจมตี</li>\n</ul>\n<details class=\"study-check\"><summary>ลองตอบเอง: ข้อความ Syslog มีค่า PRI = 165 จงหา Facility และ Severity?</summary><p>165 ÷ 8 = 20 เศษ 5 ดังนั้น Facility = 20 (local4) และ Severity = 5 (Notice)</p></details>\n"
  },
  {
    "id": 12,
    "title": "กรอบงานความมั่นคงปลอดภัย",
    "description": "NIST CSF 2.0 · ISO 27001/2 · CIS Controls · COBIT · PCI DSS · HIPAA",
    "color": "#a8d698",
    "slideCount": 42,
    "source": "slides/12-SecurityFramework.pdf",
    "html": "<h2>บท 12 • กรอบงานความมั่นคงปลอดภัยและมาตรฐาน (Cybersecurity Frameworks)</h2>\n<p class=\"ref\">อ้างอิง: 12-SecurityFramework.pdf • 42 หน้า • รวมภาพและตารางเปรียบเทียบมาตรฐานสากล</p>\n<p class=\"big\">Framework = ชุดแนวทาง มาตรฐาน และแนวปฏิบัติเพื่อบริหารจัดการและลดความเสี่ยงไซเบอร์อย่างเป็นระบบ</p>\n\n<table>\n<tr><th>ประเภทกรอบงานตามสไลด์</th><th>เน้นอะไร</th><th>ตัวอย่าง</th></tr>\n<tr><td><b>Risk Frameworks</b></td><td>การประเมินและการจัดการความเสี่ยง</td><td>NIST SP 800-30, ISO/IEC 27005</td></tr>\n<tr><td><b>Program Frameworks</b></td><td>การสร้างและบริหารโครงสร้างงานความปลอดภัยโดยรวม</td><td>NIST CSF, ISO/IEC 27001</td></tr>\n<tr><td><b>Control Frameworks</b></td><td>รายการมาตรการควบคุมเชิงเทคนิคและปฏิบัติการ</td><td>NIST SP 800-53, CIS Controls, PCI DSS</td></tr>\n</table>\n\n<h3>NIST Cybersecurity Framework 2.0 (NIST CSF 2.0)</h3>\n<p>รุ่น 2.0 มีทั้งหมด <b>6 ฟังก์ชันหลัก</b> โดยเพิ่มฟังก์ชัน <b>Govern</b> เข้ามาครอบคลุมภาพรวม:</p>\n<table>\n<tr><th>Function</th><th>คำแปล</th><th>ความหมายและตัวอย่างกิจกรรม</th></tr>\n<tr><td><b>Govern (GV)</b></td><td>กำกับดูแล</td><td>กำหนดนโยบาย กลยุทธ์ บทบาทความรับผิดชอบ และระดับความเสี่ยงที่ยอมรับได้</td></tr>\n<tr><td><b>Identify (ID)</b></td><td>ชี้บ่ง/ระบุ</td><td>ทำรายการทรัพย์สินและระบบสำคัญ ประเมินความเสี่ยงและผลกระทบทางธุรกิจ</td></tr>\n<tr><td><b>Protect (PR)</b></td><td>ป้องกัน</td><td>ควบคุมสิทธิ์เข้าถึง (Access Control), อบรมบุคลากร, เข้ารหัสข้อมูล, ทำสำรองข้อมูล</td></tr>\n<tr><td><b>Detect (DE)</b></td><td>ตรวจจับ</td><td>เฝ้าระวัง Log ตรวจจับสิ่งผิดปกติ (Anomaly) และแจ้งเตือนภัยคุกคาม</td></tr>\n<tr><td><b>Respond (RS)</b></td><td>ตอบสนอง</td><td>วางแผนรับมือเหตุการณ์, สื่อสาร, จำกัดความเสียหาย (Containment เช่น แยกเครื่องติดเชื้อ)</td></tr>\n<tr><td><b>Recover (RC)</b></td><td>ฟื้นฟู</td><td>กู้คืนระบบ ข้อมูล และบริการให้กลับมาทำงานปกติ ปรับปรุงแผนรองรับ</td></tr>\n</table>\n\n<p><b>NIST CSF Implementation Tiers:</b> แสดงระดับวุฒิภาวะในการบริหารความเสี่ยง 4 ระดับ:<br>\n• <b>Tier 1: Partial</b> (ทำเป็นบางส่วน ขาดความสม่ำเสมอ)<br>\n• <b>Tier 2: Risk-Informed</b> (ตระหนักถึงความเสี่ยงแต่ยังไม่มีนโยบายทั้งองค์กร)<br>\n• <b>Tier 3: Repeatable</b> (มีกระบวนการและนโยบายสม่ำเสมอเป็นทางการ)<br>\n• <b>Tier 4: Adaptive</b> (ปรับตัวตามภัยคุกคามได้อย่างยืดหยุ่นและต่อเนื่อง - ระดับสูงสุด)</p>\n\n<h3>มาตรฐานและการปฏิบัติตามข้อกำหนดสากล (Compliance)</h3>\n<table>\n<tr><th>มาตรฐาน / กรอบงาน</th><th>จุดเน้นและคีย์เวิร์ดในข้อสอบ</th></tr>\n<tr><td><b>ISO/IEC 27001</b></td><td>ข้อกำหนดระบบบริหารจัดการความมั่นคงปลอดภัยสารสนเทศ (<b>ISMS Requirements</b>) ใช้สำหรับตรวจประเมินเพื่อขอใบรับรอง (Certification)</td></tr>\n<tr><td><b>ISO/IEC 27002</b></td><td>คู่มือแนวทางรายละเอียดการนำมาตรการควบคุมความปลอดภัย (<b>Code of Practice for Information Security Controls</b>) ไปปฏิบัติ</td></tr>\n<tr><td><b>CIS Controls v7.1</b></td><td>มาตรการควบคุมความปลอดภัย <b>20 Controls</b> แบ่งเป็น Basic (1–6), Foundational (7–16), และ Organizational (17–20)</td></tr>\n<tr><td><b>COBIT 5</b></td><td>กรอบธรรมาภิบาลและการบริหารจัดการ IT มี 5 หลักการสำคัญ โดยมีหลักการเด่นคือ <b>Separating Governance from Management</b></td></tr>\n<tr><td><b>PCI DSS</b></td><td>ปกป้องข้อมูลผู้ถือบัตรชำระเงิน (<b>Cardholder Data</b>) มี 12 Requirements จัดอยู่ใน 6 เป้าหมายการควบคุม</td></tr>\n<tr><td><b>HIPAA</b></td><td>กฎหมายคุ้มครองข้อมูลสุขภาพของสหรัฐฯ โดยมี <b>Privacy Rule</b> (ความเป็นส่วนตัว PHI) และ <b>Security Rule</b> (Safeguards คุ้มครอง ePHI)</td></tr>\n<tr><td><b>HITRUST CSF</b></td><td>กรอบงานและระบบการประเมินรับรองความปลอดภัยที่พัฒนาขึ้นสำหรับอุตสาหกรรมสุขภาพ (<b>Healthcare</b>) โดยเฉพาะ</td></tr>\n</table>\n<details class=\"study-check\"><summary>ลองตอบเอง: ตั้งนโยบายความเสี่ยง, สแกนพบมัลแวร์, ตัดเน็ตแยกเครื่อง, และกู้ข้อมูลจากแบ็กอัป ตรงกับฟังก์ชันใดของ NIST CSF?</summary><p>ตั้งนโยบาย = <b>Govern</b>, สแกนพบ = <b>Detect</b>, ตัดเน็ตแยกเครื่อง = <b>Respond</b>, กู้ข้อมูลจากแบ็กอัป = <b>Recover</b></p></details>\n"
  }
];
window.FLASHCARDS = [
  {
    "ch": 6,
    "q": "Virus vs Worm ต่างกันอย่างไร?",
    "a": "Virus ต้องแทรกใน Host Program และต้องมีคนกดรันจึงจะแพร่พันธุ์ได้ ส่วน Worm เป็นโปรแกรมอิสระที่แพร่กระจายข้ามเครือข่ายได้เองอัตโนมัติ",
    "cat": "Malware"
  },
  {
    "ch": 6,
    "q": "3 ส่วนประกอบของหนอนคอมพิวเตอร์ (Worm Components)",
    "a": "1. Enabling vulnerability (กลไกเจาะช่องโหว่) 2. Propagation mechanism (กลไกจำลองตัวหาเป้าหมายใหม่) 3. Payload (โค้ดทำลายล้างหรือเปิด Backdoor)",
    "cat": "Malware"
  },
  {
    "ch": 6,
    "q": "Baiting ใน Social Engineering คืออะไร?",
    "a": "การวางสื่อบันทึกข้อมูลติดมัลแวร์ (เช่น Flash Drive) ทิ้งไว้ในที่สาธารณะเพื่อล่อให้เหยื่อนำไปเสียบใช้งาน",
    "cat": "Social Engineering"
  },
  {
    "ch": 6,
    "q": "Ping of Death จัดเป็นการโจมตีประเภทใด?",
    "a": "Buffer Overflow DoS โดยส่ง IP packet ขนาดใหญ่เกินกว่ามาตรฐาน 65,535 bytes ทำให้หน่วยความจำเครื่องรับแฮงก์หรือแครช",
    "cat": "Network Attacks"
  },
  {
    "ch": 6,
    "q": "Traffic Fragmentation ใน Evasion Method คืออะไร?",
    "a": "การซอยย่อย Payload เป็นชิ้นเล็กๆ เพื่อให้ผ่านการตรวจจับของ IPS แล้วไปประกอบร่างใหม่ที่เครื่องเป้าหมาย",
    "cat": "Evasion"
  },
  {
    "ch": 7,
    "q": "Threat vs Vulnerability vs Exploit",
    "a": "Threat = ภัยที่อาจทำอันตราย, Vulnerability = จุดอ่อนในระบบ, Exploit = เครื่องมือหรือเทคนิคที่ใช้ประโยชน์จากจุดอ่อนนั้น",
    "cat": "Core Security"
  },
  {
    "ch": 7,
    "q": "การจัดการความเสี่ยง 4 รูปแบบ (4 Risk Responses)",
    "a": "1. Avoidance (เลิกกิจกรรมต้นเหตุ) 2. Reduction/Mitigation (ลงแพตช์/ป้องกัน) 3. Transfer (ซื้อประกัน) 4. Acceptance (ยอมรับความเสี่ยงที่เหลือ)",
    "cat": "Risk"
  },
  {
    "ch": 7,
    "q": "White Hat vs Gray Hat vs Black Hat",
    "a": "White Hat = ทดสอบอย่างถูกต้องและได้รับอนุญาต, Black Hat = แฮกเพื่อผลประโยชน์ส่วนตนหรือทำลาย, Gray Hat = แอบทดสอบโดยไม่ได้รับอนุญาตแต่ไม่ได้มุ่งทำลาย",
    "cat": "Threat Actors"
  },
  {
    "ch": 7,
    "q": "IOC vs IOA",
    "a": "IOC (Indicator of Compromise) = วัตถุพยานร่องรอยการถูกเจาะ เช่น Hash, IP อันตราย / IOA (Indicator of Attack) = พฤติกรรมและกลยุทธ์ของผู้โจมตีขณะเกิดเหตุ",
    "cat": "Forensics"
  },
  {
    "ch": 8,
    "q": "IDS vs IPS",
    "a": "IDS ทำงาน Out-of-band ตรวจจับและแจ้งเตือน (Alert) / IPS ทำงาน In-line ขวางทางเดินข้อมูลและสามารถสั่งบล็อก/ดรอปทราฟฟิกได้ทันที",
    "cat": "Network Monitoring"
  },
  {
    "ch": 8,
    "q": "Network TAP vs Switch SPAN",
    "a": "TAP เป็นฮาร์ดแวร์ต่อคั่นสายจริง ส่งสำเนาครบ 100% ไม่กิน CPU สวิตช์ / SPAN ให้สวิตช์ก็อปปี้พอร์ต ประหยัดแต่เสี่ยงดรอปแพ็กเก็ตเมื่อทราฟฟิกหนาแน่น",
    "cat": "Network Monitoring"
  },
  {
    "ch": 8,
    "q": "SIEM vs SOAR",
    "a": "SIEM รวบรวม วิเคราะห์ และหาความสัมพันธ์ของ Log (Correlation) / SOAR ประสานงานและรัน Playbook อัตโนมัติเพื่อตอบสนองต่อภัยคุกคาม",
    "cat": "SOC"
  },
  {
    "ch": 8,
    "q": "ส่วนประกอบของ ELK Stack",
    "a": "Elasticsearch = Search & Store engine, Logstash = Data processing pipeline, Kibana = Web visualization dashboard",
    "cat": "Tools"
  },
  {
    "ch": 9,
    "q": "คุณสมบัติของ Hash Function",
    "a": "One-way function คำนวณไปข้างหน้าได้ค่าคงที่ ไม่สามารถถอดรหัสย้อนกลับได้ ให้ Integrity ตรวจสอบความถูกต้องของข้อมูล",
    "cat": "Cryptography"
  },
  {
    "ch": 9,
    "q": "HMAC ให้คุณสมบัติอะไรบ้าง?",
    "a": "Integrity + Origin Authentication (ความถูกต้องของข้อมูลและการยืนยันแหล่งที่มาในกลุ่มที่แชร์ Secret Key)",
    "cat": "Cryptography"
  },
  {
    "ch": 9,
    "q": "ส่งข้อความลับให้ B ต้องใช้กุญแจใดเข้ารหัส?",
    "a": "Public Key ของ B (ผู้รับ) เพื่อให้มีเพียง B คนเดียวที่ใช้ Private Key ของตนเองถอดรหัสได้",
    "cat": "Asymmetric"
  },
  {
    "ch": 9,
    "q": "Digital Signature ใช้กุญแจใดลงนามและตรวจลายเซ็น?",
    "a": "ผู้ส่งใช้ Private Key ของตนเองในการลงนาม และผู้รับใช้ Public Key ของผู้ส่งในการตรวจสอบ (ได้ Authenticity + Integrity + Non-repudiation)",
    "cat": "Digital Signature"
  },
  {
    "ch": 9,
    "q": "Diffie-Hellman (DH) ทำหน้าที่อะไร?",
    "a": "Key Agreement Protocol ช่วยให้สองฝ่ายตกลงกุญแจลับร่วมกัน (Shared Secret) ผ่านช่องทางที่ไม่ปลอดภัยได้",
    "cat": "Cryptography"
  },
  {
    "ch": 9,
    "q": "CRL vs OCSP",
    "a": "CRL เป็นรายการดาวน์โหลดใบรับรองที่ถูกเพิกถอน / OCSP เป็นโปรโตคอลสอบถามสถานะใบรับรองแบบออนไลน์และเรียลไทม์",
    "cat": "PKI"
  },
  {
    "ch": 10,
    "q": "Baseline ในระบบความปลอดภัยคืออะไร?",
    "a": "ภาพจำลองสภาพการทำงานปกติของระบบและเครือข่าย เพื่อใช้เป็นจุดอ้างอิงในการตรวจจับความผิดปกติ (Anomaly)",
    "cat": "Vulnerability"
  },
  {
    "ch": 10,
    "q": "CVE vs CVSS vs NVD",
    "a": "CVE = รหัสระบุชื่อช่องโหว่, CVSS = ระบบคำนวณคะแนนความรุนแรงเชิงเทคนิค (0-10), NVD = ฐานข้อมูลช่องโหว่ระดับชาติที่เก็บบันทึกข้อมูลทั้งหมด",
    "cat": "Vulnerability"
  },
  {
    "ch": 10,
    "q": "คะแนน CVSS v3.1 ระดับ Critical คือเท่าใด?",
    "a": "9.0 ถึง 10.0 (High: 7.0-8.9, Medium: 4.0-6.9, Low: 0.1-3.9)",
    "cat": "CVSS"
  },
  {
    "ch": 10,
    "q": "วงจรจัดการช่องโหว่ 6 ขั้นตอน",
    "a": "Discover → Prioritize Assets → Assess → Report → Remediate → Verify (หลังแก้ต้อง Verify ตรวจซ้ำเสมอ)",
    "cat": "Vulnerability"
  },
  {
    "ch": 11,
    "q": "5-Tuple ในทราฟฟิกเครือข่ายประกอบด้วยอะไรบ้าง?",
    "a": "Source IP, Destination IP, Source Port, Destination Port, Protocol",
    "cat": "Security Data"
  },
  {
    "ch": 11,
    "q": "ลำดับ Severity ของ Syslog (0 ถึง 7)",
    "a": "0: Emergency (ร้ายแรงสุด), 1: Alert, 2: Critical, 3: Error, 4: Warning, 5: Notice, 6: Informational, 7: Debug (น้อยสุด)",
    "cat": "Syslog"
  },
  {
    "ch": 11,
    "q": "สูตรคำนวณ Syslog PRI",
    "a": "PRI = (Facility × 8) + Severity (เช่น Facility 4, Severity 3 -> PRI = 35)",
    "cat": "Syslog"
  },
  {
    "ch": 11,
    "q": "STIX vs TAXII ต่างกันอย่างไร?",
    "a": "STIX เป็นภาษา/ฟอร์แมตโครงสร้างข้อมูล (JSON) สำหรับอธิบายภัยคุกคาม / TAXII เป็นโปรโตคอลขนส่งข้อมูล STIX ผ่าน HTTPS",
    "cat": "Threat Intel"
  },
  {
    "ch": 12,
    "q": "6 Functions ของ NIST CSF 2.0 มีอะไรบ้าง?",
    "a": "1. Govern (GV) 2. Identify (ID) 3. Protect (PR) 4. Detect (DE) 5. Respond (RS) 6. Recover (RC)",
    "cat": "Frameworks"
  },
  {
    "ch": 12,
    "q": "NIST CSF Tiers 1-4 มีชื่อว่าอะไรบ้าง?",
    "a": "Tier 1: Partial, Tier 2: Risk-Informed, Tier 3: Repeatable, Tier 4: Adaptive (ระดับสูงสุด)",
    "cat": "Frameworks"
  },
  {
    "ch": 12,
    "q": "ISO 27001 vs ISO 27002 ต่างกันอย่างไร?",
    "a": "ISO 27001 คือข้อกำหนด ISMS ที่ใช้ตรวจรับรอง (Certification) / ISO 27002 คือคู่มือแนวทางรายละเอียดการนำมาตรการควบคุมไปปฏิบัติ",
    "cat": "Compliance"
  },
  {
    "ch": 12,
    "q": "หลักการสำคัญของ COBIT 5",
    "a": "Separating Governance from Management (แยกการกำกับดูแลออกจากการบริหารจัดการ)",
    "cat": "Frameworks"
  },
  {
    "ch": 12,
    "q": "PCI DSS และ HIPAA ปกป้องข้อมูลอะไร?",
    "a": "PCI DSS ปกป้องข้อมูลผู้ถือบัตรชำระเงิน (Cardholder Data) / HIPAA ปกป้องข้อมูลสุขภาพ (PHI และ ePHI)",
    "cat": "Compliance"
  }
];
window.STUDY_METHOD = "<h3>แผนการศึกษาแบบ Active Recall & Pomodoro (25-35 นาทีต่อหน่วย)</h3>\n<p>การเตรียมตัวสอบวิชา Cyber Security ให้ได้ผลดีที่สุด ไม่ใช่การอ่านผ่านสายตา แต่คือการ <b>ทดสอบความจำด้วยตัวเอง (Self-testing)</b>:</p>\n<div class=\"steps\">\n<div><b>1. อ่านรอบแรก: เรียนละเอียด</b><br>ทำความเข้าใจแนวคิด ศัพท์เทคนิคภาษาอังกฤษ และภาพรวมระบบ</div>\n<div><b>2. ปิดสรุปแล้วอธิบายเอง</b><br>ลองตอบคำถามท้ายหัวข้อ หรืออธิบายให้ตัวเองฟังว่าระบบทำงานอย่างไร</div>\n<div><b>3. ทำแบบฝึกหัดปรนัย</b><br>ฝึกทำ 10 ข้อในแต่ละบท อ่านคำอธิบายว่าทำไมข้อถูกจึงถูก และทำไมข้อผิดจึงผิด</div>\n<div><b>4. ทวนก่อนสอบรอบสุดท้าย</b><br>สลับเป็นโหมด 'ทวนก่อนสอบ' เพื่อเก็บคีย์เวิร์ด ตาราง สูตรคำนวณ และฝึกใช้ Flashcards</div>\n</div>\n<h3>แผนแนะนำ 4 วันก่อนสอบ</h3>\n<ul>\n<li><b>วันที่ 1 (บท 6 & 7):</b> ปูพื้นฐานภัยคุกคาม มัลแวร์ การเจาะระบบ ผู้โจมตี และการบริหารความเสี่ยง</li>\n<li><b>วันที่ 2 (บท 8 & 11):</b> สถาปัตยกรรมเฝ้าระวังเครือข่าย TAP/SPAN, IDS/IPS, SIEM/SOAR, Log types, คำนวณ Syslog PRI, และ Threat Intelligence</li>\n<li><b>วันที่ 3 (บท 9 & 10):</b> วิทยาการรหัสลับ Hash/HMAC, Symmetric vs Asymmetric, PKI, Digital Signatures, และการจัดการช่องโหว่ตามเกณฑ์ CVSS v3.1</li>\n<li><b>วันที่ 4 (บท 12 & Mock Exam):</b> กรอบงาน NIST CSF 2.0, ISO, CIS, PCI DSS, ทำข้อสอบปรนัยรวม 70 ข้อ และฝึกเขียนข้อสอบอัตนัย 7 ข้อ</li>\n</ul>\n";
