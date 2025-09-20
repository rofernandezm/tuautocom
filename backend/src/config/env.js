import { resolve } from 'path';
import { existsSync } from 'fs';
import { config as _config } from 'dotenv';

// Determinar entorno
const NODE_ENV = process.env.NODE_ENV || 'development';

// Mapeo de archivos por entorno
const envFileMap = {
  development: '.env.dev',
  production: '.env',
};

const filename = envFileMap[NODE_ENV] || '.env';
const fullPath = resolve(process.cwd(), filename);

if (existsSync(fullPath)) {
  _config({ path: fullPath });
} else {
  // Cargar variables de entorno ya existentes si no hay archivo
  console.warn(`[env] Archivo ${filename} no encontrado, usando variables del proceso`);
}

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  DATABASE_NAME: process.env.DATABASE_NAME || 'tuautocom_db',
  SECRET_KEY: process.env.SECRET_KEY || 'change_me', // A DEFINIR CUANDO TENGAMOS LA DB OPERATIVA
};

export default config;