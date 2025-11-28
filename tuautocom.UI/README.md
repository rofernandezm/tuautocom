# TuAutoCom UI

Frontend application built with Vanilla JavaScript (ES6+) and Tailwind CSS.

## 📁 Estructura del Proyecto

```
tuautocom.UI/
├── js/
│   ├── main.js            # Punto de entrada
│   ├── components/        # Componentes reutilizables
│   ├── views/             # Vistas de páginas
│   ├── services/          # Servicios de API
│   ├── utils/             # Utilidades
│   └── config/            # Configuración
├── styles/
│   ├── input.scss         # SASS fuente (editar aquí)
│   └── output.css         # CSS compilado (generado)
├── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## ⚡ Instalación

```bash
cd tuautocom.UI
pnpm install
```

## 🚀 Ejecutar

**Desarrollo (Watch mode):**
```bash
pnpm run dev
```

**Build para producción:**
```bash
pnpm run build:prod
```

**Servir localmente:**
```bash
pnpm run serve
```

Abre http://localhost:8000 en tu navegador.

## 📋 Requisitos

- Node.js v18+
- pnpm v8.0+
- Backend API ejecutándose en http://localhost:3000

## 🔧 Stack

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Estilos**: Tailwind CSS + SASS
- **Build**: PostCSS + Tailwind CLI
- **Package Manager**: pnpm
