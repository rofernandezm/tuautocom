import { Reservation } from '../models/Reservation.js';

// Obtener todas las reservas
export async function getReservations(req, res, next) {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Error al obtener reservas:', err.message);
    next(err);
  }
}

// Obtener un comentario por ID
export async function getReservationById(req, res, next) {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(reservation);
  } catch (err) {
    console.error('Error obteniendo reservas por ID:', err.message);
    next(err);
  }
}

// Crear una nueva reserva
export async function createReservation(req, res, next) {
  try {
    const created = await Reservation.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error al crear reserva:', err.message);
    next(err);
  }
}

// Eliminar una reserva
export async function deleteReservation(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Reservation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (err) {
    console.error('Error eliminando reserva:', err.message);
    next(err);
  }
}