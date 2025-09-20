# AutoCatalog - Catálogo de Vehículos

**AutoCatalog** es un catálogo online moderno y responsivo para la visualización de autos y camionetas. Desarrollado con tecnologías web estándar y una arquitectura modular para facilitar el mantenimiento y la escalabilidad.

## 🚗 Características

- **Catálogo completo** de autos y camionetas organizizado por categorías
- **Navegación intuitiva** con dropdowns y filtros
- **Tarjetas de producto** con información detallada e imágenes ilustrativas
- **Sistema de distintivos** para destacar vehículos populares y económicos
- **Modal de contacto** para consultas de vehículos específicos
- **Diseño responsivo** optimizado para todos los dispositivos
- **Arquitectura modular** fácil de mantener y extender

## 📁 Estructura del Proyecto

```
tuAutoCom/
├── index.html                  # Página principal
├── README.md                   # Documentación del proyecto
└── src/
    ├── components/             # Componentes reutilizables
    │   ├── Navbar.js          # Barra de navegación
    │   ├── VehicleCard.js     # Tarjetas de vehículos
    │   ├── ContactModal.js    # Modal de contacto
    │   └── Badge.js           # Distintivos de vehículos
    ├── pages/                 # Páginas específicas
    │   ├── AutosPage.js       # Página de autos
    │   └── CamionetasPage.js  # Página de camionetas
    ├── assets/                # Recursos estáticos
    │   └── (imágenes futuras)
    ├── styles/                # Estilos modulares
    │   ├── global.css         # Estilos globales
    │   ├── components.css     # Estilos de componentes
    │   └── animations.css     # Animaciones
    └── services/              # Servicios y lógica de negocio
        ├── VehicleService.js  # Manejo de datos de vehículos
        └── AnalyticsService.js # Tracking y analytics
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Lógica de aplicación y componentes
- **Tailwind CSS** - Framework de utilidades CSS
- **Arquitectura Modular** - Componentes separados y reutilizables

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional pero recomendado)

### Opción 1: Ejecución Directa

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd tuAutoCom
   ```

2. **Abrir en navegador:**
   - Simplemente abre `index.html` en tu navegador web
   - Para mejor funcionalidad, usa un servidor local

### Opción 2: Servidor Local (Recomendado)

#### Con Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Click derecho en `index.html` → "Open with Live Server"

#### Con Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego visita: `http://localhost:8000`

#### Con Node.js

```bash
# Instalar servidor simple
npm install -g http-server

# Ejecutar servidor
http-server

# O usar npx sin instalación global
npx http-server
```

#### Con PHP

```bash
php -S localhost:8000
```

## 📱 Uso

### Navegación

- **Navbar principal**: Navega entre categorías de Autos y Camionetas
- **Filtros**: Usa los botones de filtro para ver "Más Vistos" o "Más Baratos"
- **Ver Todos**: Muestra el catálogo completo
- **Responsive**: El menú se adapta automáticamente en dispositivos móviles

### Categorías Disponibles

#### Autos
- **Hatch**: Autos compactos tipo hatchback
- **Sedan**: Sedanes familiares y ejecutivos  
- **Coupé**: Autos deportivos de dos puertas

#### Camionetas
- **SUV**: Vehículos utilitarios deportivos
- **Pickup**: Camionetas de carga
- **Furgón**: Vehículos comerciales

### Consultas

1. Haz click en "Consultar" en cualquier vehículo
2. Completa el formulario con tus datos
3. Envía tu consulta
4. Recibirás confirmación del envío

## 🔧 Desarrollo

### Agregar Nuevos Vehículos

Edita el archivo `src/services/VehicleService.js` y agrega vehículos al objeto `vehicleDatabase`:

```javascript
{
    id: 'nuevo_id',
    name: 'Nombre del Vehículo',
    description: 'Descripción detallada...',
    price: '$XX,XXX',
    badge: 'popular', // 'popular', 'cheap', o null
    emoji: '🚗',
    category: 'categoria',
    type: 'autos' // o 'camionetas'
}
```

### Personalizar Estilos

- **Colores globales**: Modifica `src/styles/global.css`
- **Componentes**: Edita `src/styles/components.css`
- **Animaciones**: Personaliza `src/styles/animations.css`

### Agregar Nuevos Componentes

1. Crea un nuevo archivo en `src/components/`
2. Sigue el patrón de clase con métodos estáticos
3. Importa el componente en `index.html`

### Analytics y Tracking

El proyecto incluye un sistema de analytics básico en `AnalyticsService.js` que registra:

- Vistas de vehículos
- Navegación por categorías
- Envíos de formularios
- Interacciones del usuario

## 🎨 Personalización

### Temas y Colores

El proyecto usa una paleta de colores personalizable. Los colores principales están definidos en:

- **Primario**: Tonos de índigo (`#4f46e5`)
- **Secundario**: Grises neutros
- **Distintivos**: 
  - Popular: Gradiente rojo-naranja
  - Económico: Gradiente verde

### Responsive Design

El diseño se adapta automáticamente a:

- **Móviles**: < 768px (1 columna)
- **Tablets**: 768px - 1024px (2 columnas)
- **Desktop**: 1024px - 1280px (3 columnas)
- **Large Desktop**: > 1280px (4 columnas)

## 🧪 Testing

Para probar la aplicación:

1. Verifica que todos los enlaces de navegación funcionen
2. Prueba el modal de contacto con diferentes vehículos
3. Testa la responsividad en diferentes tamaños de pantalla
4. Valida que los filtros muestren los resultados correctos

## 🚀 Deployment

### GitHub Pages

1. Sube el código a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` como fuente
4. Tu sitio estará disponible en `https://username.github.io/repository-name`

### Netlify

1. Conecta tu repositorio con Netlify
2. El sitio se desplegará automáticamente
3. Configuración de build: No requerida (sitio estático)

### Vercel

1. Importa el proyecto desde GitHub
2. Deploy automático sin configuración adicional

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Roadmap

### Próximas características:

- [ ] Búsqueda por texto
- [ ] Filtros avanzados (precio, año, marca)
- [ ] Galería de imágenes para cada vehículo
- [ ] Comparador de vehículos
- [ ] Integración con CMS para gestión de contenido
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario
4. Contacta al equipo de desarrollo

---

**AutoCatalog** - Creado con ❤️ para facilitar la búsqueda del vehículo perfecto.
