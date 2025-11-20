# 🪟 Setup en Windows - TuAutoCom

Guía específica para configurar TuAutoCom en Windows.

---

## 🎯 Un Comando Para Todos

```bash
pnpm setup
```

Automáticamente:
- ✅ Detecta que es Windows
- ✅ Crea `.env.dev` localmente
- ✅ Abre editor favorito
- ✅ Establece permisos correctos

---

## 🔄 Flujo Completo en Windows

```powershell
# 1. Clonar
git clone https://github.com/rofernandezm/tuautocom.git
cd tuautocom

# 2. Instalar dependencias
pnpm install

# 3. Configurar ambiente
pnpm setup

# 4. Backend (Terminal 1)
cd backend
pnpm run dev

# 5. Frontend (Terminal 2 - Nueva)
cd tuautocom.UI
pnpm run dev
```

---

## 🔄 Alternativas (Si algo falla)

### Opción 1: PowerShell

```powershell
pnpm setup:win
```

### Opción 2: Batch (CMD.exe)

```cmd
scripts\setup-dev-env.bat
```

### Opción 3: Manual

```cmd
copy .env.dev.example .env.dev
notepad .env.dev
```

---

## 🐛 Problemas Comunes en Windows

### Problema: "cannot be loaded because running scripts is disabled"

**Solución:**
```powershell
# Temporal (sesión actual)
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
pnpm setup:win
```

### Problema: pnpm no encontrado

```powershell
# Instalar
npm install -g pnpm

# Verificar
pnpm --version
```

### Problema: MongoDB no inicia

```powershell
# Ver si está como servicio
Get-Service MongoDB

# Iniciar
Start-Service MongoDB

# O ejecutar directamente
mongod
```

### Problema: Puerto 8000 en uso

```powershell
# Ver proceso
netstat -ano | findstr :8000

# Matar (reemplaza PID)
taskkill /PID 1234 /F

# O cambiar puerto en .env.dev
# PORT=3000
```

### Problema: WSL en Windows

Si usas WSL:
```bash
# Desde terminal WSL
pnpm setup
```

El script detecta WSL y funciona correctamente.

### Problema: Rutas con espacios

Si tu usuario tiene espacios (ej: "Mi Usuario"):
```powershell
# ✅ Usar Node.js (mejor)
pnpm setup

# ✅ O PowerShell con comillas
& "scripts/setup-dev-env.ps1"
```

### Problema: .env.dev en git status

```powershell
# Si fue versionado por error
git rm --cached .env.dev backend/.env.dev
git commit -m "security: remove .env files"
git push

# Verificar .gitignore
type .gitignore | findstr "\.env"
```

---

## ✨ Tips para Windows

- ✅ Usa PowerShell o Windows Terminal (más moderno)
- ✅ Si pnpm falla, instala con `npm install -g pnpm`
- ✅ MongoDB Windows: Instalar desde [mongodb.com](https://www.mongodb.com)
- ✅ Git: Descargar desde [git-scm.com](https://git-scm.com)
- ✅ Node.js: Descargar desde [nodejs.org](https://nodejs.org)

---

## 📚 Más Información

- **Guía rápida:** [`QUICKSTART.md`](./QUICKSTART.md)
- **Ambiente completo:** [`ENVIRONMENT.md`](./ENVIRONMENT.md)
- **Scripts técnico:** [`SCRIPTS.md`](./SCRIPTS.md)
- **Índice:** [`INDEX.md`](./INDEX.md)

---

**Próximo paso:** Ejecuta `pnpm setup` y comienza a desarrollar 🎉
