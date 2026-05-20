@echo off
chcp 65001 >nul
echo ==============================================
echo          Body Mystery Cabin 启动脚本
echo ==============================================
echo.

if not exist node_modules (
    echo 检测到 node_modules 不存在，正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo 依赖安装失败！
        pause
        exit /b %errorlevel%
    )
)

echo 启动开发服务器...
echo 服务器地址: http://localhost:5173
echo.
npm run dev

pause