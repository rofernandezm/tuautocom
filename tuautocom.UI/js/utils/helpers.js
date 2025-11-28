/**
 * Utility helper functions
 */

/**
 * Formatea un label capitalizando la primera letra
 * Útil para mostrar IDs de catálogos como texto legible cuando no se tiene el label
 * 
 * @param {string} str - String a formatear
 * @returns {string} String formateado
 * 
 * @example
 * capitalizeFirst('gasolina') // 'Gasolina'
 * capitalizeFirst('hibrido-enchufable') // 'Hibrido-enchufable'
 */
export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formatea labels de catálogo con reglas especiales
 * Usa esto como fallback cuando no tienes acceso al catálogo
 * 
 * @param {string} id - ID del item del catálogo
 * @param {string} catalogType - Tipo de catálogo (fuel, category, etc.)
 * @returns {string} Label formateado
 * 
 * @example
 * formatCatalogLabel('gasolina', 'fuel') // 'Gasolina'
 * formatCatalogLabel('suv', 'category') // 'SUV'
 */
export function formatCatalogLabel(id, catalogType) {
  // Casos especiales (acrónimos, etc.)
  const specialCases = {
    'suv': 'SUV',
    'pickup': 'Pick-up'
  };
  
  return specialCases[id] || capitalizeFirst(id);
}

/**
 * Busca el label de un item en un catálogo por su ID
 * 
 * @param {Array} catalogItems - Array de items del catálogo [{ id, label, ... }]
 * @param {string} id - ID del item a buscar
 * @param {string} fallback - Label fallback si no se encuentra
 * @returns {string} Label del item o fallback
 * 
 * @example
 * const fuels = [{ id: 'gasolina', label: 'Gasolina' }, ...]
 * getCatalogLabel(fuels, 'gasolina') // 'Gasolina'
 * getCatalogLabel(fuels, 'unknown', 'N/A') // 'N/A'
 */
export function getCatalogLabel(catalogItems, id, fallback = 'N/A') {
  if (!catalogItems || !id) return fallback;
  const item = catalogItems.find(item => item.id === id);
  return item?.label || fallback;
}

export const helpers = {
  capitalizeFirst,
  formatCatalogLabel,
  getCatalogLabel
};
