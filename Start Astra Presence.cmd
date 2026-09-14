@echo off
setlocal
cd /d "%~dp0"
set "ASTRA_NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  set "ASTRA_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
)
"%ASTRA_NODE%" -e "process.exit(Number(process.versions.node.split('.')[0]) >= 24 ? 0 : 1)" >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 24 or later from https://nodejs.org/en/download
  echo Then run this launcher again. No npm install is needed.
  pause
  exit /b 1
)
if "%~1"=="--install-startup" (
  "%ASTRA_NODE%" scripts\startup.js
) else (
  "%ASTRA_NODE%" src\launch.js
)
if errorlevel 1 pause
