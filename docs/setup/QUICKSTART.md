# 🚀 Quick Start - TuAutoCom

Guía rápida para poner en marcha el proyecto.  
**Tiempo:** ~5 minutos

---

## 📍 Paso 1/5: Clonar Repositorio

```bash
git clone https://github.com/rofernandezm/tuautocom.git
cd tuautocom
```

---

## 📍 Paso 2/5: Instalar Dependencias

```bash
pnpm install
```

---

## 📍 Paso 3/5: Configurar Ambiente (Automático)

```bash
pnpm setup
```

✅ **Un comando, funciona igual en Windows/macOS/Linux**

El script automáticamente:
- ✅ Detecta tu sistema operativo
- ✅ Crea `.env.dev` localmente
- ✅ Pregunta si deseas editarlo
- ✅ Abre tu editor favorito

---

## 📍 Paso 4/5: Iniciar Backend

```bash
cd backend && pnpm run dev
```

🎯 Backend corriendo en `http://localhost:8000`

**Deixa esta terminal corriendo.**

---

## 📍 Paso 5/5: Iniciar Frontend (OTRA TERMINAL)

Abre **otra terminal** en la raíz del proyecto:

```bash
cd tuautocom.UI && pnpm run dev
```

---

## ✅ ¡Listo! Desarrollo en marcha

| Servicio | URL |
|----------|-----|
| Backend | http://localhost:8000 |
| Frontend | http://localhost:5173 (o similar) |

---

## ❓ Necesitas Ayuda?

| Pregunta | Recurso |
|----------|---------|
| "¿Cómo configuro .env.dev?" | [`ENVIRONMENT.md`](./ENVIRONMENT.md) |
| "¿Problemas en Windows?" | [`WINDOWS.md`](./WINDOWS.md) |
| "¿Detalles técnicos?" | [`SCRIPTS.md`](./SCRIPTS.md) |
| "Índice completo" | [`INDEX.md`](./INDEX.md) |

---

**Próximo paso:** Comienza a desarrollar 🎉
