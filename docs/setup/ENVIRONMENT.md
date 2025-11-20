# 🔐 Configuración de Ambiente - TuAutoCom

Guía completa para configurar variables de ambiente (.env.dev) de forma segura.

---

## ⚡ Setup Rápido

```bash
pnpm setup
```

✅ Un comando, funciona en Windows, macOS, Linux

---

## 📋 Configuración Manual

### Paso 1: Copiar Template

```bash
# macOS/Linux
cp .env.dev.example .env.dev

# Windows
copy .env.dev.example .env.dev
```

### Paso 2: Editar Archivo

```bash
# VS Code (todas plataformas)
code .env.dev

# Nano (Linux/macOS)
nano .env.dev

# Notepad (Windows)
notepad .env.dev
```

### Paso 3: Agregar Credenciales Locales

```env
# MongoDB local (sin autenticación)
DATABASE_URL=mongodb://localhost:27017/tuautocom_dev

# Servidor
PORT=8000
NODE_ENV=development

# Frontend
API_BASE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:8000,http://localhost:8080
```

---

## 🔐 Seguridad

### Archivos Versionados

✅ **Versionado en GitHub:**
- `.env.dev.example` - Template (sin secretos)

❌ **NO versionado (protegido):**
- `.env.dev` - Tu archivo local
- `.env` - Producción
- `.env.*.local` - Archivos específicos

### Permisos

```bash
# Asegurar permisos seguros (solo propietario)
chmod 600 .env.dev
```

---

## ❓ Si algo falla

### PowerShell (Windows)

```powershell
pnpm setup:win
```

### Batch (Windows)

```cmd
scripts\setup-dev-env.bat
```

### Bash (Linux/macOS)

```bash
chmod +x scripts/setup-dev-env.sh
./scripts/setup-dev-env.sh
```

---

## 📖 Variables Disponibles

Revisa `.env.dev.example` para todas las variables disponibles:

```bash
cat .env.dev.example    # macOS/Linux
type .env.dev.example   # Windows
```

---

## 🤝 Para Nuevos Miembros del Equipo

```bash
# 1. Clonar
git clone https://github.com/rofernandezm/tuautocom.git

# 2. Instalar
cd tuautocom && pnpm install

# 3. Configurar
pnpm setup

# 4. Listo!
cd backend && pnpm run dev
```

---

## 🐛 Troubleshooting

### "DATABASE_URL no definida"

```bash
# Verificar que .env.dev existe
ls .env.dev          # Linux/macOS
dir .env.dev         # Windows

# Verificar contenido
grep "DATABASE_URL" .env.dev
```

### MongoDB no conecta

```bash
# Verificar MongoDB instalado
mongod --version

# Iniciar MongoDB
```

**Linux:** `sudo systemctl start mongod`  
**macOS:** `brew services start mongodb-community`  
**Windows:** `Start-Service MongoDB`

### Puerto 8000 en uso

**Linux/macOS:**
```bash
lsof -i :8000 && kill -9 <PID>
```

**Windows:**
```powershell
netstat -ano | findstr :8000 && taskkill /PID <PID> /F
```

**O cambiar puerto:** Edita `.env.dev` → `PORT=3000`

### Script no ejecuta en Windows

```powershell
# PowerShell error
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
pnpm setup:win
```

### pnpm no funciona

```powershell
npm install -g pnpm
pnpm --version
```

### .env.dev se ve en git

```bash
# Remover si fue versionado por error
git rm --cached .env.dev backend/.env.dev
git commit -m "security: remove .env files"
git push

# Verificar .gitignore
cat .gitignore | grep "\.env"
```

---

## 📚 Más Información

- **Guía rápida:** [`QUICKSTART.md`](./QUICKSTART.md)
- **Windows específico:** [`WINDOWS.md`](./WINDOWS.md)
- **Scripts técnico:** [`SCRIPTS.md`](./SCRIPTS.md)
- **Índice completo:** [`INDEX.md`](./INDEX.md)

---

**Importante:** Nunca versiones `.env.dev` con credenciales reales.
