/**
 * Theme Configuration
 * 
 * ⚠️ ÚNICA FUENTE DE VERDAD para la paleta de colores del proyecto
 * 
 * Este archivo centraliza todos los valores de diseño (colores, tipografía, etc.)
 * para facilitar cambios globales sin tocar múltiples archivos.
 * 
 * Usado por:
 * - tailwind.config.js (genera clases de utilidad)
 * - styles/input.scss (CSS variables)
 * - Componentes JS (importación directa)
 */

export const theme = {
  colors: {
    // Paleta principal
    primaryDark: '#10231c',      // Fondo principal, elementos oscuros
    primaryMedium: '#214a3c',     // Elementos secundarios (botones, bordes)
    primaryLight: '#8ecdb7',      // Texto secundario, links, acentos
    
    // Colores adicionales (agregar según necesidad)
    // secondary: '#...',
    // accent: '#...',
    // danger: '#...',
    // success: '#...',
  },
  
  // Tipografía (si necesitamos centralizar fuentes)
  fonts: {
    sans: ['Inter', 'Noto Sans', 'sans-serif'],
  },
  
  // Otros valores de diseño pueden ir aquí
  // spacing: {},
  // borderRadius: {},
};

// Exportar solo colores si se necesita
export const { colors } = theme;
