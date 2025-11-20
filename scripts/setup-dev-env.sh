#!/bin/bash

# 📝 Script de configuración inicial para desarrollo
# Este script crea el archivo .env.dev basado en .env.dev.example
# si no existe ya

echo "🔧 Configurando ambiente de desarrollo..."

# Ruta base del proyecto
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Archivos
ENV_DEV="$PROJECT_ROOT/.env.dev"
ENV_EXAMPLE="$PROJECT_ROOT/.env.dev.example"

# Verificar si .env.dev.example existe
if [ ! -f "$ENV_EXAMPLE" ]; then
    echo "❌ Error: $ENV_EXAMPLE no encontrado"
    exit 1
fi

# Si .env.dev no existe, crear desde template
if [ ! -f "$ENV_DEV" ]; then
    echo "📋 Creando $ENV_DEV desde template..."
    cp "$ENV_EXAMPLE" "$ENV_DEV"
    chmod 600 "$ENV_DEV"
    
    echo ""
    echo "✅ Archivo .env.dev creado"
    echo "⚠️  IMPORTANTE: Edita $ENV_DEV con tus valores locales"
    echo ""
    echo "Abriendo editor..."
    ${EDITOR:-nano} "$ENV_DEV"
else
    echo "✅ $ENV_DEV ya existe"
    echo ""
    echo "Opciones:"
    echo "  1) Usar actual"
    echo "  2) Resetear desde template"
    read -p "Selecciona (1-2): " choice
    
    if [ "$choice" = "2" ]; then
        echo "⚠️  Reseteando .env.dev desde template..."
        cp "$ENV_EXAMPLE" "$ENV_DEV"
        chmod 600 "$ENV_DEV"
        echo "✅ Hecho. Edita los valores nuevamente."
        ${EDITOR:-nano} "$ENV_DEV"
    fi
fi

echo ""
echo "✅ Configuración completada"
