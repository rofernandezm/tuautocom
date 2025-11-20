# 🔧 Documentación de Scripts - TuAutoCom

Detalles técnicos de los scripts de setup.

---

## 🎯 Script Principal: Node.js

**Ubicación:** `scripts/setup-dev-env.js`

```bash
pnpm setup
```

### Características

- ✅ **Multiplataforma:** Windows, macOS, Linux, WSL
- ✅ **Detecta SO:** Automáticamente adapta comportamiento
- ✅ **Colores:** ANSI colors en consola
- ✅ **Editores:** VS Code, nano, vim, Notepad
- ✅ **Permisos:** Establece 600 (solo propietario)
- ✅ **Robusto:** Manejo de errores
- ✅ **Sin dependencias:** Solo necesita Node.js

### Qué Hace

1. ✅ Verifica que `.env.dev.example` existe
2. ✅ Crea `.env.dev` localmente (si no existe)
3. ✅ Crea `backend/.env.dev` (si no existe)
4. ✅ Establece permisos 600 en archivos
5. ⏳ Pregunta si deseas editarlo
6. ✅ Abre editor automáticamente

---

## 🔄 Alternativas

### Windows: PowerShell

**Ubicación:** `scripts/setup-dev-env.ps1`

```powershell
pnpm setup:win

# O directamente:
powershell -ExecutionPolicy Bypass -File "scripts/setup-dev-env.ps1"
```

**Características:**
- ✅ Nativo de Windows
- ✅ Colores ANSI
- ✅ Integración VS Code
- ❌ Solo Windows

### Windows: Batch

**Ubicación:** `scripts/setup-dev-env.bat`

```cmd
scripts\setup-dev-env.bat
```

**Características:**
- ✅ CMD.exe nativo
- ✅ Máxima compatibilidad
- ✅ Sin PowerShell requerido
- ❌ Menos características

### Linux/macOS: Bash

**Ubicación:** `scripts/setup-dev-env.sh`

```bash
chmod +x scripts/setup-dev-env.sh
./scripts/setup-dev-env.sh
```

**Características:**
- ✅ Bash nativo
- ✅ Respeta `$EDITOR` variable
- ✅ Shell estándar
- ❌ Solo Unix/Linux/macOS

---

## 📋 Comparativa de Scripts

| Aspecto | Node.js | PowerShell | Batch | Bash |
|--------|---------|-----------|-------|------|
| **SO** | ✅ Todos | Windows | Windows | Unix |
| **Recomendado** | ✅ SÍ | Alternativa | Alternativa | Alternativa |
| **Colores** | ✅ SÍ | ✅ Sí | ⚠️ Limitado | ✅ Sí |
| **Editores** | ✅ 3+ | 2 | 1 | 2+ |
| **Complejidad** | ⭐ Fácil | ⭐⭐ Medio | ⭐⭐ Medio | ⭐ Fácil |

---

## 🔒 Seguridad

Todos los scripts:

- ✅ Permisos 600 (solo propietario)
- ✅ Marcan como ocultos (Windows)
- ✅ Validan `.env.dev.example` existe
- ✅ Piden confirmación antes de sobrescribir
- ✅ No exponen secretos en salida
- ✅ Validan contenido de archivo

---

## 📝 Integración con pnpm

En `package.json`:

```json
{
  "scripts": {
    "setup": "node scripts/setup-dev-env.js",
    "setup:win": "powershell -ExecutionPolicy Bypass -File scripts/setup-dev-env.ps1"
  }
}
```

---

## 🛠️ Personalización

### Cambiar Editor Predeterminado

**Script Node.js:**
```javascript
// En setup-dev-env.js, busca:
let editor = process.env.EDITOR || 'nano';
```

**Variable de entorno:**
```bash
export EDITOR=vim
pnpm setup
```

### Agregar Validación

Extender validación en cualquier script:
```javascript
// Verificar variables específicas
const validateEnv = () => {
  const content = fs.readFileSync(target, 'utf8');
  if (!content.includes('DATABASE_URL')) {
    console.error('❌ DATABASE_URL no encontrada');
  }
};
```

---

## 🐛 Troubleshooting Técnico

### "Script no tiene permisos de ejecución"

```bash
# macOS/Linux
chmod +x scripts/setup-dev-env.sh
chmod +x scripts/setup-dev-env.js

# Verificar
ls -la scripts/setup-dev-env.js
# Debe mostrar: -rwxr-xr-x
```

### "PowerShell error de ejecución"

```powershell
# Temporal
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Verificar
Get-ExecutionPolicy
```

### "Node.js: comando no encontrado"

```bash
# Verificar
node --version

# Si no instalado
npm --version  # Si npm funciona, node también

# O instalar Node.js
```

---

## 📚 Más Información

- **Guía rápida:** [`QUICKSTART.md`](./QUICKSTART.md)
- **Ambiente completo:** [`ENVIRONMENT.md`](./ENVIRONMENT.md)
- **Windows:** [`WINDOWS.md`](./WINDOWS.md)
- **Índice:** [`INDEX.md`](./INDEX.md)

---

**Nota técnica:** Todos los scripts crean `.env.dev` y `backend/.env.dev` de la misma forma, manteniendo consistencia.
