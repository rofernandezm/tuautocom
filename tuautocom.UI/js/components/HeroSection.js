/**
 * 🎓 COMPONENTE HEROSECTION
 * 
 * CONCEPTOS CLAVE:
 * - Hero banner: Sección destacada al inicio de la página
 * - Background image con overlay (gradiente oscuro)
 * - Tipografía grande y llamativa para captar atención
 * - Responsive design con container queries
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { theme } from '../config/theme.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ CLASE DEL COMPONENTE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * HeroSection Component
 * Banner principal con imagen de fondo y título destacado
 * 
 * RESPONSABILIDADES:
 * - Mostrar imagen de fondo atractiva
 * - Mostrar título/slogan principal
 * - Aplicar overlay (gradiente) sobre la imagen
 * - Proporcionar llamado a la acción visual
 * 
 * @class
 * @param {Object} config - Configuración del hero section
 * @param {string} config.title - Título principal a mostrar
 * @param {string} [config.subtitle] - Subtítulo opcional
 * @param {string} [config.backgroundImage] - URL de imagen de fondo
 * @param {string} [config.overlayGradient] - Gradiente CSS personalizado
 * @param {string} [config.minHeight] - Altura mínima (default: min-h-80)
 * 
 * @example
 * const hero = new HeroSection({
 *   title: 'Encuentra el auto de tus sueños',
 *   subtitle: 'Miles de opciones disponibles',
 *   backgroundImage: 'https://example.com/hero.jpg'
 * });
 * 
 * document.body.appendChild(hero.render());
 */
export class HeroSection {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ CONSTRUCTOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * @param {Object} config - Configuración del hero section
   */
  constructor(config = {}) {
    // Configuración con valores por defecto
    this.config = {
      title: config.title || 'Bienvenido',
      subtitle: config.subtitle || '',
      backgroundImage: config.backgroundImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop',
      overlayGradient: config.overlayGradient || 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%)',
      minHeight: config.minHeight || 'min-h-80'
    };
    
    // Validación
    if (!this.config.title) {
      console.warn('HeroSection: Se recomienda proporcionar un título');
    }
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ MÉTODO RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el hero section como un HTMLElement
   * @returns {HTMLElement} El elemento del hero section renderizado
   */
  render() {
    // Contenedor principal con container queries
    // 📝 NOTA EDUCATIVA:
    // @container permite queries responsive basadas en el tamaño del contenedor
    // en lugar del viewport completo
    const container = document.createElement('div');
    container.className = '@container';
    
    // Wrapper con padding responsivo
    const wrapper = document.createElement('div');
    wrapper.className = '@[480px]:px-4 @[480px]:py-3';
    
    // Hero banner con imagen de fondo
    const hero = document.createElement('div');
    hero.className = `bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#10231c] @[480px]:rounded-lg ${this.config.minHeight}`;
    
    // 📝 NOTA EDUCATIVA:
    // Usamos inline style para background-image porque es dinámico
    // El gradiente crea un overlay oscuro en la parte inferior
    hero.style.backgroundImage = `${this.config.overlayGradient}, url('${this.config.backgroundImage}')`;
    
    // Contenido de texto
    hero.innerHTML = this._renderContent();
    
    // Ensamblar estructura
    wrapper.appendChild(hero);
    container.appendChild(wrapper);
    
    return container;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5️⃣ MÉTODOS PRIVADOS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el contenido de texto del hero
   * @private
   * @returns {string} HTML del contenido
   */
  _renderContent() {
    return `
      <div class="flex flex-col p-4 gap-2">
        <p class="text-white tracking-light text-[28px] font-bold leading-tight">
          ${this.config.title}
        </p>
        ${this.config.subtitle ? `
          <p class="text-[#8ecdb7] text-base font-normal leading-normal">
            ${this.config.subtitle}
          </p>
        ` : ''}
      </div>
    `;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 NOTAS ADICIONALES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
📚 CONCEPTOS APLICADOS:

1. **Background Image con Overlay**:
   - Gradiente superpuesto a imagen para mejorar legibilidad
   - linear-gradient oscurece la parte inferior

2. **Container Queries (@container)**:
   - Queries basadas en tamaño del contenedor, no del viewport
   - @[480px]:px-4 = padding cuando contenedor > 480px

3. **Flexbox para Alineación**:
   - justify-end coloca el contenido al final (abajo)
   - flex-col organiza elementos verticalmente

4. **Configuración Flexible**:
   - Valores por defecto para todos los parámetros
   - Fácil personalización sin romper el componente

5. **Responsive Design**:
   - Adaptación automática a diferentes tamaños
   - Bordes redondeados solo en pantallas grandes

📝 USO TÍPICO:
- Página principal: mensaje de bienvenida
- Landing pages: llamado a la acción
- Secciones destacadas: promociones especiales
*/
