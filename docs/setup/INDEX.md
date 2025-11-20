# 📚 Documentación de Setup - TuAutoCom

Índice de guías para configurar tu ambiente de desarrollo.

---

## 🚀 Inicio Rápido

**Nuevo en el proyecto?** → Lee [`QUICKSTART.md`](./QUICKSTART.md)  
**Solo 5 pasos**, funciona en Windows, macOS, Linux.

---

## 📖 Documentación

### 1. **[`QUICKSTART.md`](./QUICKSTART.md)** - Guía Rápida (5 pasos)
   - Clonar repo
   - Instalar dependencias
   - Configurar ambiente (`pnpm setup`)
   - Iniciar backend
   - Iniciar frontend
   - **Tiempo:** 5 minutos

### 2. **[`ENVIRONMENT.md`](./ENVIRONMENT.md)** - Configuración de Ambiente
   - Protección de `.env.dev`
   - Variables de ambiente
   - Setup automático (Node.js script)
   - Alternativas (PowerShell, Batch, Bash)
   - Troubleshooting detallado

### 3. **[`WINDOWS.md`](./WINDOWS.md)** - Setup en Windows
   - Específico para Windows
   - Alternativas si `pnpm setup` falla
   - Problemas comunes en Windows
   - Soluciones MongoDB, ports, etc.

### 4. **[`SCRIPTS.md`](./SCRIPTS.md)** - Documentación Técnica de Scripts
   - Explicación de cada script
   - Cuándo usar cada uno
   - Editores soportados
   - Configuración avanzada

---

## 🎯 Por Sistema Operativo

### 🪟 Windows
```bash
pnpm setup
```
→ Si algo falla, ver [`WINDOWS.md`](./WINDOWS.md)

### 🍎 macOS
```bash
pnpm setup
```

### 🐧 Linux
```bash
pnpm setup
```

---

## ✨ Un Comando Para Todos

Independiente del SO:
```bash
pnpm setup
```

✅ Funciona en Windows, macOS, Linux  
✅ Detecta tu sistema operativo  
✅ Crea `.env.dev` automáticamente  
✅ Pregunta si deseas editarlo  
✅ Abre tu editor favorito  

---

## 🔐 Seguridad

- ✅ `.env.dev.example` versionado (template público)
- ✅ `.env.dev` NO versionado (credenciales locales)
- ✅ Protegido en `.gitignore`
- ✅ Permisos 600 (solo propietario)

---

## ❓ Necesitas Ayuda?

| Pregunta | Recurso |
|----------|---------|
| "¿Primeros pasos?" | [`QUICKSTART.md`](./QUICKSTART.md) |
| "¿Cómo configuro .env.dev?" | [`ENVIRONMENT.md`](./ENVIRONMENT.md) |
| "¿Problemas en Windows?" | [`WINDOWS.md`](./WINDOWS.md) |
| "¿Detalles técnicos de scripts?" | [`SCRIPTS.md`](./SCRIPTS.md) |

---

## 📍 Archivos Relacionados

- **`.env.dev.example`** - Template de variables de ambiente (raíz)
- **`.gitignore`** - Excluye `.env.dev` de versionado
- **`.gitattributes`** - Line endings correctos
- **`scripts/`** - Scripts de setup (Node.js, PowerShell, Batch, Bash)

---

**Última actualización:** 2025-11-19  
**Siguiente:** Elige una guía según tus necesidades
