# 🧠 LLM Guidelines - Parte 3: Práctica y Recursos

> **LÍMITE**: Máximo 300 líneas
> **Parte**: 3 de 3
> **Anterior**: llm-guidelines-2-proceso.md

---

## 🎯 EJERCICIO PRÁCTICO

### Tarea Ejemplo: "Cambia el color del botón"

#### ❌ Respuesta Mala (Genérica)
```
"Ok, he cambiado el color del botón a azul."
```

#### ✅ Respuesta Claude (Sistemática)

```markdown
## 🎯 Análisis

Entiendo que necesitas cambiar el color del botón.

Primero necesito información adicional:
1. ¿Qué botón específicamente? (hay múltiples en el proyecto)
2. ¿A qué color?
3. ¿Este cambio es temporal o actualizar el tema?

Voy a investigar los botones existentes:

[semantic_search("button component")]
[read_file("js/components/Button.js")]

## 🔍 Hallazgos

He encontrado:
- Botón en `Header.js` línea 45 (búsqueda)
- Botón en `VehicleCarousel.js` líneas 47, 59 (navegación)
- Botón en `ContactForm.js` línea 30 (submit)

Estos botones usan colores del tema centralizado:
- `bg-[#214a3c]` (primary-medium)

## 💡 Propuesta

Si el cambio es para TODOS los botones:
→ Modificar `js/config/theme.js`
→ Ejecutar `pnpm build`
→ Todo se actualiza automáticamente

Si es para UN botón específico:
→ Indicarme cuál
→ Modificar solo ese componente

¿Cuál prefieres?
```

**Nota la diferencia:**
- ❌ Acción directa sin contexto
- ✅ Investigación, opciones, confirmación

---

## 📚 RECURSOS DE REFERENCIA OBLIGATORIOS

### Antes de CADA Sesión
```
1. Leer: core/AGENT.md
   - Patrones de código
   - Estándares del proyecto
   - Arquitectura
   
2. Leer: reference/CONTEXT.md
   - Estado actual del proyecto
   - Componentes completados
   - Decisiones pendientes
   
3. Leer: sessions/[última].md
   - Qué se hizo recientemente
   - Decisiones tomadas
   - Contexto inmediato
```

### Durante Cada Tarea
```
1. Consultar: core/AGENT.md sección relevante
   - ¿Existe un patrón para esto?
   - ¿Cómo se hace en este proyecto?
   
2. Buscar: Código similar existente
   - semantic_search()
   - grep_search()
   - read_file()
   
3. Verificar: Estándares
   - Nomenclatura
   - Estructura
   - Imports
```

---

## 🎓 PRINCIPIOS FUNDAMENTALES (RESUMEN)

1. **Lee antes de escribir**
2. **Entiende antes de cambiar**
3. **Planifica antes de implementar**
4. **Valida después de cada cambio**
5. **Explica el por qué, no solo el qué**
6. **Sigue patrones existentes**
7. **Incrementa, no hagas big bang**
8. **Documenta con claridad**
9. **Enseña mientras implementas**
10. **Nunca asumas, siempre verifica**

---

## ✅ CHECKLIST RÁPIDO PARA CADA TAREA

```markdown
ANTES:
- [ ] Leí core/AGENT.md
- [ ] Leí reference/CONTEXT.md
- [ ] Leí última sesión
- [ ] Entiendo la tarea completamente
- [ ] Identifiqué archivos a modificar
- [ ] Busqué patrones similares

DURANTE:
- [ ] Leo archivo antes de modificar
- [ ] Uso contexto suficiente (3-5 líneas)
- [ ] Build después de cada cambio
- [ ] Verifico código servido
- [ ] Corrijo errores antes de continuar

DESPUÉS:
- [ ] Build final sin errores
- [ ] Código sigue patrones
- [ ] Imports tienen .js
- [ ] Sin console.logs debug
- [ ] Documenté cambios claramente
- [ ] Creé resumen visual
```

---

## 🚀 CONCLUSIÓN

**La diferencia entre un LLM básico y Claude Sonnet 4.5 no es capacidad técnica, es METODOLOGÍA.**

Siguiendo estos principios:
- GPT-4o-mini puede producir resultados de GPT-4
- Grok Fast puede producir resultados de Grok Pro
- Cualquier LLM puede producir resultados de Claude Sonnet 4.5

**La clave es:**
1. Pensar sistemáticamente
2. Verificar constantemente
3. Explicar detalladamente
4. Seguir patrones establecidos
5. Documentar exhaustivamente

**No se trata de ser más inteligente, se trata de ser más deliberado.**

---

**Usa este documento como tu "manual de operación" para cada sesión de desarrollo en este proyecto.**

---

## 📖 NAVEGACIÓN

- **Parte 1**: [llm-guidelines-1-intro.md](llm-guidelines-1-intro.md) - Introducción y razonamiento
- **Parte 2**: [llm-guidelines-2-proceso.md](llm-guidelines-2-proceso.md) - Proceso paso a paso
- **Parte 3**: [llm-guidelines-3-practica.md](llm-guidelines-3-practica.md) - Práctica y recursos (este archivo)
- **Índice general**: [../INDEX.md](../INDEX.md)
- **Agente principal**: [../core/AGENT.md](../core/AGENT.md)

---

**Versión**: 2.0.0 (fraccionado)
**Fecha**: 2025-11-02
**Basado en**: Metodología observada de Claude Sonnet 4.5
**Para**: Todos los modelos LLM trabajando en TuAutoCom
