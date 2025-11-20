# 📚 Documentación - TuAutoCom

Índice central de toda la documentación del proyecto.

---

## 🚀 Inicio Rápido

**¿Primera vez en el proyecto?** Comienza aquí:

1. 📖 **Leer:** [`README.md`](../README.md) - Visión general del proyecto
2. ⚙️ **Setup:** [`setup/README.md`](setup/README.md) - Configurar ambiente (5 min)
3. 🎯 **Estado:** [`project/ESTADO.md`](project/ESTADO.md) - Qué está implementado
4. 🗺️ **Roadmap:** [`project/ROADMAP.md`](project/ROADMAP.md) - Hacia dónde vamos

---

## 📁 Estructura de Documentación

```
docs/
├── INDEX.md              ← Estás aquí (navegación central)
│
├── setup/                (Configuración inicial)
│   ├── README.md         - Guía completa de instalación
│   └── WINDOWS.md        - Instrucciones específicas para Windows
│
├── project/              (Estado del proyecto)
│   ├── ESTADO.md         - Implementación actual (técnico)
│   └── ROADMAP.md        - Próximas funcionalidades
│
└── changelog/            (Historial de cambios)
    ├── 2025-11-19.md     - Integración FichaDetallada
    └── 2025-11-20.md     - Limpieza de caché git
```

---

## 📖 Guías por Tema

### 🔧 Configuración y Setup

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| [`setup/README.md`](setup/README.md) | Guía completa de instalación | Nuevos desarrolladores |
| [`setup/WINDOWS.md`](setup/WINDOWS.md) | Setup en Windows (PowerShell/Batch) | Usuarios de Windows |
| [`../scripts/README.md`](../scripts/README.md) | Scripts de automatización | Referencia técnica |

**Tiempo:** ~5 minutos  
**Requisitos:** Node.js v18+, pnpm v8+, MongoDB

---

### 📊 Estado del Proyecto

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| [`project/ESTADO.md`](project/ESTADO.md) | Estado técnico completo | Desarrolladores, AI agents |
| [`project/ROADMAP.md`](project/ROADMAP.md) | Plan de desarrollo futuro | Todo el equipo |

**Actualización:** Semanal

---

### 📝 Changelog e Historial

| Documento | Descripción | Fecha |
|-----------|-------------|-------|
| [`changelog/2025-11-20.md`](changelog/2025-11-20.md) | Limpieza git + reorganización docs | 2025-11-20 |
| [`changelog/2025-11-19.md`](changelog/2025-11-19.md) | Integración FichaDetallada + Comments | 2025-11-19 |

**Convención:** Un archivo por sesión de desarrollo importante

---

### 🏗️ Arquitectura y Código

| Documento | Descripción | Ubicación |
|-----------|-------------|-----------|
| Instrucciones AI | Guía completa para agentes de IA | [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) |
| Backend API | Endpoints y modelos | [`../backend/README.md`](../backend/README.md) |
| Frontend UI | Build y estructura | [`../tuautocom.UI/README.md`](../tuautocom.UI/README.md) |
| Designs | Stitch designs (Google) | [`../tuautocom.UI/designs/README.md`](../tuautocom.UI/designs/README.md) |

---

## 🎯 Casos de Uso

### "Soy nuevo en el proyecto"

1. Lee [`../README.md`](../README.md) para entender el proyecto
2. Sigue [`setup/README.md`](setup/README.md) para configurar
3. Revisa [`project/ESTADO.md`](project/ESTADO.md) para saber qué funciona
4. Consulta [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) para patrones de código

### "Quiero contribuir"

1. Revisa [`project/ROADMAP.md`](project/ROADMAP.md) para ver qué falta
2. Lee [`project/ESTADO.md`](project/ESTADO.md) para saber qué está hecho
3. Consulta [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) para convenciones
4. Documenta cambios en [`changelog/`](changelog/)

### "Tengo problemas con setup"

