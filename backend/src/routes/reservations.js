import { Router } from "express";
import { getReservations, getReservationById, createReservation, deleteReservation } from '../controllers/reservationController.js';

const router = Router();

// GET /api/reservations
router.get('/', getReservations);

// GET /api/reservations/:id
router.get('/:id', getReservationById);

//POST /api/reservations
router.post('/', createReservation);

// DELETE /api/reservations/:id
router.delete('/:id', deleteReservation);

export default router;