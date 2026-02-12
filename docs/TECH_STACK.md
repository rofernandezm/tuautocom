🌐 Idioma: **Español** | [Inglés](TECH_STACK_EN.md)

# Tech Stack

Este documento describe las tecnologías utilizadas en TuAutoCom y el criterio detrás de su selección.

El objetivo no fue experimentar con herramientas emergentes, sino utilizar un stack estable, ampliamente adoptado y coherente entre capas.

---

## Backend

### Node.js

Runtime principal del servidor.

**Motivo de elección**
- Amplia adopción en aplicaciones web.
- Ecosistema maduro.
- Integración natural con frontend JavaScript.
- Bajo riesgo tecnológico.

---

### Express.js

Framework minimalista para construcción de API REST.

**Motivo de elección**
- Simplicidad y control explícito.
- Sin abstracciones innecesarias.
- Permite estructurar rutas, middleware y controladores de forma clara.

---

### MongoDB

Base de datos documental.

**Motivo de elección**
- Modelo flexible para datos heterogéneos.
- Representación natural de estructuras anidadas.
- Uso de agregaciones para consultas derivadas.
- Alineación directa con la consigna del proyecto.

---

### MongoDB Atlas (Cloud Cluster)

Instancia de base de datos alojada en la nube.

**Motivo de elección**
- Portabilidad del entorno.
- Configuración reproducible.
- Independencia del entorno local.
- Cercanía a escenarios reales de despliegue.

---

### Mongoose

ODM para MongoDB.

**Motivo de elección**
- Definición explícita de esquemas.
- Validaciones integradas.
- Organización clara del modelo de datos.
- Capa adicional de estructura sobre la base documental.

---

## Frontend

### ES Modules (JavaScript nativo)

Sistema modular basado en módulos ECMAScript del navegador.

**Motivo de elección**
- Modularización sin framework pesado.
- Control explícito de dependencias.
- Separación clara entre componentes, vistas y servicios.

---

### Tailwind CSS

Framework utilitario para estilos.

**Motivo de elección**
- Rapidez en construcción de UI.
- Consistencia visual.
- Reducción de CSS personalizado innecesario.

---

### SASS

Preprocesador CSS.

**Motivo de elección**
- Organización de estilos.
- Variables y estructura modular.
- Mejora de mantenibilidad.

---

## Gestión de dependencias

### pnpm

Gestor de paquetes utilizado tanto en backend como en frontend.

**Motivo de elección**
- Manejo eficiente de dependencias.
- Instalaciones determinísticas.
- Mejor rendimiento frente a alternativas tradicionales.

---

## Organización del repositorio

### Monorepo

Backend y frontend conviven en un mismo repositorio.

**Motivo de elección**
- Visibilidad completa del sistema.
- Coordinación directa entre capas.
- Simplificación de sincronización de cambios.

---

## Herramientas de desarrollo

Durante el desarrollo se utilizaron herramientas asistidas bajo reglas explícitas y documentación estructurada (versionada en branch de trabajo).

**Objetivo**
- Mantener trazabilidad.
- Reducir pérdida de contexto.
- Garantizar consistencia arquitectónica.
- Evitar dependencia ciega de automatización.

Estas herramientas no forman parte del runtime del sistema.

---

## Resumen estratégico

El stack fue seleccionado priorizando:

- Estabilidad sobre novedad.
- Ecosistema probado sobre experimentación.
- Coherencia entre backend y frontend.
- Control arquitectónico explícito.
- Portabilidad del entorno.

La combinación elegida permite construir un sistema completo con bajo riesgo tecnológico y alta mantenibilidad.