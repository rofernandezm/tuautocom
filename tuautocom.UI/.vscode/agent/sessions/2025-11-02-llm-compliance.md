---
title: "2025-11-02 — Obligación LLM: lectura y confirmación de AGENT/LLM-GUIDELINES/CONTEXT"
date: 2025-11-02
author: agente-automatizado

## Resumen

Se añadió un requisito explícito en `AGENT.md` que obliga a cualquier modelo (LLM) a leer y confirmar `AGENT.md`, `LLM-GUIDELINES.md` y `CONTEXT.md` antes de ejecutar cambios o proponer implementaciones en el repositorio.

## Archivos modificados

- `.vscode/agent/AGENT.md` — Se agregó la sección **OBLIGATORIO PARA MODELOS LLM** y se actualizó la versión a `v1.3.1`.
- `.vscode/agent/LLM-GUIDELINES.md` — Se añadió una referencia corta (cross-reference) indicando la obligación de lectura y confirmación.
- `.vscode/agent/CONTEXT.md` — Se añadió una nota para modelos LLM que remite a `AGENT.md`.

## Motivo

Evitar divergencias en la metodología cuando distintos modelos LLM (o instancias) trabajen en el repositorio. Dado que la documentación fue creada por otro agente, es necesario forzar la lectura y confirmación para que cualquier modelo nuevo entienda y siga las pautas establecidas.

## Qué se espera del modelo

1. Leer `AGENT.md`, `LLM-GUIDELINES.md`, `CONTEXT.md` y la última sesión en `.vscode/agent/sessions/` antes de actuar.
2. Confirmar en español que realizó dichas lecturas y que las seguirá.
3. Si no tiene acceso a los archivos locales, solicitar permiso al usuario o pedir la información necesaria.

## Próximos pasos recomendados

- Realizar verificación runtime: ejecutar `pnpm build` y una prueba manual de la búsqueda en `HomeView`.
- Documentar esta sesión en el changelog del proyecto si corresponde.

## Commit sugerido (en español)

`docs: agregar obligación para modelos LLM de leer AGENT/LLM-GUIDELINES/CONTEXT antes de actuar (v1.3.1)`

---
