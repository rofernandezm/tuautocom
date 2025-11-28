import { Vehicle } from '../models/Vehicle.js';

// Obtener lista de vehículos con filtros y paginación
export async function getVehicles(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const filter = {};

    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    if (req.query.brand && req.query.brand !== 'all') {
      filter.brand = { $regex: req.query.brand, $options: 'i' };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseInt(req.query.maxPrice);
    }

    if (req.query.year && req.query.year !== 'all') {
      filter.year = parseInt(req.query.year);
    }

    if (req.query.fuel && req.query.fuel !== 'all') {
      filter['specs.fuel'] = req.query.fuel;
    }

    if (req.query.condition && req.query.condition !== 'all') {
      filter['condition.use'] = req.query.condition;
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { brand: { $regex: req.query.search, $options: 'i' } },
        { model: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const total = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const pages = Math.ceil(total / limit);

    res.status(200).json({
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1
      },
      filters: filter // Util para debugging. Se adjunta el filtro aplicado
    });
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
    let vehicleData = {};

    if (req.body.data && typeof req.body.data === 'string') {
      try {
        vehicleData = JSON.parse(req.body.data);
      } catch (parseErr) {
        console.error('Error parseando JSON de vehicleData:', parseErr);
        return res.status(400).json({ error: 'Datos inválidos en formulario' });
      }
    } else if (req.body && typeof req.body === 'object') {
      vehicleData = req.body;
    }

    // Procesar archivos de imágenes (multer los coloca en req.files)
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      vehicleData.images = req.files.map(file => `/uploads/${file.filename}`);
    } else {
      vehicleData.images = [];
    }

    // Crear el vehículo en MongoDB
    const created = await Vehicle.create(vehicleData);

    res.status(201).json(created);
  } catch (err) {
    console.error('Error al crear vehículo:', err.message);

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Error de validación',
        details: Object.keys(err.errors).map(key => ({
          field: key,
          message: err.errors[key].message
        }))
      });
    }

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

export async function getFeaturedVehicles(req, res, next) {
  try {
    const featured = await Vehicle.aggregate([
      // Filtrar vehículos nuevos o precio menor a umbrales
      {
        $match: {
          $or: [
            { 'condition.use': 'new' },    // Vehículos nuevos
            { price: { $lt: 30000 } }      // Vehículos económicos
          ]
        }
      },
      // Ordenar por fecha de creación (más recientes primero)
      {
        $sort: { createdAt: -1 }
      },
      // Limitar a 8 resultados
      {
        $limit: 8
      }
    ]);

    res.status(200).json(featured);
  } catch (err) {
    console.error('Error en aggregation pipeline (featured):', err.message);
    next(err);
  }
}

export async function getCheapestVehicles(req, res, next) {
  try {
    const cheapest = await Vehicle.aggregate([
      // Ordenar por precio (menor a mayor)
      {
        $sort: { price: 1 }
      },
      // Limitar a 8 resultados
      {
        $limit: 8
      }
    ]);

    res.status(200).json(cheapest);
  } catch (err) {
    console.error('Error en aggregation pipeline (cheapest):', err.message);
    next(err);
  }
}

export async function getMostRecentVehicles(req, res, next) {
  try {
    const recent = await Vehicle.aggregate([
      // Ordenar por fecha de creación (más recientes primero)
      {
        $sort: { createdAt: -1 }
      },
      // Limitar a 8 resultados
      {
        $limit: 8
      }
    ]);

    res.status(200).json(recent);
  } catch (err) {
    console.error('Error en aggregation pipeline (recent):', err.message);
    next(err);
  }
}