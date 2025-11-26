import mongoose from 'mongoose';
import { Catalog } from '../models/Catalog.js';
import config from '../config/env.js';

const catalogsData = [
  {
    type: 'categories',
    items: [
      { id: 'suv', label: 'SUV', metadata: { order: 1, active: true } },
      { id: 'sedan', label: 'Sedán', metadata: { order: 2, active: true } },
      { id: 'pickup', label: 'Pick-up', metadata: { order: 3, active: true } },
      { id: 'electricos', label: 'Eléctricos', metadata: { order: 4, active: true } },
      { id: 'deportivos', label: 'Deportivos', metadata: { order: 5, active: true } },
      { id: 'hatchback', label: 'Hatchback', metadata: { order: 6, active: true } }
    ],
    catalogMetadata: { description: 'Categorías de vehículos', allowMultiple: false, order: 1 }
  },
  {
    type: 'brands',
    items: [
      { id: 'toyota', label: 'Toyota', metadata: { order: 1, active: true } },
      { id: 'honda', label: 'Honda', metadata: { order: 2, active: true } },
      { id: 'ford', label: 'Ford', metadata: { order: 3, active: true } },
      { id: 'chevrolet', label: 'Chevrolet', metadata: { order: 4, active: true } },
      { id: 'nissan', label: 'Nissan', metadata: { order: 5, active: true } },
      { id: 'mazda', label: 'Mazda', metadata: { order: 6, active: true } },
      { id: 'hyundai', label: 'Hyundai', metadata: { order: 7, active: true } },
      { id: 'kia', label: 'Kia', metadata: { order: 8, active: true } },
      { id: 'volkswagen', label: 'Volkswagen', metadata: { order: 9, active: true } },
      { id: 'bmw', label: 'BMW', metadata: { order: 10, active: true } },
      { id: 'mercedes-benz', label: 'Mercedes-Benz', metadata: { order: 11, active: true } },
      { id: 'audi', label: 'Audi', metadata: { order: 12, active: true } },
      { id: 'tesla', label: 'Tesla', metadata: { order: 13, active: true } },
      { id: 'subaru', label: 'Subaru', metadata: { order: 14, active: true } },
      { id: 'mitsubishi', label: 'Mitsubishi', metadata: { order: 15, active: true } }
    ],
    catalogMetadata: { description: 'Marcas de vehículos', allowMultiple: true, order: 2 }
  },
  {
    type: 'transmissions',
    items: [
      { id: 'manual', label: 'Manual', metadata: { order: 1, active: true } },
      { id: 'automatica', label: 'Automática', metadata: { order: 2, active: true } },
      { id: 'cvt', label: 'CVT', metadata: { order: 3, active: true } },
      { id: 'dsg', label: 'DSG', metadata: { order: 4, active: true } }
    ],
    catalogMetadata: { description: 'Tipos de transmisión', allowMultiple: true, order: 3 }
  },
  {
    type: 'fuels',
    items: [
      { id: 'gasolina', label: 'Gasolina', metadata: { order: 1, active: true } },
      { id: 'diesel', label: 'Diésel', metadata: { order: 2, active: true } },
      { id: 'electrico', label: 'Eléctrico', metadata: { order: 3, active: true } },
      { id: 'hibrido', label: 'Híbrido', metadata: { order: 4, active: true } },
      { id: 'hibrido-enchufable', label: 'Híbrido Enchufable', metadata: { order: 5, active: true } },
      { id: 'gas', label: 'Gas Natural', metadata: { order: 6, active: true } }
    ],
    catalogMetadata: { description: 'Tipos de combustible', allowMultiple: true, order: 4 }
  },
  {
    type: 'colors',
    items: [
      { id: 'blanco', label: 'Blanco', metadata: { order: 1, active: true, color: '#FFFFFF' } },
      { id: 'negro', label: 'Negro', metadata: { order: 2, active: true, color: '#000000' } },
      { id: 'gris', label: 'Gris', metadata: { order: 3, active: true, color: '#808080' } },
      { id: 'plata', label: 'Plata', metadata: { order: 4, active: true, color: '#C0C0C0' } },
      { id: 'rojo', label: 'Rojo', metadata: { order: 5, active: true, color: '#FF0000' } },
      { id: 'azul', label: 'Azul', metadata: { order: 6, active: true, color: '#0000FF' } },
      { id: 'verde', label: 'Verde', metadata: { order: 7, active: true, color: '#00FF00' } },
      { id: 'amarillo', label: 'Amarillo', metadata: { order: 8, active: true, color: '#FFFF00' } },
      { id: 'naranja', label: 'Naranja', metadata: { order: 9, active: true, color: '#FFA500' } },
      { id: 'cafe', label: 'Café', metadata: { order: 10, active: true, color: '#8B4513' } }
    ],
    catalogMetadata: { description: 'Colores disponibles', allowMultiple: true, order: 5 }
  },
  {
    type: 'conditions',
    items: [
      { id: 'new', label: 'Nuevo', metadata: { order: 1, active: true } },
      { id: 'used', label: 'Usado', metadata: { order: 2, active: true } }
    ],
    catalogMetadata: { description: 'Condición del vehículo', allowMultiple: false, order: 6 }
  },
  {
    type: 'tractions',
    items: [
      { id: '2wd', label: '2WD', metadata: { order: 1, active: true } },
      { id: '4wd', label: '4WD', metadata: { order: 2, active: true } },
      { id: 'awd', label: 'AWD', metadata: { order: 3, active: true } },
      { id: 'fwd', label: 'FWD', metadata: { order: 4, active: true } },
      { id: 'rwd', label: 'RWD', metadata: { order: 5, active: true } }
    ],
    catalogMetadata: { description: 'Tipos de tracción', allowMultiple: true, order: 7 }
  }
];

async function seedCatalogs() {
  try {
    await mongoose.connect(config.DATABASE_URL);
    await Catalog.deleteMany({});

    for (const catalogData of catalogsData) {
      const catalog = new Catalog(catalogData);
      await catalog.save();
    }

    const allCatalogs = await Catalog.find();
    allCatalogs.forEach(catalog => {
      console.log(`${catalog.type}: ${catalog.items.length} items`);
    });

  } catch (error) {
    console.error('Error en seed:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedCatalogs();
