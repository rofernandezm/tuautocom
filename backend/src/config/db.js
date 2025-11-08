import mongoose from 'mongoose';
import config from './env.js';

export async function connectDB() {
  const uri = `${config.DATABASE_URL}/${config.DATABASE_NAME}`;
  if (!uri) throw new Error('MONGO_URI no está definido en las variables de entorno');

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // otras opciones según versión de mongoose
    });
    console.log('MongoDB connected:', uri);
  } catch (err) {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  }
}