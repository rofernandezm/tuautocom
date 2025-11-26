import mongoose from 'mongoose';

/**
 * Catalog Model
 * Colección para almacenar datos de referencia (categorías, marcas, etc.)
 * 
 * PROPÓSITO:
 * - Centralizar datos que antes estaban hardcoded en frontend
 * - Permitir gestión dinámica de opciones de filtrado
 * - Fuente única de verdad para datos de referencia
 * 
 * ESTRUCTURA:
 * - type: Tipo de catálogo (category, brand, transmission, fuel, etc.)
 * - items: Array de opciones disponibles
 * - metadata: Información adicional (orden, configuración, etc.)
 * 
 * OPERACIÓN MONGODB:
 * Catalog.findOne({ type: 'categories' }) → Obtiene todas las categorías
 */

const catalogSchema = new mongoose.Schema({
  // Tipo de catálogo: 'categories', 'brands', 'transmissions', etc.
  type: { 
    type: String, 
    required: true,
    unique: true,  // Solo un documento por tipo
    enum: [
      'categories',      // Categorías de vehículos (SUV, Sedán, etc.)
      'brands',          // Marcas de vehículos
      'transmissions',   // Tipos de transmisión
      'fuels',          // Tipos de combustible
      'colors',         // Colores disponibles
      'conditions',     // Condiciones (nuevo, usado)
      'tractions'       // Tipos de tracción
    ]
  },
  
  // Items del catálogo
  items: [{
    // ID único del item (para referencias)
    id: { 
      type: String, 
      required: true 
    },
    
    // Etiqueta a mostrar en UI
    label: { 
      type: String, 
      required: true 
    },
    
    // Metadata adicional específica del item
    metadata: {
      // Orden de visualización
      order: { type: Number, default: 0 },
      
      // Icono (opcional, para categorías)
      icon: { type: String },
      
      // Color (opcional, para visualización)
      color: { type: String },
      
      // Si el item está activo
      active: { type: Boolean, default: true },
      
      // Información adicional flexible
      extra: mongoose.Schema.Types.Mixed
    }
  }],
  
  // Metadata del catálogo completo
  catalogMetadata: {
    // Descripción del catálogo
    description: { type: String },
    
    // Si permite múltiple selección en filtros
    allowMultiple: { type: Boolean, default: false },
    
    // Orden de visualización del catálogo
    order: { type: Number, default: 0 },
    
    // Información adicional
    extra: mongoose.Schema.Types.Mixed
  }
}, {
  collection: 'catalogs',
  timestamps: true,
  versionKey: false
});

// Índice compuesto para búsquedas eficientes
catalogSchema.index({ type: 1 });
catalogSchema.index({ 'items.id': 1 });

// Método estático para obtener un catálogo por tipo
catalogSchema.statics.getByType = async function(type) {
  return await this.findOne({ type });
};

// Método estático para obtener todos los items de un catálogo
catalogSchema.statics.getItems = async function(type) {
  const catalog = await this.findOne({ type });
  if (!catalog) return [];
  
  // Filtrar items activos y convertir a plain objects inmediatamente
  const activeItems = catalog.items
    .filter(item => item.metadata.active !== false)
    .map(item => item.toObject ? item.toObject() : item);
  
  // Ordenar alfabéticamente por label (ignoramos metadata.order por ahora)
  // TODO: Implementar metadata.order solo cuando los valores sean significativos
  return activeItems.sort((a, b) => {
    const labelA = (a.label || '').toLowerCase();
    const labelB = (b.label || '').toLowerCase();
    
    if (labelA < labelB) return -1;
    if (labelA > labelB) return 1;
    return 0;
  });
};

// Método para agregar un item al catálogo
catalogSchema.methods.addItem = function(itemData) {
  // Verificar que no exista el ID
  const exists = this.items.some(item => item.id === itemData.id);
  if (exists) {
    throw new Error(`Item with id '${itemData.id}' already exists`);
  }
  
  this.items.push(itemData);
  return this.save();
};

// Método para actualizar un item del catálogo
catalogSchema.methods.updateItem = function(itemId, updates) {
  const item = this.items.find(item => item.id === itemId);
  if (!item) {
    throw new Error(`Item with id '${itemId}' not found`);
  }
  
  Object.assign(item, updates);
  return this.save();
};

// Método para eliminar (desactivar) un item
catalogSchema.methods.removeItem = function(itemId) {
  const item = this.items.find(item => item.id === itemId);
  if (!item) {
    throw new Error(`Item with id '${itemId}' not found`);
  }
  
  // Soft delete: marcar como inactivo
  item.metadata.active = false;
  return this.save();
};

export const Catalog = mongoose.model('Catalog', catalogSchema);
