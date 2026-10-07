@echo off
chcp 65001 >nul
echo ========================================================
echo   🛡️ Cyber Security Study Lab - GitHub Push Assistant
echo ========================================================
echo.

if not exist .git (
    echo [1/4] กำลังเริ่มต้นสร้าง Git repository...
    git init -b main
) else (
    echo [1/4] Git repository มีอยู่แล้ว
)

echo.
echo [2/4] บันทึกการเปลี่ยนแปลง (git add ^& commit)...
git add .
git commit -m "feat: Cyber Security Study Lab Pro - Web App and Study Notes"

echo.
set /p REPO_URL="กรุณากรอก URL ของ GitHub Repository ของคุณ (เช่น https://github.com/USERNAME/cyber-study-lab.git): "

if "%REPO_URL%"=="" (
    echo [!] ไม่ได้ระบุ URL ยกเลิกการ Push
    echo คุณสามารถสั่ง git push ด้วยตนเองภายหลังได้
    pause
    exit /b
)

echo.
echo [3/4] ตั้งค่า Remote URL...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [4/4] กำลัง Push ขึ้น GitHub...
git push -u origin main

echo.
echo ========================================================
echo   🎉 สำเร็จ! หาก Push สำเร็จ คุณสามารถไปเปิด GitHub Pages ได้ที่:
echo   Repository Settings -^> Pages -^> Branch: main / root
echo ========================================================
pause
