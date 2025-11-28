import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
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
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  vehicleTitle: {
    type: String,
    required: false
  },
  vehicleId: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false,
    trim: true
  },
  reservationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
}, {
  collection: 'reservas',
  timestamps: true,
  versionKey: false,
});

export const Reservation = mongoose.model('Reservation', reservationSchema);