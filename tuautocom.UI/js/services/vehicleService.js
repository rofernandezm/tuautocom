/**
 * Vehicle Service
 * Maneja todas las operaciones relacionadas con vehículos
 * 
 * Actualmente usa datos mock (dummy). En integración con backend,
 * reemplazar las llamadas con api.get() hacia el servidor MongoDB
 */

class VehicleService {
  constructor() {
    // Categorías de vehículos
    this.mockCategories = [
      { id: 'all', label: 'Todos' },
      { id: 'sedan', label: 'Sedán' },
      { id: 'suv', label: 'SUV' },
      { id: 'pickup', label: 'Pick-up' },
      { id: 'electric', label: 'Eléctricos' }
    ];

    // Datos mock - serán reemplazados por llamadas a API
    this.mockVehicles = [
      { id: 'v1', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', title: 'Toyota Camry 2024', description: 'Sedán ejecutivo con tecnología híbrida avanzada', badge: { text: 'Popular' } },
      { id: 'v2', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop', title: 'Ford Explorer 2024', description: 'SUV espacioso ideal para familias', badge: { text: 'Nuevo' } },
      { id: 'v3', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop', title: 'Tesla Model 3', description: 'Sedán eléctrico con autopilot incluido', badge: { text: 'Eléctrico' } },
      { id: 'v4', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&h=300&fit=crop', title: 'Honda CR-V 2024', description: 'SUV compacto con excelente economía de combustible', badge: { text: 'Popular' } },
      { id: 'v5', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', title: 'BMW Serie 3', description: 'Lujo y deportividad en perfecta armonía', badge: { text: 'Premium' } },
      { id: 'v6', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop', title: 'Chevrolet Silverado', description: 'Pick-up de trabajo pesado con gran capacidad', badge: { text: 'Robusto' } },
      { id: 'v7', image: 'https://images.unsplash.com/photo-1578345154702-2c1fb49cb4d1?w=400&h=300&fit=crop', title: 'Hyundai Elantra', description: 'Auto compacto urbano ideal para la ciudad', badge: { text: 'Económico' } },
      { id: 'v8', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop', title: 'Mazda CX-5', description: 'SUV crossover con diseño elegante', badge: { text: 'Eficiente' } },
      { id: 'v9', image: 'https://images.unsplash.com/photo-1493238792879-172d316dc5f5?w=400&h=300&fit=crop', title: 'Nissan Altima', description: 'Sedán económico confiable y de bajo consumo', badge: { text: 'Confiable' } },
      { id: 'v10', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', title: 'Audi A4', description: 'Sedán premium con tecnología de punta', badge: { text: 'Premium' } },
      { id: 'v11', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop', title: 'Jeep Wrangler', description: 'SUV todoterreno auténtico para aventuras', badge: { text: 'Off-Road' } },
      { id: 'v12', image: 'https://images.unsplash.com/photo-1617531653520-bd466ee75d0d?w=400&h=300&fit=crop', title: 'Mercedes-Benz Clase C', description: 'Elegancia alemana y confort superior', badge: { text: 'Lujo' } },
      { id: 'v13', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop', title: 'Volkswagen Tiguan', description: 'SUV versátil con gran espacio interior', badge: { text: 'Versátil' } },
      { id: 'v14', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop', title: 'Porsche 911', description: 'Deportivo icónico con rendimiento excepcional', badge: { text: 'Deportivo' } },
      { id: 'v15', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', title: 'Kia Sportage', description: 'SUV moderno con excelente relación calidad-precio', badge: { text: 'Nuevo' } },
      { id: 'v16', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop', title: 'Subaru Outback', description: 'Wagon aventurero con tracción AWD permanente', badge: { text: 'Aventura' } },
      { id: 'v17', image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop', title: 'Lexus RX', description: 'SUV de lujo japonés con máximo confort', badge: { text: 'Premium' } },
      { id: 'v18', image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400&h=300&fit=crop', title: 'Ram 1500', description: 'Pick-up full-size con capacidad de remolque superior', badge: { text: 'Potente' } },
      { id: 'v19', image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=300&fit=crop', title: 'Volvo XC90', description: 'SUV sueco con máxima seguridad y elegancia', badge: { text: 'Seguro' } },
      { id: 'v20', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=400&h=300&fit=crop', title: 'Genesis G80', description: 'Sedán de lujo coreano con diseño sofisticado', badge: { text: 'Lujo' } },
    ];
  }

  /**
   * Obtiene las categorías de vehículos
   * @returns {Promise<Array>}
   */
  async getCategories() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.mockCategories;
  }

  /**
   * Obtiene vehículos destacados (Más vistos)
   * @returns {Promise<Array>}
   */
  async getFeatured() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.mockVehicles.slice(0, 8);
  }

  /**
   * Obtiene vehículos más baratos
   * @returns {Promise<Array>}
   */
  async getCheapest() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.mockVehicles.slice(6, 14);
  }

  /**
   * Obtiene vehículos más visitados
   * @returns {Promise<Array>}
   */
  async getMostVisited() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.mockVehicles.slice(12, 20);
  }

  /**
   * Obtiene todos los vehículos
   * @returns {Promise<Array>}
   */
  async getAll() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.mockVehicles;
  }

  /**
   * Obtiene un vehículo por ID
   * @param {string} id - ID del vehículo
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.mockVehicles.find(v => v.id === id) || null;
  }
}

// Exportar instancia única (Singleton)
export const vehicleService = new VehicleService();
