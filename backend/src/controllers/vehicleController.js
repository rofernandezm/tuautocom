import { Vehicle } from '../models/Vehicle.js';

/**
 * Obtiene vehículos con paginación y filtros
 * 
 * Query params opcionales:
 * - page: Número de página (default: 1)
 * - limit: Vehículos por página (default: 12)
 * - category: Filtrar por categoría (sedan, suv, pickup, etc.)
 * - brand: Filtrar por marca
 * - minPrice: Precio mínimo
 * - maxPrice: Precio máximo
 * - year: Filtrar por año
 * - fuel: Filtrar por tipo de combustible (gasolina, diesel, electrico, hibrido, etc.)
 * - search: Búsqueda en título y descripción
 * - condition: Filtrar por condición (new, used)
 * 
 * @param {Request} req - Request con query params
 * @param {Response} res - Response con vehículos y metadata
 */
export async function getVehicles(req, res, next) {
  try {
    // Parámetros de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Construir filtro de MongoDB
    const filter = {};

    // Filtro por categoría
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Filtro por marca
    if (req.query.brand && req.query.brand !== 'all') {
      filter.brand = { $regex: req.query.brand, $options: 'i' };
    }

    // Filtro por rango de precio
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseInt(req.query.maxPrice);
    }

    // Filtro por año
    if (req.query.year && req.query.year !== 'all') {
      filter.year = parseInt(req.query.year);
    }

    // Filtro por combustible
    if (req.query.fuel && req.query.fuel !== 'all') {
      filter['specs.fuel'] = req.query.fuel;
    }

    // Filtro por condición (nuevo/usado)
    if (req.query.condition && req.query.condition !== 'all') {
      filter['condition.use'] = req.query.condition;
    }

    // Búsqueda en título y descripción
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { brand: { $regex: req.query.search, $options: 'i' } },
        { model: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Filtros aplicados -> ${JSON.stringify(filter)}

    // Contar total de documentos CON filtros
    const total = await Vehicle.countDocuments(filter);

    // Obtener vehículos con filtros y paginación
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
    // Parsear datos del vehículo desde FormData
    let vehicleData = {};

    // Si viene 'data' como string JSON (de FormData con 'data' field)
    if (req.body.data && typeof req.body.data === 'string') {
      try {
        vehicleData = JSON.parse(req.body.data);
      } catch (parseErr) {
        console.error('Error parseando JSON de vehicleData:', parseErr);
        return res.status(400).json({ error: 'Datos inválidos en formulario' });
      }
    } else if (req.body && typeof req.body === 'object') {
      // Si viene JSON directo en body
      vehicleData = req.body;
    }

    // vehicleData parseado: (sanitized)

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

    // Si es error de validación de Mongoose, mostrar detalles
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

/**
 * Obtiene vehículos destacados usando aggregation pipeline
 * 
 * 1. $match: Filtrar nuevos O económicos (precio < 30000)
 * 2. $sort: Ordenar por fecha de creación (más recientes primero)
 * 3. $limit: Máximo 8 resultados
 * 
 * @route GET /api/vehicles/featured
 */
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

/**
 * Obtiene vehículos más baratos usando aggregation pipeline
 * 
 * 1. $sort: Ordenar por precio ascendente (menor a mayor)
 * 2. $limit: Máximo 8 resultados
 * 
 * @route GET /api/vehicles/cheapest
 */
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

/**
 * Obtiene vehículos más recientes usando aggregation pipeline
 * 
 * 1. $sort: Ordenar por fecha de creación descendente
 * 2. $limit: Máximo 8 resultados
 * 
 * @route GET /api/vehicles/recent
 */
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