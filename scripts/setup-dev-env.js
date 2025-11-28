#!/usr/bin/env node

/**
 * Setup de Ambiente - TuAutoCom
 * 
 * Script multiplataforma (Windows, macOS, Linux) para configurar .env.dev
 * Uso: node scripts/setup-dev-env.js
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para consola (funciona en Windows 10+, macOS, Linux)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// Detectar SO
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

async function main() {
  console.log(c('cyan', '\n🔧 Configurando ambiente de desarrollo - TuAutoCom\n'));
  console.log(
    c('bright', `📊 Sistema operativo detectado: ${process.platform}\n`)
  );

  // Rutas
  const projectRoot = path.resolve(__dirname, '..');
  const envDev = path.join(projectRoot, '.env.dev');
  const envExample = path.join(projectRoot, '.env.dev.example');
  const backendEnvDev = path.join(projectRoot, 'backend', '.env.dev');

  // Verificar que .env.dev.example existe
  if (!fs.existsSync(envExample)) {
    console.error(
      c('red', `❌ Error: ${envExample} no encontrado\n`)
    );
    process.exit(1);
  }

  console.log(`📂 Ubicación del proyecto: ${c('yellow', projectRoot)}\n`);

  // Archivos a configurar
  const filesToSetup = [
    { source: envExample, target: envDev, name: 'Root .env.dev' },
    {
      source: envExample,
      target: backendEnvDev,
      name: 'Backend .env.dev',
    },
  ];

  for (const file of filesToSetup) {
    await setupEnvFile(file.source, file.target, file.name);
  }

  console.log(
    c('green', '\n✅ Configuración completada exitosamente\n')
  );

  console.log(
    c('yellow', '📋 Próximos pasos:\n')
  );
  console.log('   1. Edita los archivos .env.dev si es necesario');
  console.log('   2. Instala dependencias: pnpm install');
  if (isWindows) {
    console.log('   3. Inicia el servidor: pnpm run dev');
  } else {
    console.log('   3. Inicia el servidor: cd backend && pnpm run dev');
  }
  console.log('');

  rl.close();
}

async function setupEnvFile(source, target, name) {
  console.log(c('bright', `\n📄 ${name}`));
  console.log('-'.repeat(50));

  // Si archivo existe
  if (fs.existsSync(target)) {
    console.log(`   ✅ ${path.basename(target)} ya existe`);
    console.log('');

    const answer = await question(
      c(
        'yellow',
        `   ¿Deseas resetear ${path.basename(target)}? (s/n): `
      )
    );

    if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'y') {
      console.log('   ⏭️  Saltando...\n');
      return;
    }

    console.log(c('yellow', '   ⚠️  Reseteando archivo...\n'));
  }

  // Crear directorio si no existe
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   📁 Directorio creado: ${dir}`);
  }

  // Copiar archivo
  fs.copyFileSync(source, target);
  fs.chmodSync(target, 0o600); // Permisos: -rw------- (solo lectura/escritura propietario)

  console.log(`   ✅ Archivo creado: ${c('yellow', path.basename(target))}`);
  console.log(`   🔒 Permisos establecidos (600 - solo propietario)\n`);

  // Preguntar si editar
  const edit = await question(
    c('yellow', `   ¿Deseas editar ${path.basename(target)} ahora? (s/n): `)
  );

  if (edit.toLowerCase() === 's' || edit.toLowerCase() === 'y') {
    openInEditor(target);
  }
}

function openInEditor(filePath) {
  let editor;
  let args = [];

  if (isWindows) {
    // Windows: usar notepad o VS Code si está disponible
    if (process.env.EDITOR === 'code') {
      editor = 'code';
      args = [filePath, '--wait'];
    } else {
      editor = 'notepad';
      args = [filePath];
    }
  } else if (isMac) {
    // macOS: usar nano o vi
    editor = process.env.EDITOR || 'nano';
    args = [filePath];
  } else {
    // Linux: usar nano o vi
    editor = process.env.EDITOR || 'nano';
    args = [filePath];
  }

  console.log(
    c('cyan', `   📝 Abriendo ${path.basename(filePath)} en ${editor}...\n`)
  );

  try {
    const proc = spawn(editor, args, {
      stdio: 'inherit',
      shell: true,
    });

    proc.on('close', () => {
      console.log(
        c('green', `   ✅ Archivo guardado: ${path.basename(filePath)}\n`)
      );
    });

    proc.on('error', (err) => {
      console.error(
        c('red', `   ❌ Error al abrir editor: ${err.message}\n`)
      );
      console.log(c('yellow', `   📝 Por favor, edita manualmente: ${filePath}\n`));
    });
  } catch (err) {
    console.error(c('red', `   ❌ Error: ${err.message}`));
    console.log(c('yellow', `   📝 Por favor, edita manualmente: ${filePath}\n`));
  }
}

main().catch((err) => {
  console.error(c('red', `\n❌ Error: ${err.message}\n`));
  process.exit(1);
});
