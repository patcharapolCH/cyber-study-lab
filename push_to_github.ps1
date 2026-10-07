# PowerShell Helper for GitHub Push
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  🛡️ Cyber Security Study Lab - GitHub Push Assistant" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    Write-Host "`n[1/4] กำลังเริ่มต้นสร้าง Git repository..." -ForegroundColor Yellow
    git init -b main
} else {
    Write-Host "`n[1/4] Git repository มีอยู่แล้ว" -ForegroundColor Gray
}

Write-Host "`n[2/4] บันทึกไฟล์เข้า Git (add & commit)..." -ForegroundColor Yellow
git add .
git commit -m "feat: Cyber Security Study Lab Pro - Web App and Study Notes"

$repoUrl = Read-Host "`nกรุณากรอก GitHub Repository URL (เช่น https://github.com/USERNAME/cyber-study-lab.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "[!] ไม่ได้ระบุ URL ยกเลิกการ Push" -ForegroundColor Red
    exit
}

Write-Host "`n[3/4] กำลังตั้งค่า Remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $repoUrl
git branch -M main

Write-Host "`n[4/4] กำลัง Push ขึ้น GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  🎉 สำเร็จ! สามารถไปเปิดใช้งาน GitHub Pages ได้ทันที" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
