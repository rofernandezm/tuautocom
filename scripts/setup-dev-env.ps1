# Setup de Ambiente - TuAutoCom para Windows (PowerShell)
# Uso: powershell -ExecutionPolicy Bypass -File "scripts/setup-dev-env.ps1"

param(
    [switch]$NoEdit,
    [switch]$Force
)

# Configurar colores
$script:Colors = @{
    Green  = "`e[32m"
    Yellow = "`e[33m"
    Red    = "`e[31m"
    Cyan   = "`e[36m"
    Bold   = "`e[1m"
    Reset  = "`e[0m"
}

function Write-Info { Write-Host "$($Colors.Cyan)ℹ️  $args$($Colors.Reset)" }
function Write-Success { Write-Host "$($Colors.Green)✓ $args$($Colors.Reset)" }
function Write-Warning { Write-Host "$($Colors.Yellow)⚠️  $args$($Colors.Reset)" }
function Write-Error { Write-Host "$($Colors.Red)✗ $args$($Colors.Reset)" }

Write-Host ""
Write-Host "$($Colors.Bold)$($Colors.Cyan)╔════════════════════════════════════════════╗$($Colors.Reset)"
Write-Host "$($Colors.Bold)$($Colors.Cyan)║   CONFIGURACION DE AMBIENTE - TuAutoCom   ║$($Colors.Reset)"
Write-Host "$($Colors.Bold)$($Colors.Cyan)╚════════════════════════════════════════════╝$($Colors.Reset)"
Write-Host ""

# Detectar SO y rutas
$projectRoot = Split-Path -Parent $PSScriptRoot
$envDev = Join-Path $projectRoot ".env.dev"
$envExample = Join-Path $projectRoot ".env.dev.example"
$backendEnvDev = Join-Path $projectRoot "backend" ".env.dev"

Write-Info "Windows PowerShell"
Write-Info "Proyecto: $projectRoot"
Write-Host ""

# Verificar que existe .env.dev.example
if (-not (Test-Path $envExample)) {
    Write-Error "No encontrado: $envExample"
    Read-Host "Presiona ENTER para salir"
    exit 1
}

# Función para configurar archivo
function Setup-EnvFile {
    param(
        [string]$Source,
        [string]$Target,
        [string]$Name
    )

    Write-Host ""
    Write-Host "$($Colors.Bold)📄 $Name$($Colors.Reset)"
    Write-Host "-" * 50

    # Crear directorio si no existe
    $targetDir = Split-Path -Parent $Target
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Info "Directorio creado: $targetDir"
    }

    if (Test-Path $Target) {
        Write-Success "Ya existe: $(Split-Path -Leaf $Target)"
        
        if (-not $Force) {
            $answer = Read-Host "¿Deseas resetear? (s/n)"
            if ($answer -notmatch '^[sS]$') {
                Write-Host "⏭️  Saltando...`n"
                return
            }
        }
        Write-Warning "Reseteando archivo..."
    }

    # Copiar archivo
    Copy-Item -Path $Source -Destination $Target -Force | Out-Null
    (Get-Item $Target).Attributes = "Hidden"
    Write-Success "Archivo creado: $(Split-Path -Leaf $Target)"
    Write-Info "Archivo marcado como oculto"

    if (-not $NoEdit) {
        $edit = Read-Host "¿Editar ahora? (s/n)"
        if ($edit -match '^[sS]$') {
            Write-Info "Abriendo en editor..."
            if (Get-Command code -ErrorAction SilentlyContinue) {
                & code --wait $Target
            } else {
                & notepad $Target
            }
        }
    }
}

# Configurar archivos
Setup-EnvFile -Source $envExample -Target $envDev -Name "Root .env.dev"
Setup-EnvFile -Source $envExample -Target $backendEnvDev -Name "Backend .env.dev"

Write-Host ""
Write-Success "Configuración completada"
Write-Host ""
Write-Host "$($Colors.Yellow)📋 Próximos pasos:$($Colors.Reset)"
Write-Host "   1. Edita los archivos .env.dev si es necesario"
Write-Host "   2. Instala dependencias: pnpm install"
Write-Host "   3. Backend: cd backend && pnpm run dev"
Write-Host "   4. Frontend: pnpm run dev"
Write-Host ""

Read-Host "Presiona ENTER para finalizar"
