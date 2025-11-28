import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  authorName: { 
    type: String, 
    required: true,
    trim: true,
    default: 'Usuario Anónimo'
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
},
{
  collection: 'comentarios',
  timestamps: true,
  versionKey: false,
});

export const Comment = mongoose.model('Comment', commentSchema);