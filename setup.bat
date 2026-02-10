@echo off
echo ========================================
echo Job Portal - Automated Setup Script
echo ========================================
echo.

echo Step 1: Installing Frontend Dependencies...
cd Frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

cd ..

echo Step 2: Checking Backend Virtual Environment...
if not exist "venv\" (
    echo Virtual environment not found. Please create it first:
    echo python -m venv venv
    pause
    exit /b 1
)
echo Virtual environment found!
echo.

echo Step 3: Installing Backend Dependencies...
call venv\Scripts\pip install -r Backend\requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo Step 4: Checking .env file...
if not exist "Backend\.env" (
    echo WARNING: .env file not found!
    echo Please copy Backend\.env.example to Backend\.env
    echo and update with your credentials.
    pause
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure PostgreSQL is running
echo 2. Create database: CREATE DATABASE jobportal_db;
echo 3. Run migrations: cd Backend ^&^& ..\venv\Scripts\python manage.py migrate
echo 4. Start backend: cd Backend ^&^& .\run_server.bat
echo 5. Start frontend: cd Frontend ^&^& npm run dev
echo.
echo See SETUP_COMPLETE.md for detailed instructions.
echo.
pause
