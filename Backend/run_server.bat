@echo off
echo Starting Django server with venv...
cd /d "%~dp0"
..\venv\Scripts\python.exe manage.py runserver