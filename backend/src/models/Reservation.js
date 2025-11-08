import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  authorFirstName: { type: String, required: true },
  authorLastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  },
  reservationDate: { type: Date, required: true },
}, {
  collection: 'reservas',
  timestamps: true,
  versionKey: false,
});

export const Reservation = mongoose.model('Reservation', reservationSchema);