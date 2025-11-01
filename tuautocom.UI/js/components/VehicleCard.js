/**
 * 🎓 COMPONENTE VEHICLECARD
 * 
 * CONCEPTOS CLAVE:
 * - Componente reutilizable para mostrar información de vehículos
 * - Patrón de diseño: Card/Tarjeta
 * - Datos dinámicos pasados por constructor
 * - Eventos interactivos (click para ver detalle)
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { theme } from '../config/theme.js';

// 📝 NOTA EDUCATIVA:
// Importamos el theme para acceder a colores centralizados
// Aunque en este componente usaremos principalmente clases de Tailwind

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ CLASE DEL COMPONENTE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * VehicleCard Component
 * Tarjeta para mostrar información básica de un vehículo
 * 
 * RESPONSABILIDADES:
 * - Mostrar imagen del vehículo
 * - Mostrar título (nombre del vehículo)
 * - Mostrar descripción breve
 * - Manejar evento click para ver detalle
 * 
 * @class
 * @param {Object} vehicleData - Información del vehículo
 * @param {string} vehicleData.id - Identificador único del vehículo
 * @param {string} vehicleData.image - URL de la imagen del vehículo
 * @param {string} vehicleData.title - Nombre/título del vehículo
 * @param {string} vehicleData.description - Descripción breve del vehículo
 * @param {Function} [vehicleData.onClick] - Callback opcional para evento click
 * 
 * @example
 * const card = new VehicleCard({
 *   id: 'v1',
 *   image: 'https://example.com/car.jpg',
 *   title: 'Toyota Camry 2024',
 *   description: 'Sedán elegante y confiable',
 *   onClick: (id) => console.log('Clicked vehicle:', id)
 * });
 * 
 * document.body.appendChild(card.render());
 */
export class VehicleCard {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ CONSTRUCTOR - Inicialización del componente
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * @param {Object} vehicleData - Datos del vehículo a mostrar
   */
  constructor(vehicleData) {
    // 📝 NOTA EDUCATIVA:
    // Guardamos los datos en una propiedad de la instancia
    // para acceder a ellos en otros métodos
    this.data = vehicleData;
    
    // Validación básica de datos requeridos
    if (!this.data.image || !this.data.title) {
      console.warn('VehicleCard: Faltan datos requeridos (image, title)');
    }
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ MÉTODO RENDER - Genera el elemento DOM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza la tarjeta del vehículo como un HTMLElement
   * @returns {HTMLElement} El elemento de la tarjeta renderizado
   */
  render() {
    // 1. Crear el contenedor principal de la tarjeta
    // 📝 NOTA EDUCATIVA:
    // createElement() crea un nuevo elemento HTML en memoria
    // Aún no está visible en la página hasta que se agregue al DOM
    const card = document.createElement('div');
    
    // 2. Aplicar clases de Tailwind (copiadas del diseño de Stitch)
    card.className = 'flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60';
    
    // 3. Agregar atributo data para identificación
    // 📝 NOTA EDUCATIVA:
    // data-* attributes son útiles para guardar información custom
    // Se pueden leer después con element.dataset.vehicleId
    if (this.data.id) {
      card.setAttribute('data-vehicle-id', this.data.id);
    }
    
    // 4. Agregar cursor pointer para indicar que es clickeable
    card.style.cursor = 'pointer';
    
    // 5. Construir el HTML interno usando template literal
    // 📝 NOTA EDUCATIVA:
    // Template literals (backticks `) permiten strings multi-línea
    // y interpolación de variables con ${variable}
    card.innerHTML = `
      ${this._renderImage()}
      ${this._renderInfo()}
    `;
    
    // 6. Adjuntar event listeners
    this._attachEventListeners(card);
    
    // 7. Retornar el elemento completo
    return card;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5️⃣ MÉTODOS PRIVADOS - Renderizado de partes específicas
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza la imagen del vehículo
   * @private
   * @returns {string} HTML de la imagen
   */
  _renderImage() {
    // 📝 NOTA EDUCATIVA:
    // aspect-video = proporción 16:9 (típica de videos)
    // bg-cover = la imagen cubre todo el espacio
    // bg-center = la imagen se centra
    // bg-no-repeat = no se repite la imagen
    
    return `
      <div 
        class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
        style="background-image: url('${this.data.image}')"
        role="img"
        aria-label="${this.data.title}"
      >
      </div>
    `;
  }
  
  /**
   * Renderiza la información textual del vehículo
   * @private
   * @returns {string} HTML de la información
   */
  _renderInfo() {
    return `
      <div>
        <p class="text-white text-base font-medium leading-normal">
          ${this.data.title}
        </p>
        <p class="text-[#8ecdb7] text-sm font-normal leading-normal">
          ${this.data.description || 'Sin descripción'}
        </p>
      </div>
    `;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6️⃣ EVENT LISTENERS - Interactividad
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Adjunta event listeners al elemento de la tarjeta
   * @private
   * @param {HTMLElement} element - El elemento de la tarjeta
   */
  _attachEventListeners(element) {
    // 📝 NOTA EDUCATIVA:
    // addEventListener() registra una función que se ejecutará
    // cuando ocurra el evento especificado (en este caso 'click')
    
    // Evento: Click en la tarjeta
    element.addEventListener('click', () => {
      console.log('🚗 Vehículo clickeado:', this.data.title);
      
      // Si se pasó un callback personalizado, ejecutarlo
      if (typeof this.data.onClick === 'function') {
        this.data.onClick(this.data.id, this.data);
      }
    });
    
    // Evento: Hover (para efecto visual)
    // 📝 NOTA EDUCATIVA:
    // mouseenter/mouseleave se disparan cuando el cursor entra/sale del elemento
    element.addEventListener('mouseenter', () => {
      // Agregar efecto de elevación con opacity
      element.style.opacity = '0.8';
      element.style.transform = 'translateY(-4px)';
      element.style.transition = 'all 0.2s ease';
    });
    
    element.addEventListener('mouseleave', () => {
      // Remover efecto de elevación
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 NOTAS ADICIONALES PARA APRENDIZAJE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
📚 CONCEPTOS APLICADOS EN ESTE COMPONENTE:

1. **Encapsulación**:
   - Todos los datos y lógica del componente están dentro de la clase
   - Métodos privados (con _) no deberían usarse fuera de la clase

2. **Composición**:
   - El componente se divide en partes más pequeñas (_renderImage, _renderInfo)
   - Facilita el mantenimiento y la lectura del código

3. **Event Delegation**:
   - Los eventos se adjuntan al contenedor principal
   - Más eficiente que agregar eventos a múltiples elementos

4. **Template Literals**:
   - Permiten escribir HTML de forma más legible
   - Interpolación de variables con ${variable}

5. **Data Attributes**:
   - data-vehicle-id para identificar el vehículo
   - Accesible desde JavaScript con element.dataset

6. **Accesibilidad**:
   - role="img" y aria-label para lectores de pantalla
   - Importante para usuarios con discapacidades visuales

📝 PRÓXIMOS PASOS:
- Probar el componente en el navegador
- Crear datos de ejemplo
- Agregar a una vista (HomeView)
- Considerar agregar más información (precio, año, etc.)
*/
