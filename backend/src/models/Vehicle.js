import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  title : { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number },
  price: { type: Number, required: true },
  mileage: { type: Number, default: 0 },
  specs: { 
    version: { type: String },
    transmission: { type: String },
    motor: { type: String },
    fuel: { type: String },
    color: { type: String},
    traction: { type: String},
  },
  condition: { 
    use: { type: String, enum: ['new', 'used'], required: true, default: 'used' },
    exterior: { type: String },
    interior: { type: String },
    mechanics: { type: String},
  },
  images: [{ type: String}],
},
{
  collection: 'vehiculos',
  timestamps: true,
  versionKey: false,
});

// index para búsquedas comunes
//vehicleSchema.index({ title: 'text', brand: 1, model: 1 });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);