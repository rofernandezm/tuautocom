@echo off
REM Setup de Ambiente - TuAutoCom para Windows
REM Uso: setup-dev-env.bat o double-click en Windows Explorer

setlocal enabledelayedexpansion
chcp 65001 >nul

echo.
echo ============================================
echo  CONFIGURACION DE AMBIENTE - TuAutoCom
echo ============================================
echo.
echo Detectado: Windows
echo.

REM Obtener ruta del proyecto (donde está este script)
set "PROJECT_ROOT=%~dp0.."
echo Proyecto: %PROJECT_ROOT%
echo.

REM Definir rutas
set "ENV_DEV=%PROJECT_ROOT%\.env.dev"
set "ENV_EXAMPLE=%PROJECT_ROOT%\.env.dev.example"
set "BACKEND_ENV=%PROJECT_ROOT%\backend\.env.dev"

REM Verificar que existe .env.dev.example
if not exist "%ENV_EXAMPLE%" (
    echo [ERROR] No encontrado: %ENV_EXAMPLE%
    echo.
    pause
    exit /b 1
)

echo Creando archivos de configuracion...
echo.

REM Configurar .env.dev root
if not exist "%ENV_DEV%" (
    echo [ROOT] Creando .env.dev...
    copy "%ENV_EXAMPLE%" "%ENV_DEV%" >nul
    echo [OK] Archivo creado: .env.dev
) else (
    echo [ROOT] Ya existe: .env.dev
    set /p "RESET=¿Resetear desde template? (s/n): "
    if /i "!RESET!"=="s" (
        copy "%ENV_EXAMPLE%" "%ENV_DEV%" >nul
        echo [OK] Archivo reseteado: .env.dev
    )
)
echo.

REM Configurar backend/.env.dev
if not exist "%BACKEND_ENV%" (
    echo [BACKEND] Creando backend\.env.dev...
    copy "%ENV_EXAMPLE%" "%BACKEND_ENV%" >nul
    echo [OK] Archivo creado: backend\.env.dev
) else (
    echo [BACKEND] Ya existe: backend\.env.dev
    set /p "RESET_BACKEND=¿Resetear desde template? (s/n): "
    if /i "!RESET_BACKEND!"=="s" (
        copy "%ENV_EXAMPLE%" "%BACKEND_ENV%" >nul
        echo [OK] Archivo reseteado: backend\.env.dev
    )
)
echo.

REM Preguntar si editar
set /p "EDIT=¿Deseas editar .env.dev ahora? (s/n): "
if /i "!EDIT!"=="s" (
    echo.
    echo Abriendo .env.dev con editor por defecto...
    start "" notepad "%ENV_DEV%"
)

echo.
echo ✓ Configuracion completada
echo.
echo Proximos pasos:
echo   1. Si abriste .env.dev, edita los valores segun tu entorno
echo   2. Instala dependencias: pnpm install
echo   3. Inicia backend: cd backend ^& pnpm run dev
echo   4. En otra terminal, inicia frontend: pnpm run dev
echo.
pause
