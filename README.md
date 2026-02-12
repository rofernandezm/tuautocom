🌐 Idioma: **Español** | [Inglés](README_EN.md)

# TuAutoCom

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.0+-orange.svg)](https://pnpm.io/)

Aplicación full-stack (API + UI) desarrollada a partir de una consigna abierta orientada a bases de datos NoSQL.  
El objetivo fue definir un dominio donde un modelo documental ofreciera ventajas frente a un esquema relacional tradicional, y diseñar una solución completa aplicando criterios de arquitectura, toma de decisiones tecnológicas y gestión de riesgo técnico.

El resultado es un sistema compuesto por un backend en Node.js con MongoDB y una interfaz web modular construida con ES Modules, estructurado como monorepo.

---

## Qué demuestra este repositorio

Este proyecto no busca mostrar únicamente funcionalidad, sino capacidad de ingeniería aplicada:

- Evaluación y selección consciente de tecnologías.
- Modelado NoSQL con criterio según el dominio elegido.
- Diseño de API REST estructurada.
- Separación clara de responsabilidades en backend y frontend.
- Arquitectura modular sin dependencias innecesarias.
- Gestión de riesgo técnico priorizando estabilidad sobre experimentación.
- Disciplina documental y trazabilidad durante el desarrollo.

---

## Documentación

La documentación técnica completa se encuentra en la carpeta `/docs`:

- [Tech Stack](docs/TECH_STACK.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Evolución del Proyecto](docs/PROJECT_EVOLUTION.md)
- [Funcionalidades](docs/FEATURES.md)

[Ver documentación completa](docs/README.md)

---

## Estructura del monorepo

```
tuAutoComApp
├── backend/
│ ├── public/
│ └── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── scripts/
├── tuautocom.UI/
│ ├── assets/
│ ├── js/
│ │ ├── components/
│ │ ├── config/
│ │ ├── services/
│ │ ├── utils/
│ │ └── views/
│ └── styles/
└── scripts/
```

- **backend/**: API REST basada en Node.js.
- **tuautocom.UI/**: interfaz web modular construida con ES Modules.
- **scripts/**: utilidades auxiliares para entorno y soporte.

---

## Decisiones técnicas clave

### Stack JavaScript unificado (Node.js + ES Modules)

Se optó por un ecosistema JavaScript homogéneo tanto en backend como en frontend.

**Motivo**

- Alta adopción en la industria web.
- Ecosistema maduro y ampliamente probado.
- Abundante documentación y soporte comunitario.
- Coherencia entre capas del sistema.

**Impacto**

- Integración más directa entre backend y frontend.
- Menor fricción tecnológica.
- Reducción de riesgo frente a tecnologías experimentales.

---

### MongoDB como modelo documental

El proyecto parte de la necesidad de modelar información flexible y heterogénea, donde un esquema documental aporta ventajas frente a un modelo relacional rígido.

**Motivo**

- Adaptabilidad del modelo.
- Representación natural de estructuras anidadas.
- Uso de agregaciones para consultas derivadas.

**Impacto**

- Modelo alineado con el dominio.
- Simplificación de ciertas consultas complejas.
- Justificación técnica coherente con la consigna original.

---

### Uso de cluster en cloud en lugar de base local

Se decidió utilizar un cluster en la nube (MongoDB Atlas) en lugar de una base de datos local.

**Motivo**

- Portabilidad del entorno.
- Entorno compartido y reproducible.
- Alineación con prácticas habituales en entornos reales.

**Impacto**

- Configuración independiente del equipo local.
- Mayor cercanía a escenarios productivos.

---

### Frontend modular sin framework pesado

La interfaz fue construida utilizando ES Modules y componentes propios en lugar de un framework frontend completo.

**Motivo**

- Control explícito de la arquitectura.
- Comprensión total del flujo de renderizado y composición.
- Evitar complejidad innecesaria para el alcance del proyecto.

**Impacto**

- Estructura clara en `components/`, `views/`, `services/`.
- Modularización explícita.
- Separación entre presentación, lógica y acceso a datos.

---

## Arquitectura

### Backend

- Estructura por capas: rutas, controladores, modelos y middleware.
- Separación de configuración en módulo dedicado.
- Manejo centralizado de rutas.
- Persistencia mediante modelos definidos con Mongoose.
- Organización preparada para evolución incremental.

### Frontend

- ES Modules nativos del navegador.
- Componentes reutilizables en `js/components/`.
- Vistas en `js/views/`.
- Servicios para comunicación con API en `js/services/`.
- Configuración centralizada (tema, constantes).
- Build con pnpm + Tailwind CSS + SASS.

---

## Metodología de desarrollo

Durante el desarrollo se utilizó una estructura documental interna (versionada en un branch de trabajo y no incluida en el release final) para mantener:

- Trazabilidad de decisiones.
- Consistencia arquitectónica.
- Registro de sesiones de trabajo.
- Continuidad en entornos asistidos por herramientas.

Esta estructura funcionó como bitácora técnica compartida, permitiendo retomar el proyecto en distintos entornos sin pérdida de contexto y reduciendo riesgo de inconsistencias.

No forma parte del runtime del sistema, sino del proceso de construcción.

---

## Cómo ejecutar el proyecto

### Backend

1. Instalar dependencias:

```bash
pnpm install
```

2. Configurar variables de entorno (incluyendo URI de MongoDB).
3. Ejecutar servidor:

```bash
pnpm start
```

### Frontend

1. Instalar dependencias:

```bash
pnpm install
```

2. Ejecutar entorno de desarrollo:

```bash
pnpm dev
```

3. Servir aplicación:

```bash
pnpm serve
```

(Ver documentación detallada en `/docs` para configuración completa.)

---

## Limitaciones actuales

- No incluye autenticación avanzada.
- No cuenta con suite de tests automatizados.
- No incluye contenedorización (Docker).
- No está orientado a despliegue productivo completo.

Estas decisiones responden al alcance definido para el proyecto.

---

## Contexto

Proyecto surgido en el marco de una consigna académica abierta orientada a identificar un caso donde el uso de NoSQL ofreciera ventajas frente a SQL.  
La solución fue diseñada y extendida aplicando principios de ingeniería de software, priorizando decisiones técnicas sólidas y arquitectura coherente por encima de la experimentación tecnológica.
