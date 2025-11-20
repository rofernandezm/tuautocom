/**
 * Theme Configuration
 * 
 * ⚠️ ÚNICA FUENTE DE VERDAD para la paleta de colores y dimensiones del proyecto
 * 
 * Este archivo centraliza todos los valores de diseño (colores, tipografía, dimensiones, etc.)
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
    primaryMedium: '#214a3c',     // Elementos secundarios (botones secundarios, bordes)
    primaryLight: '#8ecdb7',      // Texto secundario, links, acentos
    
    // Colores de formularios
    formBg: '#17352b',            // Fondo de inputs
    formBorder: '#2f6a55',        // Borde de inputs
    formBorderFocus: '#8ecdb7',   // Borde de inputs en foco
    formPlaceholder: '#8ecdb7',   // Color de placeholders
    
    // Colores de acciones
    success: '#019863',           // Botones de acción primaria
    successHover: '#017a4f',      // Hover de botones primarios
    
    // Colores de botones secundarios (ya definidos)
    buttonSecondary: '#214a3c',
    buttonSecondaryHover: '#2f6a55',
  },
  
  // Tipografía
  fonts: {
    sans: ['Inter', 'Noto Sans', 'sans-serif'],
  },
  
  // Dimensiones estandarizadas
  sizes: {
    // Anchos máximos
    formMaxWidth: '480px',        // Ancho máximo de formularios
    formContainerMaxWidth: '512px', // Contenedor de formulario completo (pequeño)
    formContainerLargeMaxWidth: '768px', // Contenedor de formulario amplio
    modalSmall: '28rem',          // max-w-md (448px)
    modalMedium: '42rem',         // max-w-2xl (672px)
    modalLarge: '48rem',          // max-w-3xl (768px)
    
    // Alturas de inputs
    inputHeight: '3.5rem',        // h-14 (56px) - Inputs normales
    buttonHeight: '2.5rem',       // h-10 (40px) - Botones
    buttonLargeHeight: '3rem',    // h-12 (48px) - Botones grandes
    textareaMinHeight: '9rem',    // min-h-36 (144px) - Textareas
    carouselMinHeight: '218px',   // Altura mínima de carruseles
    
    // Tamaños de botones
    buttonMinWidth: '84px',       // Ancho mínimo de botones
    buttonMinWidthNewVehicleForm: '160px', // Ancho mínimo de botones en formulario de nuevo vehículo
  },
  
  // Espaciado
  spacing: {
    inputPadding: '15px',         // Padding interno de inputs
  },
};

// Exportar solo colores si se necesita
export const { colors, sizes, spacing } = theme;
