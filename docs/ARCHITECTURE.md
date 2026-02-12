🌐 Idioma: **Español** | [Inglés](ARCHITECTURE_EN.md)

# Arquitectura

Este documento describe la estructura interna de TuAutoCom y las decisiones organizativas adoptadas para mantener separación de responsabilidades, coherencia entre capas y facilidad de evolución.

La arquitectura fue diseñada priorizando claridad estructural y control explícito sobre abstracciones innecesarias.

---

## Visión General

TuAutoCom está organizado como un monorepo que contiene:

- Backend (API REST).
- Frontend (interfaz modular).
- Scripts auxiliares.

Cada capa puede evolucionar de forma independiente manteniendo una interfaz clara entre ellas.

---

## Backend

Ubicación: `backend/src`

La API sigue una estructura por capas:

```
routes → controllers → models → database
```


### 1. Routes

- Definen los endpoints expuestos.
- Asignan cada ruta a su controlador correspondiente.
- No contienen lógica de negocio.

Responsabilidad: enrutar solicitudes HTTP.

---

### 2. Controllers

- Reciben la solicitud.
- Validan datos básicos.
- Orquestan llamadas a modelos.
- Construyen la respuesta HTTP.

Responsabilidad: coordinación de flujo.

No contienen lógica de persistencia directa.

---

### 3. Models

- Definen esquemas de datos mediante Mongoose.
- Gestionan interacción con MongoDB.
- Aplican validaciones a nivel de modelo.

Responsabilidad: acceso y definición del modelo de datos.

---

### 4. Middleware

- Funciones intermedias para procesamiento transversal.
- Manejo de errores.
- Posible validación adicional.

Responsabilidad: lógica transversal desacoplada del controlador.

---

### Flujo de una solicitud

1. Cliente envía request HTTP.
2. Route identifica endpoint.
3. Controller procesa solicitud.
4. Model interactúa con base de datos.
5. Controller construye respuesta.
6. Middleware finaliza ciclo si corresponde.

Este flujo mantiene una separación clara entre transporte, lógica y persistencia.

---

## Frontend

Ubicación: `tuautocom.UI/js`

La interfaz se organiza de forma modular usando ES Modules nativos.

Estructura principal:

- `components/`
- `views/`
- `services/`
- `utils/`
- `config/`

---

### Components

Elementos reutilizables de interfaz.

Responsabilidad:
- Renderizado parcial.
- Encapsulación de estructura visual.

---

### Views

Páginas o secciones completas.

Responsabilidad:
- Composición de componentes.
- Orquestación de renderizado.

---

### Services

Capa de comunicación con la API.

Responsabilidad:
- Realizar llamadas HTTP.
- Centralizar endpoints.
- Aislar la lógica de acceso a datos del renderizado.

---

### Config

Configuraciones compartidas (tema, constantes).

Responsabilidad:
- Evitar valores hardcodeados.
- Centralizar parámetros globales.

---

## Separación Backend / Frontend

- Comunicación exclusivamente mediante API REST.
- Sin dependencia directa entre repositorios internos.
- Contrato claro vía endpoints HTTP.

Esto permite que cada capa pueda reemplazarse o evolucionar sin afectar la otra mientras se mantenga el contrato de API.

---

## Organización del Código

Principios aplicados:

- Separación de responsabilidades.
- Modularización explícita.
- Evitar acoplamiento innecesario.
- Claridad sobre abstracción excesiva.
- Preparación para evolución incremental.
- Evitar complejidad innecesaria para el alcance definido.

---

## Consideraciones de Evolución

La estructura actual permite:

- Incorporar autenticación futura.
- Añadir validaciones adicionales.
- Integrar testing automatizado.
- Introducir contenedorización.
- Escalar la API sin reorganización mayor.

La arquitectura no está optimizada para alta concurrencia ni microservicios, ya que ese no era el alcance del proyecto.

---

## Límites Actuales

- No existe capa de servicios intermedia en backend (controladores interactúan directamente con modelos).
- No hay separación por dominio más granular.
- No hay sistema de autenticación.
- No se implementó patrón repository explícito.
- No existe arquitectura orientada a microservicios.

Estas decisiones responden al alcance definido y mantienen la complejidad acorde al objetivo del proyecto.

---

## Resumen Arquitectónico

TuAutoCom adopta una arquitectura:

- Modular.
- Explícita.
- De bajo acoplamiento.
- Basada en separación clara de responsabilidades.
- Preparada para evolución incremental.

El foco estuvo en mantener control estructural y coherencia entre capas más que en introducir patrones avanzados innecesarios para el alcance definido.