1. Lee [`setup/README.md`](setup/README.md) completo
2. Sección "Troubleshooting"
3. Windows: ver [`setup/WINDOWS.md`](setup/WINDOWS.md)
4. Verificar versiones (Node.js v18+, pnpm v8+)

### "Necesito saber qué endpoints existen"

1. [`../backend/README.md`](../backend/README.md) - Documentación de API
2. [`project/ESTADO.md`](project/ESTADO.md) - Tabla de endpoints implementados
3. Código fuente: `backend/src/routes/`

### "Quiero entender la arquitectura"

1. [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) - Arquitectura completa
2. [`project/ESTADO.md`](project/ESTADO.md) - Flujo de datos
3. [`../README.md`](../README.md) - Diagrama de estructura

---

## 🔍 Búsqueda Rápida

### Por Tecnología

- **MongoDB:** [`project/ESTADO.md`](project/ESTADO.md#modelos-mongoose) + [`project/ROADMAP.md`](project/ROADMAP.md#-prioridades-por-aprendizaje-mongodb)
- **Express:** [`../backend/README.md`](../backend/README.md)
- **Vanilla JS:** [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md#architecture-patterns)
- **Tailwind CSS:** [`../tuautocom.UI/README.md`](../tuautocom.UI/README.md)
- **Mongoose:** [`project/ESTADO.md`](project/ESTADO.md#backend---api-rest-express--mongodb)

### Por Tema

- **Setup:** [`setup/`](setup/)
- **API Endpoints:** [`../backend/README.md`](../backend/README.md) + [`project/ESTADO.md`](project/ESTADO.md)
- **Componentes UI:** [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md#frontend-component-pattern)
- **Variables de ambiente:** [`setup/README.md`](setup/README.md#-variables-de-ambiente)
- **Scripts:** [`../scripts/README.md`](../scripts/README.md)

---

## 📅 Actualización de Documentación

### Cuándo Actualizar

| Tipo de Cambio | Documento a Actualizar |
|-----------------|------------------------|
| Nueva funcionalidad | `project/ESTADO.md` + `changelog/` |
| Bug fix importante | `changelog/` |
| Cambio de arquitectura | `../.github/copilot-instructions.md` + `project/ESTADO.md` |
| Nueva dependencia | `setup/README.md` |
| Nuevo endpoint | `../backend/README.md` + `project/ESTADO.md` |
| Sesión de desarrollo | `changelog/YYYY-MM-DD.md` (nuevo archivo) |

### Convenciones

- **Idioma:** Español (documentación y comentarios)
- **Código:** Inglés (variables, funciones, clases)
- **Commits:** Español
- **Formato:** Markdown con emojis para navegación visual

---

## 🆘 Ayuda

### No encuentro lo que busco

1. Usa `Ctrl+F` en este documento
2. Revisa tabla de contenidos de cada documento
3. Busca en el código: `grep -r "término" docs/`
4. Pregunta al equipo

### Documentación desactualizada

1. Crear issue en GitHub
2. O actualizar directamente y hacer PR
3. Mantener fecha de "Última actualización" al pie

### Información contradictoria

La prioridad de documentos es:
1. **Código fuente** (siempre es la verdad)
2. **`project/ESTADO.md`** (estado actual)
3. **`changelog/`** (cambios históricos)
4. **Otros documentos** (referencia general)

---

## 🤝 Contribuir a la Documentación

### Mejoras Bienvenidas

- ✅ Correcciones de typos
- ✅ Clarificaciones
- ✅ Ejemplos adicionales
- ✅ Traducciones de errores comunes
- ✅ Troubleshooting cases

### Cómo Contribuir

1. Editar documento correspondiente
2. Actualizar "Última actualización" al pie
3. Commit: `docs: descripción del cambio`
4. Push y crear PR (si aplica)

---

## 📌 Enlaces Externos

- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
- [Express 5 Docs](https://expressjs.com/en/5x/api.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [pnpm Docs](https://pnpm.io/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Última actualización:** 2025-11-20  
**Mantenido por:** Equipo TuAutoCom  
**Versión:** 2.0
