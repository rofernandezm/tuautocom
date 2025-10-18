# Designs Directory

Este directorio contiene los diseños raw generados por Stitch (Google).

## Workflow

1. **Agregar diseños**: Coloca aquí los archivos HTML exportados de Stitch
2. **Procesar**: Extraeremos estilos y estructura
3. **Componentizar**: Convertiremos a componentes reutilizables
4. **Mover a views**: Las versiones finales irán a `/js/views/`

## Estructura sugerida

```
designs/
├── README.md
├── home.html           # Diseño de la página principal
├── login.html          # Diseño de login
├── dashboard.html      # Diseño de dashboard
└── ...                 # Otros diseños
```

## Notas

- Los archivos aquí son versiones de trabajo
- No modificar los originales, hacer copias si es necesario
- Los estilos inline serán extraídos a CSS modules
