import mongoose from 'mongoose';
import config from './env.js';

export async function connectDB() {
  const uri = `${config.DATABASE_URL}/${config.DATABASE_NAME}`;
  if (!uri) throw new Error('MONGO_URI no está definido en las variables de entorno');

  try {
    // useNewUrlParser y useUnifiedTopology están deprecadas desde Mongoose 6.0+
    // Se omiten ya que son comportamiento por defecto
    await mongoose.connect(uri);
    console.log('MongoDB conectado exitosamente');
    console.log('Cluster:', config.DATABASE_URL.match(/@([^/]+)/)?.[1] || 'N/A');
    console.log('Database:', config.DATABASE_NAME);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}