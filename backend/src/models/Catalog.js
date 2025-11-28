import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'categories',      // Categorías de vehículos
      'brands',          // Marcas de vehículos
      'transmissions',   // Tipos de transmisión
      'fuels',          // Tipos de combustible
      'colors',         // Colores disponibles
      'conditions',     // Condiciones (nuevo, usado)
      'tractions'       // Tipos de tracción
    ]
  },
  items: [{
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    metadata: {
      order: { type: Number, default: 0 },
      icon: { type: String },
      color: { type: String },
      active: { type: Boolean, default: true },
      extra: mongoose.Schema.Types.Mixed
    }
  }],
  catalogMetadata: {
    description: { type: String },
    allowMultiple: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    extra: mongoose.Schema.Types.Mixed
  }
}, {
  collection: 'catalogs',
  timestamps: true,
  versionKey: false
});

catalogSchema.index({ type: 1 });
catalogSchema.index({ 'items.id': 1 });

catalogSchema.statics.getByType = async function (type) {
  return await this.findOne({ type });
};

catalogSchema.statics.getItems = async function (type) {

  const result = await this.aggregate([
    { $match: { type } },
    { $unwind: '$items' },
    { $match: { 'items.metadata.active': { $ne: false } } },
    { $sort: { 'items.label': 1 } },
    {
      $group: {
        _id: '$_id',
        items: { $push: '$items' }
      }
    },
    { $project: { _id: 0, items: 1 } }
  ]);

  if (!result || result.length === 0) return [];
  return result[0].items;
};

catalogSchema.methods.addItem = function (itemData) {
  const exists = this.items.some(item => item.id === itemData.id);
  if (exists) {
    throw new Error(`Item with id '${itemData.id}' already exists`);
  }

  this.items.push(itemData);
  return this.save();
};

catalogSchema.methods.updateItem = function (itemId, updates) {
  const item = this.items.find(item => item.id === itemId);
  if (!item) {
    throw new Error(`Item with id '${itemId}' not found`);
  }
  Object.assign(item, updates);
  return this.save();
};

catalogSchema.methods.removeItem = function (itemId) {
  const item = this.items.find(item => item.id === itemId);
  if (!item) {
    throw new Error(`Item with id '${itemId}' not found`);
  }
  item.metadata.active = false;
  return this.save();
};

export const Catalog = mongoose.model('Catalog', catalogSchema);
