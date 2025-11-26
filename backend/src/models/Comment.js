import mongoose from 'mongoose';

/**
 * Modelo de Comentario
 * Colección: comentarios
 * 
 * Almacena comentarios de usuarios sobre vehículos específicos.
 * Sin gestión de estados - solo visualización de datos.
 */
const commentSchema = new mongoose.Schema({
  // Nombre del autor del comentario
  authorName: { 
    type: String, 
    required: true,
    trim: true,
    default: 'Usuario Anónimo'
  },
  
  // Contenido del comentario
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  
  // Referencia al vehículo comentado
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },
  
  // Fecha del comentario (deprecated, usar createdAt de timestamps)
  date: { 
    type: Date, 
    default: Date.now 
  },
},
{
  collection: 'comentarios',
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false, // Elimina __v
});

export const Comment = mongoose.model('Comment', commentSchema);