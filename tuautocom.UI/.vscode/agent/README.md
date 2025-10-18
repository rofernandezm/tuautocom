# Agent Directory

Este directorio contiene la documentación interna del proyecto, instrucciones para agentes de IA y contexto de desarrollo.

## 📁 Estructura

```
.vscode/agent/
├── AGENT.md           # Instrucciones para agentes de IA
├── CONTEXT.md         # Contexto del proyecto
├── README.md          # Este archivo
└── sessions/          # Historial de sesiones de desarrollo
    └── YYYY-MM-DD-descripcion.md
```

## 📄 Archivos

### **AGENT.md**
Instrucciones completas para agentes de IA:
- Patrones de código establecidos
- Estándares de desarrollo
- Arquitectura del proyecto
- Flujos de trabajo
- Ejemplos de código

### **CONTEXT.md**
Contexto y estado del proyecto:
- Decisiones técnicas tomadas
- Stack tecnológico
- Vistas planificadas
- Pendientes y TODOs

### **sessions/**
Historial de sesiones de desarrollo:
- Log detallado de cada sesión
- Decisiones tomadas en cada punto
- Cambios realizados
- Problemas encontrados y soluciones
- Continuidad entre sesiones

**Uso**: Cargar archivo de sesión más reciente para recuperar contexto completo.

## 🎯 Propósito

1. **Documentación centralizada**: Todo en un solo lugar
2. **Contexto para IA**: Facilitar trabajo con agentes de IA
3. **Historial preservado**: Decisiones y cambios documentados
4. **Continuidad**: Retomar trabajo fácilmente
5. **Clean architecture**: Separado del código fuente

## ⚠️ Importante

- Este directorio **NO** debe ser desplegado en producción
- Agregar a `.gitignore` si contiene información sensible
- Mantener actualizado al tomar decisiones importantes
