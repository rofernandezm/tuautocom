# TuAutocom Frontend Copilot Agent

## 🎯 Descripción
Agente especializado para el desarrollo frontend del proyecto tuautocom, enriquecido con las capacidades y mejores prácticas de v0 de Vercel.

## 📁 Estructura del Agente

```
frontend/.copilot-agent/
├── agent.json           # Configuración principal del agente
├── index.ts            # Implementación de comandos
├── config.json         # Configuración extendida y referencias
├── docs/               # Base de conocimientos
│   ├── README.md       # Índice de documentación
│   ├── v0-capabilities.md
│   ├── ai-sdk-guide.md
│   ├── component-templates.md
│   └── mermaid-templates.md
└── AGENT_README.md     # Este archivo
```

## 🚀 Comandos Disponibles

### Desarrollo Local
- **`/start-server`** - Ejecuta live-server en el directorio frontend
- **`/setup`** - Configura Node, pnpm y dependencias del proyecto

### Documentación
- **`/update-readme`** - Actualiza el README.md del frontend
- **`/docs [topic]`** - Consulta la documentación interna del agente

### Características v0
- **`/create-component <name> [type]`** - Genera componentes React optimizados
- **`/setup-nextjs`** - Configura proyecto Next.js con App Router
- **`/ai-integration [feature]`** - Integra Vercel AI SDK
- **`/create-diagram <type> <description>`** - Genera diagramas Mermaid
- **`/migrate-ai-sdk`** - Migra de openai-edge a Vercel AI SDK

## 🛠️ Tecnologías Soportadas

