import { theme } from './js/config/theme.js';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      // Colores desde theme.js
      colors: {
        'primary-dark': theme.colors.primaryDark,
        'primary-medium': theme.colors.primaryMedium,
        'primary-light': theme.colors.primaryLight,
        'form-bg': theme.colors.formBg,
        'form-border': theme.colors.formBorder,
        'form-border-focus': theme.colors.formBorderFocus,
        'form-placeholder': theme.colors.formPlaceholder,
        'success': theme.colors.success,
        'success-hover': theme.colors.successHover,
        'btn-secondary': theme.colors.buttonSecondary,
        'btn-secondary-hover': theme.colors.buttonSecondaryHover,
      },
      
      // Dimensiones personalizadas desde theme.js
      maxWidth: {
        'form': theme.sizes.formMaxWidth,
        'form-container': theme.sizes.formContainerMaxWidth,
        'form-container-lg': theme.sizes.formContainerLargeMaxWidth,
        'modal-sm': theme.sizes.modalSmall,
        'modal-md': theme.sizes.modalMedium,
        'modal-lg': theme.sizes.modalLarge,
      },
      
      minWidth: {
        'btn': theme.sizes.buttonMinWidth,
        'btn-form': theme.sizes.buttonMinWidthNewVehicleForm,
      },
      
      height: {
        'input': theme.sizes.inputHeight,
        'btn': theme.sizes.buttonHeight,
        'btn-lg': theme.sizes.buttonLargeHeight,
      },
      
      minHeight: {
        'textarea': theme.sizes.textareaMinHeight,
        'carousel': theme.sizes.carouselMinHeight,
      },
      
      // Fuentes
      fontFamily: {
        sans: theme.fonts.sans,
      },
    },
  },
  
  // Plugin para componentes personalizados reutilizables
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        // Clase base para inputs/textareas/selects
        '.form-field': {
          '@apply flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg': {},
          '@apply text-white bg-form-bg border border-form-border': {},
          '@apply focus:outline-0 focus:ring-0 focus:border-form-border-focus': {},
          '@apply placeholder:text-form-placeholder transition-colors': {},
          '@apply p-[15px] text-base font-normal leading-normal': {},
        },
        
        // Input de altura estándar
        '.form-field-input': {
          '@apply form-field h-input': {},
        },
        
        // Textarea con altura mínima
        '.form-field-textarea': {
          '@apply form-field min-h-textarea': {},
        },
        
        // Select (igual que input)
        '.form-field-select': {
          '@apply form-field h-input': {},
        },
        
        // Botón primario (acción principal)
        '.btn-primary': {
          '@apply flex items-center justify-center min-w-btn cursor-pointer': {},
          '@apply overflow-hidden rounded-lg px-4 h-btn': {},
          '@apply bg-success hover:bg-success-hover text-white': {},
          '@apply text-sm font-bold leading-normal tracking-[0.015em]': {},
          '@apply transition-colors': {},
        },
        
        // Variante de botón primario para formularios anchos
        '.btn-primary-lg': {
          '@apply flex items-center justify-center min-w-btn-form cursor-pointer': {},
          '@apply overflow-hidden rounded-lg px-4 h-btn': {},
          '@apply bg-success hover:bg-success-hover text-white': {},
          '@apply text-sm font-bold leading-normal tracking-[0.015em]': {},
          '@apply transition-colors': {},
        },
        
        // Botón secundario
        '.btn-secondary': {
          '@apply flex items-center justify-center min-w-btn cursor-pointer': {},
          '@apply overflow-hidden rounded-lg px-4 h-btn': {},
          '@apply bg-btn-secondary hover:bg-btn-secondary-hover text-white': {},
          '@apply text-sm font-bold leading-normal tracking-[0.015em]': {},
          '@apply transition-colors': {},
        },
        
        // Variante de botón secundario para formularios anchos
        '.btn-secondary-lg': {
          '@apply flex items-center justify-center min-w-btn-form cursor-pointer': {},
          '@apply overflow-hidden rounded-lg px-4 h-btn': {},
          '@apply bg-btn-secondary hover:bg-btn-secondary-hover text-white': {},
          '@apply text-sm font-bold leading-normal tracking-[0.015em]': {},
          '@apply transition-colors': {},
        },
        
        // Contenedor de campo de formulario
        '.form-field-container': {
          '@apply flex flex-wrap items-end gap-4 px-4 py-3': {},
        },
        
        // Label de formulario
        '.form-label': {
          '@apply text-white text-base font-medium leading-normal pb-2': {},
        },
        
        // Contenedor de formulario completo
        '.form-container': {
          '@apply max-w-form mx-auto': {},
        },
      });
    }),
  ],
}
