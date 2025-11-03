/**
 * 🎓 MAIN.JS - Entry Point de la Aplicación
 * 
 * CONCEPTOS EDUCATIVOS:
 * - Este es el "cerebro" de la app
 * - Importa componentes y los ensambla
 * - Se ejecuta cuando la página carga
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Importamos las vistas disponibles
import { HomeView } from './views/HomeView.js';
import { CatalogView } from './views/CatalogView.js';
import { VehicleDetailView } from './views/VehicleDetailView.js';

// 📝 NOTA EDUCATIVA:
// La extensión .js es REQUERIDA en ES Modules del navegador
// Sin ella, el navegador no puede resolver el import

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ INICIALIZACIÓN DE LA APLICACIÓN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Función principal que inicializa la aplicación
 * 
 * 📝 NOTA EDUCATIVA:
 * Esta función se ejecuta cuando el DOM está completamente cargado
 * Es equivalente a $(document).ready() de jQuery
 */
// Variable global para la vista actual
let currentView = null;

/**
 * Navega a una ruta específica
 * @param {string} route - Ruta a cargar (home, catalog, etc.)
 */
async function navigateTo(route) {
  console.log(`� Navegando a: ${route}`);
  
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('❌ No se encontró el contenedor #app');
    return;
  }
  
  // Destruir vista anterior si existe
  if (currentView && currentView.destroy) {
    currentView.destroy();
  }
  
  // Limpiar contenedor
  appContainer.innerHTML = '';
  
  // Cargar nueva vista según ruta
  // 📝 NOTA: Soporte para rutas con parámetros (ej: vehicle/v1)
  const routeParts = route.split('/');
  const basePath = routeParts[0];
  const param = routeParts[1];
  
  switch (basePath) {
    case 'catalog':
      console.log('📂 Cargando CatalogView...');
      currentView = new CatalogView();
      await currentView.init();
      appContainer.appendChild(currentView.render());
      console.log('✅ CatalogView montada correctamente');
      break;
      
    case 'vehicle':
      console.log(`🚗 Cargando VehicleDetailView (ID: ${param})...`);
      if (!param) {
        console.error('❌ ID de vehículo no especificado');
        window.location.hash = '#catalog';
        return;
      }
      currentView = new VehicleDetailView(param);
      await currentView.init();
      appContainer.appendChild(currentView.render());
      console.log('✅ VehicleDetailView montada correctamente');
      break;
      
    case 'home':
    default:
      console.log('🏠 Cargando HomeView...');
      currentView = new HomeView();
      await currentView.init();
      appContainer.appendChild(currentView.render());
      console.log('✅ HomeView montada correctamente');
      break;
  }
}

async function initApp() {
  console.log('🚀 TuAutoCom Application Started');

  // 📝 NOTA EDUCATIVA: Routing simple basado en hash
  // Para probar diferentes vistas, cambiar la URL:
  // - #home o / → HomeView (default)
  // - #catalog → CatalogView (nueva vista con filtros)
  
  const route = window.location.hash.slice(1) || 'home';
  await navigateTo(route);
  
  // Escuchar cambios en el hash para navegación
  window.addEventListener('hashchange', async () => {
    const newRoute = window.location.hash.slice(1) || 'home';
    await navigateTo(newRoute);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3️⃣ ESPERAR A QUE EL DOM ESTÉ LISTO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 📝 NOTA EDUCATIVA: DOMContentLoaded
 * 
 * Este evento se dispara cuando el HTML está completamente cargado
 * y parseado, sin esperar a que las imágenes y CSS terminen de cargar.
 * 
 * ¿Por qué lo necesitamos?
 * - Si el script se ejecuta antes que el HTML, no encontrará #app
 * - DOMContentLoaded garantiza que todos los elementos existen
 * 
 * Alternativa moderna:
 * - Colocar <script type="module" defer> en el HTML
 * - defer carga el script después del parsing del HTML
 */
if (document.readyState === 'loading') {
  // DOM aún está cargando, esperar al evento
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM ya está listo, ejecutar inmediatamente
  initApp();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 RESUMEN EDUCATIVO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// FLUJO DE EJECUCIÓN:
// 1. Navegador carga index.html
// 2. Encuentra <script type="module" src="main.js">
// 3. Carga main.js y sus dependencias (Header.js)
// 4. Espera a DOMContentLoaded
// 5. Ejecuta initApp()
// 6. Crea instancia de Header
// 7. Renderiza Header en #app
// 8. Usuario ve el header en pantalla
//
// PRÓXIMOS PASOS:
// - Agregar más componentes (Footer, VehicleCard, etc.)
// - Implementar Router para navegación
// - Conectar con API backend
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
