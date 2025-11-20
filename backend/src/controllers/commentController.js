import { Comment } from '../models/Comment.js';

// Obtener todos los comentarios
export async function getComments(req, res, next) {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error al obtener comentarios:', err.message);
    next(err);
  }
}

// Obtener un comentario por ID
export async function getCommentById(req, res, next) {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json(comment);
  } catch (err) {
    console.error('Error obteniendo comentario por ID:', err.message);
    next(err);
  }
}

// Obtener comentarios por ID de vehículo
export async function getCommentsByVehicle(req, res, next) {
  try {
    const { vehicleId } = req.params;
    const comments = await Comment.find({ vehicleId }).sort({ createdAt: -1 });
    
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error obteniendo comentarios del vehículo:', err.message);
    next(err);
  }
}

// Crear un nuevo comentario
export async function createComment(req, res, next) {
  try {
    const created = await Comment.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error al crear comentario:', err.message);
    next(err);
  }
}

// Eliminar un comentario
export async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (err) {
    console.error('Error eliminando comentario:', err.message);
    next(err);
  }
}