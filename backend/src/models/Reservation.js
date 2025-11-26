import mongoose from 'mongoose';

/**
 * Modelo de Reserva/Consulta
 * Colección: reservas
 * 
 * Almacena información de contacto de usuarios interesados en vehículos.
 * Sin gestión de estados - solo visualización de datos.
 */
const reservationSchema = new mongoose.Schema({
  // Información del contacto
  authorFirstName: { 
    type: String, 
    required: true,
    trim: true
  },
  authorLastName: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: { 
    type: String, 
    required: true,
    trim: true
  },
  
  // Referencia al vehículo consultado
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  
  // Información adicional (guardada desnormalizada para visualización)
  vehicleTitle: {
    type: String,
    required: false
  },
  vehicleId: {
    type: String,
    required: false
  },
  
  // Mensaje opcional del usuario
  message: {
    type: String,
    required: false,
    trim: true
  },
  
  // Fecha de la consulta
  reservationDate: { 
    type: Date, 
    required: true,
    default: Date.now
  },
}, {
  collection: 'reservas',
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false, // Elimina __v
});

export const Reservation = mongoose.model('Reservation', reservationSchema);