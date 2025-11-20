# 🔧 Scripts de Setup - TuAutoCom

Scripts automáticos para configurar el ambiente de desarrollo.

---

## 📖 Documentación Centralizada

**Toda la documentación está en:** [`docs/setup/`](../docs/setup/)

- **Índice:** [`docs/setup/INDEX.md`](../docs/setup/INDEX.md)
- **Guía rápida:** [`docs/setup/QUICKSTART.md`](../docs/setup/QUICKSTART.md)
- **Configuración:** [`docs/setup/ENVIRONMENT.md`](../docs/setup/ENVIRONMENT.md)
- **Windows:** [`docs/setup/WINDOWS.md`](../docs/setup/WINDOWS.md)
- **Técnica:** [`docs/setup/SCRIPTS.md`](../docs/setup/SCRIPTS.md)

---

## 🚀 Uso Rápido

### Recomendado (Todos los SO)

```bash
pnpm setup
```

### Alternativas (Si algo falla)

```powershell
# Windows - PowerShell
pnpm setup:win

# Windows - Batch
scripts\setup-dev-env.bat

# macOS/Linux - Bash
chmod +x scripts/setup-dev-env.sh
./scripts/setup-dev-env.sh
```

---

## 📁 Archivos

| Archivo | Lenguaje | SO | Uso |
|---------|----------|----|----|
| `setup-dev-env.js` | Node.js | ✅ Todos | **Principal** |
| `setup-dev-env.ps1` | PowerShell | Windows | Alternativa |
| `setup-dev-env.bat` | Batch | Windows | Alternativa |
| `setup-dev-env.sh` | Bash | macOS/Linux | Alternativa |

---

**Ver documentación completa en:** [`docs/setup/`](../docs/setup/)
