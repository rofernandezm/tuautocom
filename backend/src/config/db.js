import mongoose from 'mongoose';
import config from './env.js';

export async function connectDB() {
  const uri = config.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL no está definido en las variables de entorno');

  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado exitosamente');
    console.log('Cluster:', config.DATABASE_URL.match(/@([^/]+)/)?.[1] || 'N/A');
    console.log('Database:', mongoose.connection.db.databaseName);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}