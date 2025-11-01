/**
 * 🎓 COMPONENTE FOOTER
 * 
 * CONCEPTOS CLAVE:
 * - Footer: Pie de página con información institucional
 * - Links de navegación secundaria
 * - Redes sociales con iconos SVG
 * - Copyright y información legal
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1️⃣ IMPORTACIONES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { theme } from '../config/theme.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2️⃣ CLASE DEL COMPONENTE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Footer Component
 * Pie de página con enlaces, redes sociales y copyright
 * 
 * RESPONSABILIDADES:
 * - Mostrar enlaces de navegación secundaria
 * - Mostrar iconos de redes sociales
 * - Mostrar información de copyright
 * - Proporcionar estructura semántica (footer tag)
 * 
 * @class
 * @param {Object} config - Configuración del footer
 * @param {Array<Object>} [config.links] - Enlaces de navegación
 * @param {Array<Object>} [config.socialNetworks] - Redes sociales
 * @param {string} [config.copyrightText] - Texto de copyright
 * @param {number} [config.copyrightYear] - Año del copyright
 * 
 * @example
 * const footer = new Footer({
 *   copyrightYear: 2024,
 *   copyrightText: 'Auto Showcase',
 *   links: [
 *     { label: 'Catálogo', url: '/catalogo' },
 *     { label: 'Contacto', url: '/contacto' }
 *   ]
 * });
 * 
 * document.body.appendChild(footer.render());
 */
export class Footer {
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ CONSTRUCTOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * @param {Object} config - Configuración del footer
   */
  constructor(config = {}) {
    // Enlaces de navegación por defecto
    this.links = config.links || [
      { label: 'Inicio', url: '#' },
      { label: 'Catálogo', url: '#' },
      { label: 'Categorías', url: '#' },
      { label: 'Contacto', url: '#' },
      { label: 'Aviso Legal', url: '#' }
    ];
    
    // Redes sociales por defecto
    // 📝 NOTA EDUCATIVA:
    // Guardamos el SVG como string para cada red social
    // En una app real, podrías usar una librería de iconos
    this.socialNetworks = config.socialNetworks || [
      { name: 'Twitter', url: '#', icon: this._getTwitterIcon() },
      { name: 'Facebook', url: '#', icon: this._getFacebookIcon() },
      { name: 'Instagram', url: '#', icon: this._getInstagramIcon() }
    ];
    
    // Información de copyright
    this.copyrightYear = config.copyrightYear || new Date().getFullYear();
    this.copyrightText = config.copyrightText || 'Auto Showcase. Todos los derechos reservados.';
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ MÉTODO RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza el footer como un HTMLElement
   * @returns {HTMLElement} El elemento del footer renderizado
   */
  render() {
    // 📝 NOTA EDUCATIVA:
    // Usamos <footer> (HTML5 semantic tag) en lugar de <div>
    // Esto mejora la accesibilidad y SEO
    const footer = document.createElement('footer');
    footer.className = 'flex justify-center';
    
    // Contenedor interno con ancho máximo
    const container = document.createElement('div');
    container.className = 'flex max-w-[960px] flex-1 flex-col';
    
    // Wrapper final con padding
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-6 px-5 py-10 text-center @container';
    
    // Construir el contenido
    wrapper.innerHTML = `
      ${this._renderLinks()}
      ${this._renderSocialIcons()}
      ${this._renderCopyright()}
    `;
    
    // Ensamblar estructura
    container.appendChild(wrapper);
    footer.appendChild(container);
    
    return footer;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5️⃣ MÉTODOS PRIVADOS - Renderizado de secciones
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Renderiza los enlaces de navegación
   * @private
   * @returns {string} HTML de los enlaces
   */
  _renderLinks() {
    const linksHTML = this.links.map(link => `
      <a class="text-[#8ecdb7] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors" 
         href="${link.url}">
        ${link.label}
      </a>
    `).join('');
    
    return `
      <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
        ${linksHTML}
      </div>
    `;
  }
  
  /**
   * Renderiza los iconos de redes sociales
   * @private
   * @returns {string} HTML de los iconos sociales
   */
  _renderSocialIcons() {
    const iconsHTML = this.socialNetworks.map(network => `
      <a href="${network.url}" 
         aria-label="${network.name}"
         class="hover:opacity-75 transition-opacity">
        <div class="text-[#8ecdb7]">
          ${network.icon}
        </div>
      </a>
    `).join('');
    
    return `
      <div class="flex flex-wrap justify-center gap-4">
        ${iconsHTML}
      </div>
    `;
  }
  
  /**
   * Renderiza el texto de copyright
   * @private
   * @returns {string} HTML del copyright
   */
  _renderCopyright() {
    return `
      <p class="text-[#8ecdb7] text-base font-normal leading-normal">
        © ${this.copyrightYear} ${this.copyrightText}
      </p>
    `;
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6️⃣ MÉTODOS PRIVADOS - Iconos SVG
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Retorna el icono SVG de Twitter
   * @private
   * @returns {string} SVG de Twitter
   */
  _getTwitterIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
      </svg>
    `;
  }
  
  /**
   * Retorna el icono SVG de Facebook
   * @private
   * @returns {string} SVG de Facebook
   */
  _getFacebookIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
      </svg>
    `;
  }
  
  /**
   * Retorna el icono SVG de Instagram
   * @private
   * @returns {string} SVG de Instagram
   */
  _getInstagramIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
      </svg>
    `;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 NOTAS ADICIONALES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
📚 CONCEPTOS APLICADOS:

1. **HTML Semántico**:
   - Uso de <footer> en lugar de <div>
   - Mejora accesibilidad y SEO
   - Los lectores de pantalla reconocen la estructura

2. **Iconos SVG Inline**:
   - SVGs embebidos directamente en el código
   - Permite control total del color con currentColor
   - Escalables sin pérdida de calidad

3. **Responsive con Container Queries**:
   - @[480px]:flex-row adapta diseño según tamaño
   - @container permite queries basadas en contenedor

4. **Accesibilidad**:
   - aria-label en enlaces de redes sociales
   - Nombres descriptivos para lectores de pantalla
   - Hover states para indicar interactividad

5. **Configuración Flexible**:
   - Enlaces y redes sociales configurables
   - Copyright dinámico con año actual
   - Fácil personalización sin tocar el código

6. **Transiciones Suaves**:
   - hover:text-white para enlaces
   - hover:opacity-75 para iconos
   - Feedback visual inmediato

📝 MEJORAS FUTURAS:
- Newsletter signup form
- Más redes sociales (LinkedIn, YouTube, etc.)
- Links de políticas (privacidad, términos)
- Selector de idioma
- Selector de tema (dark/light mode)
*/
