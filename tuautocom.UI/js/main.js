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

// Importamos el componente Header que acabamos de crear
import { Header } from './components/Header.js';

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
function initApp() {
  console.log('🚀 TuAutoCom Application Started');
  
  // 1. Obtener el contenedor principal del body
  // 📝 NOTA: En index.html buscaremos un elemento con id="app"
  const appContainer = document.getElementById('app');
  
  if (!appContainer) {
    console.error('❌ No se encontró el contenedor #app');
    return;
  }
  
  // 2. Crear instancia del Header
  // 📝 NOTA EDUCATIVA:
  // - new Header() llama al constructor
  // - Pasamos configuración inicial
  // - El objeto retornado tiene el método .render()
  const header = new Header({
    currentRoute: 'inicio',
    showSearch: true,
    onNavigate: (route) => {
      console.log(`📍 Usuario navegó a: ${route}`);
      // 📝 TODO: Aquí cargaremos la vista correspondiente
    }
  });
  
  // 3. Renderizar el header
  // 📝 NOTA EDUCATIVA:
  // - .render() retorna un HTMLElement
  // - appendChild lo agrega al DOM
  // - Ahora el header es visible en la página
  const headerElement = header.render();
  appContainer.appendChild(headerElement);
  
  console.log('✅ Header renderizado exitosamente');
  
  // 📝 TODO: Renderizar el resto de la página
  // - Hero section
  // - Category filters
  // - Vehicle grid
  // - Footer
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