### Frontend Frameworks
- Next.js 15 (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui

### AI & ML
- Vercel AI SDK
- OpenAI GPT-4o
- Anthropic Claude
- Google Generative AI
- Perplexity

### Diagramas & Documentación
- Mermaid.js
- LaTeX (matemáticas)
- MDX
- GitHub Flavored Markdown

## 📚 Base de Conocimientos

El agente mantiene una base de conocimientos actualizada con:

1. **Capacidades de v0**: Code Projects, React patterns, AI SDK
2. **Templates de componentes**: UI, páginas, layouts, modales, formularios
3. **Guías de AI SDK**: useChat, streamText, migración, mejores prácticas
4. **Templates de diagramas**: Flowcharts, secuencias, clases, ER
5. **Patrones de arquitectura**: Microservicios, CI/CD, sistemas

## 🎨 Ejemplos de Uso

### Crear un Componente
```bash
/create-component VehicleCard ui
```

### Configurar Next.js
```bash
/setup-nextjs
```

### Integrar Chatbot
```bash
/ai-integration chatbot
```

### Generar Diagrama
```bash
/create-diagram flowchart "proceso de autenticación"
```

### Consultar Documentación
```bash
/docs ai-sdk
```

## 🔄 Flujo de Trabajo Recomendado

1. **Setup inicial**: `/setup` → `/setup-nextjs`
2. **Desarrollo**: `/create-component` → `/ai-integration`
3. **Documentación**: `/create-diagram` → `/update-readme`
4. **Migración**: `/migrate-ai-sdk` si es necesario
5. **Consulta**: `/docs [topic]` para referencia

## 🚀 Características Destacadas

### ✅ Workspace-Aware
- Rutas relativas al workspace de VSCode
- Compatible con cualquier ubicación del proyecto
- Terminal integrado optimizado

### ✅ v0 Best Practices
- Componentes TypeScript + Tailwind
- App Router por defecto
- Server Components optimizados
- Accessibility incluida
- Responsive design automático

### ✅ AI SDK Ready
- Templates para useChat
- Configuración de API routes
- Manejo de errores robusto
- Streaming optimizado
- Multi-provider support

### ✅ Documentation First
- Diagramas Mermaid integrados
- Templates de código listos
- Guías de migración paso a paso
- Documentación autoactualizable

## 🔧 Configuración

El agente se configura automáticamente para:
- Usar rutas relativas al workspace
- Generar código compatible con v0
- Aplicar mejores prácticas de desarrollo
- Mantener consistencia en patrones
- Facilitar mantenimiento y escalabilidad

## 📈 Beneficios

1. **Productividad**: Templates y comandos listos para usar
2. **Consistencia**: Patrones unificados basados en v0
3. **Modernidad**: Últimas tecnologías y mejores prácticas
4. **Documentación**: Base de conocimientos integrada
5. **Flexibilidad**: Adaptable a diferentes flujos de trabajo
6. **Escalabilidad**: Arquitectura modular y mantenible

---

## 📚 **Documentación y Base de Conocimiento**

### v0 (Vercel) Capabilities
- **AI SDK Integration**: Implementación completa del Vercel AI SDK
- **Component Templates**: Templates de shadcn/ui y componentes modernos
- **Best Practices**: Patrones de diseño y arquitectura recomendados
- **Mermaid Diagrams**: Plantillas para diagramas de arquitectura

### GitHub Copilot Advanced Features
- **Code Analysis**: Análisis profundo de código y arquitectura
- **Refactoring**: Sugerencias de refactoring automático
- **Debug Assistance**: Ayuda avanzada para debugging
- **Test Generation**: Generación automática de tests
- **Optimization**: Análisis de rendimiento y optimización
- **Code Review**: Revisión automatizada de código
- **Documentation**: Generación automática de documentación
- **Security Scanning**: Análisis de vulnerabilidades
- **Workflow Setup**: Configuración de CI/CD y automatización

### Knowledge Base Structure
```
docs/
├── README.md              # Índice y navegación
├── v0-capabilities.md     # Capacidades v0/Vercel
├── ai-sdk-guide.md        # Guía del AI SDK
├── component-templates.md # Templates de componentes
└── mermaid-templates.md   # Templates de diagramas
```

## 🎯 **Comandos Disponibles**

### Desarrollo Básico
- `/setup` - Configurar entorno de desarrollo
- `/start-server` - Iniciar live-server
- `/create-component <name> <type>` - Crear componente React

### v0 y AI
- `/v0-help` - Ayuda sobre capacidades v0
- `/create-ai-component <name>` - Crear componente con AI SDK
- `/setup-ai-sdk` - Configurar Vercel AI SDK
- `/generate-diagram <type>` - Generar diagramas Mermaid

### GitHub Copilot Advanced
- `/analyze-code [scope]` - Análisis profundo de código
- `/refactor [scope] [strategy]` - Refactoring automático
- `/debug-help [scope]` - Asistencia de debugging
- `/generate-tests [type]` - Generación de tests
- `/optimize [type] [scope]` - Optimización de rendimiento
- `/code-review [scope] [focus]` - Revisión de código
- `/generate-docs [type] [format]` - Documentación automática
- `/security-scan [scope]` - Escaneo de seguridad
- `/workflow-setup [type] [platform]` - Configuración de workflows

## 🛠️ **Configuración y Uso**

### Prerequisitos
- Node.js 18+
- VS Code
- GitHub Copilot activado
- Extensión GitHub Copilot Chat

### Activación
1. Abre VS Code en el directorio del proyecto
2. El agente se activa automáticamente
3. Usa comandos con `/` en Copilot Chat
4. Accede a la documentación con `/v0-help`

### Estructura de Comandos
```
/comando [parámetro-requerido] [parámetro-opcional]
```

### Ejemplos de Uso
```bash
# Configurar entorno
/setup

# Crear componente UI
/create-component VehicleCard ui

# Análisis de código
/analyze-code src/components

# Generar tests
/generate-tests component

# Optimizar rendimiento
/optimize performance app

# Configurar CI/CD
/workflow-setup ci github-actions
```

## 📋 **Features Implementadas**

### ✅ Funcionalidades Básicas
- [x] Configuración de entorno
- [x] Gestión de servidor de desarrollo
- [x] Creación de componentes
- [x] Gestión de rutas workspace-relative

### ✅ Integración v0
- [x] Documentación completa de v0
- [x] Templates de componentes
- [x] Guías del AI SDK
- [x] Plantillas Mermaid
- [x] Best practices

### ✅ Capacidades Copilot Avanzadas
- [x] Análisis de código con métricas
- [x] Refactoring automático
- [x] Debugging inteligente
- [x] Generación de tests
- [x] Optimización de rendimiento
- [x] Code review automatizado
- [x] Documentación automática
- [x] Security scanning
- [x] Workflow automation

### ✅ Base de Conocimiento
- [x] Documentación estructurada
- [x] Templates reutilizables
- [x] Configuración centralizada
- [x] Ejemplos prácticos

## 🔄 **Actualizaciones y Mantenimiento**

### Versioning
- Versión actual: **v2.0.0** (Copilot Enhanced)
- Compatibilidad: VS Code + GitHub Copilot
- Última actualización: Diciembre 2024

### Roadmap
- [ ] Integración con más herramientas de testing
- [ ] Soporte para más frameworks
- [ ] Templates adicionales
- [ ] Métricas y analytics

## 🤝 **Contribución**

Para contribuir al agente:
1. Edita los archivos en `.copilot-agent/`
2. Actualiza la documentación correspondiente
3. Testea los comandos
4. Actualiza este README

## 📞 **Soporte**

Para soporte o preguntas:
- Usa `/v0-help` para documentación v0
- Revisa `docs/` para guías detalladas
- Consulta ejemplos en los templates
- Usa los comandos de análisis para debugging

---

**Versión**: 2.0.0 (Copilot Enhanced)  
**Última actualización**: Diciembre 2024  
**Compatibilidad**: VSCode Copilot Agent v1+ + GitHub Copilot  
**TuAutocom Copilot Agent** - Potenciado por GitHub Copilot y v0 (Vercel) 🚀