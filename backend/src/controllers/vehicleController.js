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
    const created = await Vehicle.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error al crear vehículo:', err.message);
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