# TuAutoCom UI

Frontend application built with Vanilla JavaScript and ES Modules + Tailwind CSS.

## Project Structure

```
tuautocom.UI/
├── .vscode/                # VS Code configuration
│   ├── agent/             # Agent documentation and context
│   │   ├── AGENT.md       # AI Agent instructions
│   │   ├── CONTEXT.md     # Project context and decisions
│   │   └── README.md
│   └── mcp.json
├── designs/                # Raw designs from Stitch (temporary)
├── js/
│   ├── main.js            # Application entry point
│   ├── config/            # Configuration files
│   ├── components/        # Reusable UI components
│   ├── views/             # Page views
│   ├── services/          # API services and data layer
│   └── utils/             # Utility functions
├── styles/
│   ├── input.css          # Tailwind source (edit this)
│   ├── output.css         # Compiled CSS (generated)
│   └── main.css           # Custom styles (optional)
├── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Development

To run the application locally, you'll need a local server due to ES Modules CORS restrictions.

### Using Python:
```bash
python -m http.server 8000
```

### Using Node.js (http-server):
```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Features

- Pure Vanilla JavaScript
- ES6+ Modules
- Component-based architecture
- Service layer for API calls
