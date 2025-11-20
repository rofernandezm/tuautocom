import { Vehicle } from '../models/Vehicle.js';

// Obtener todos los vehículos
export async function getVehicles(req, res, next) {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error al obtener vehículos:', err.message);
    next(err);
  }
}

// Obtener un vehículo por ID
export async function getVehicleById(req, res, next) {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json(vehicle);
  } catch (err) {
    console.error('Error obteniendo vehículo por ID:', err.message);
    next(err);
  }
}

// Crear un nuevo vehículo
export async function createVehicle(req, res, next) {
  try {
    console.log('📝 Creando vehículo...');
    console.log('   req.body keys:', Object.keys(req.body));
    console.log('   req.files:', req.files ? `${req.files.length} archivos` : 'undefined');
    console.log('   req.body.data tipo:', typeof req.body.data);
    
    // DEBUG: mostrar todo el contenido de req.files si existe
    if (req.files) {
      console.log('   Archivos detallados:');
      req.files.forEach((f, i) => {
        console.log(`     [${i}] ${f.originalname} - ${f.size} bytes - mimetype: ${f.mimetype}`);
      });
    }
    
    // Parsear datos del vehículo desde FormData
    let vehicleData = {};
    
    // Si viene 'data' como string JSON (de FormData con 'data' field)
    if (req.body.data && typeof req.body.data === 'string') {
      try {
        vehicleData = JSON.parse(req.body.data);
      } catch (parseErr) {
        console.error('❌ Error parseando JSON de vehicleData:', parseErr);
        return res.status(400).json({ error: 'Datos inválidos en formulario' });
      }
    } else if (req.body && typeof req.body === 'object') {
      // Si viene JSON directo en body
      vehicleData = req.body;
    }

    console.log('✅ vehicleData parseado:', {
      title: vehicleData.title,
      brand: vehicleData.brand,
      year: vehicleData.year,
    });

    // Procesar archivos de imágenes (multer los coloca en req.files)
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      vehicleData.images = req.files.map(file => `/uploads/${file.filename}`);
      console.log('📸 Imágenes guardadas:', vehicleData.images);
    } else {
      // Si no hay imágenes, inicializar como array vacío
      vehicleData.images = [];
      console.log('ℹ️ Sin imágenes en este vehículo');
    }
    
    // Crear el vehículo en MongoDB
    const created = await Vehicle.create(vehicleData);
    console.log('✅ Vehículo creado:', created._id);
    
    res.status(201).json(created);
  } catch (err) {
    console.error('❌ Error al crear vehículo:', err.message);
    console.error('Stack:', err.stack);
    next(err);
  }
}

// Actualizar un vehículo existente
export async function updateVehicle(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // asegura validación del schema al actualizar
    });

    if (!updated) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error actualizando vehículo:', err.message);
    next(err);
  }
}

// Eliminar un vehículo
export async function deleteVehicle(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Vehicle.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json({ message: 'Vehículo eliminado correctamente' });
  } catch (err) {
    console.error('Error eliminando vehículo:', err.message);
    next(err);
  }
}