import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    authorName: { type: String, required: true }, 
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
},
{
  collection: 'comentarios',
  timestamps: true,
  versionKey: false,
});

// index para búsquedas comunes
//commentSchema.index({ title: 'text', brand: 1, model: 1 });

export const Comment = mongoose.model('Comment', commentSchema);