/**
 * VehicleService
 * Servicio para manejo de datos de vehículos y comunicación con backend
 */
class VehicleService {
    // Base de datos mock de vehículos
    static vehicleDatabase = {
        autos: {
            hatch: [
                {
                    id: 'h1',
                    name: 'Volkswagen Golf GTI',
                    description: 'Deportivo compacto con motor turbo de 245 HP. Perfecto equilibrio entre performance y practicidad.',
                    price: '$35,000',
                    badge: 'popular',
                    emoji: '🚗',
                    category: 'hatch',
                    type: 'autos'
                },
                {
                    id: 'h2',
                    name: 'Honda Civic Hatchback',
                    description: 'Hatchback confiable y eficiente. Excelente relación calidad-precio con tecnología avanzada.',
                    price: '$24,000',
                    badge: 'cheap',
                    emoji: '🚙',
                    category: 'hatch',
                    type: 'autos'
                },
                {
                    id: 'h3',
                    name: 'Ford Focus ST',
                    description: 'Hatchback deportivo con suspensión deportiva y motor EcoBoost de 280 HP.',
                    price: '$32,000',
                    badge: null,
                    emoji: '🏎️',
                    category: 'hatch',
                    type: 'autos'
                }
            ],
            sedan: [
                {
                    id: 's1',
                    name: 'Toyota Camry Hybrid',
                    description: 'Sedán híbrido premium con excelente eficiencia de combustible y tecnología de seguridad.',
                    price: '$29,000',
                    badge: 'popular',
                    emoji: '🚘',
                    category: 'sedan',
                    type: 'autos'
                },
                {
                    id: 's2',
                    name: 'Honda Accord',
                    description: 'Sedán mediano confiable con amplio espacio interior y características de lujo.',
                    price: '$26,500',
                    badge: 'cheap',
                    emoji: '🚗',
                    category: 'sedan',
                    type: 'autos'
                },
                {
                    id: 's3',
                    name: 'BMW Serie 3',
                    description: 'Sedán deportivo de lujo con motor turbo y tecnología BMW ConnectedDrive.',
                    price: '$42,000',
                    badge: null,
                    emoji: '🏁',
                    category: 'sedan',
                    type: 'autos'
                }
            ],
            coupe: [
                {
                    id: 'c1',
                    name: 'Ford Mustang GT',
                    description: 'Coupé deportivo icónico con motor V8 de 450 HP. Pura adrenalina americana.',
                    price: '$38,000',
                    badge: 'popular',
                    emoji: '🏎️',
                    category: 'coupe',
                    type: 'autos'
                },
                {
                    id: 'c2',
                    name: 'Chevrolet Camaro',
                    description: 'Muscle car moderno con diseño agresivo y performance excepcional.',
                    price: '$35,500',
                    badge: null,
                    emoji: '🚗',
                    category: 'coupe',
                    type: 'autos'
                }
            ]
        },
        camionetas: {
            suv: [
                {
                    id: 'suv1',
                    name: 'Toyota RAV4 Hybrid',
                    description: 'SUV compacto híbrido con tracción integral y excelente eficiencia de combustible.',
                    price: '$32,000',
                    badge: 'popular',
                    emoji: '🚙',
                    category: 'suv',
                    type: 'camionetas'
                },
                {
                    id: 'suv2',
                    name: 'Honda CR-V',
                    description: 'SUV familiar confiable con amplio espacio de carga y tecnología Honda Sensing.',
                    price: '$28,000',
                    badge: 'cheap',
                    emoji: '🚐',
                    category: 'suv',
                    type: 'camionetas'
                },
                {
                    id: 'suv3',
                    name: 'Jeep Grand Cherokee',
                    description: 'SUV premium con capacidades off-road excepcionales y interior de lujo.',
                    price: '$45,000',
                    badge: null,
                    emoji: '🚙',
                    category: 'suv',
                    type: 'camionetas'
                }
            ],
            pickup: [
                {
                    id: 'p1',
                    name: 'Ford F-150 Lightning',
                    description: 'Pickup eléctrica revolucionaria con 563 HP y capacidad de remolque de 10,000 lbs.',
                    price: '$55,000',
                    badge: 'popular',
                    emoji: '🛻',
                    category: 'pickup',
                    type: 'camionetas'
                },
                {
                    id: 'p2',
                    name: 'Chevrolet Silverado',
                    description: 'Pickup robusta y confiable, perfecta para trabajo y aventuras familiares.',
                    price: '$35,000',
                    badge: 'cheap',
                    emoji: '🚚',
                    category: 'pickup',
                    type: 'camionetas'
                },
                {
                    id: 'p3',
                    name: 'Ram 1500 TRX',
                    description: 'Pickup súper deportiva con motor Hellcat V8 de 702 HP. Bestia off-road.',
                    price: '$75,000',
                    badge: null,
                    emoji: '🛻',
                    category: 'pickup',
                    type: 'camionetas'
                }
            ],
            furgon: [
                {
                    id: 'f1',
                    name: 'Ford Transit Connect',
                    description: 'Furgón comercial compacto, ideal para entregas urbanas y pequeños negocios.',
                    price: '$28,000',
                    badge: 'cheap',
                    emoji: '🚐',
                    category: 'furgon',
                    type: 'camionetas'
                },
                {
                    id: 'f2',
                    name: 'Mercedes Sprinter',
                    description: 'Furgón premium con gran capacidad de carga y tecnología avanzada.',
                    price: '$48,000',
                    badge: 'popular',
                    emoji: '🚛',
                    category: 'furgon',
                    type: 'camionetas'
                }
            ]
        }
    };

    /**
     * Obtiene todos los vehículos
     * @returns {Promise<Array>} Array de todos los vehículos
     */
    static async getAllVehicles() {
        return new Promise(resolve => {
            setTimeout(() => {
                const allVehicles = [];
                Object.values(this.vehicleDatabase).forEach(type => {
                    Object.values(type).forEach(category => {
                        allVehicles.push(...category);
                    });
                });
                resolve(allVehicles);
            }, 100);
        });
    }

    /**
     * Obtiene vehículos por categoría
     * @param {string} type - Tipo de vehículo ('autos' o 'camionetas')
     * @param {string} category - Categoría específica
     * @returns {Array} Array de vehículos de la categoría
     */
    static getVehiclesByCategory(type, category) {
        return this.vehicleDatabase[type]?.[category] || [];
    }

    /**
     * Obtiene todos los autos
     * @returns {Array} Array de todos los autos
     */
    static getAllAutosByType() {
        const allAutos = [];
        Object.values(this.vehicleDatabase.autos).forEach(category => {
            allAutos.push(...category);
        });
        return allAutos;
    }

    /**
     * Obtiene todas las camionetas
     * @returns {Array} Array de todas las camionetas
     */
    static getAllCamionetasByType() {
        const allCamionetas = [];
        Object.values(this.vehicleDatabase.camionetas).forEach(category => {
            allCamionetas.push(...category);
        });
        return allCamionetas;
    }

    /**
     * Busca un vehículo por ID
     * @param {string} vehicleId - ID del vehículo
     * @returns {Object|null} Vehículo encontrado o null
     */
    static findVehicleById(vehicleId) {
        let foundVehicle = null;
        Object.values(this.vehicleDatabase).forEach(type => {
            Object.values(type).forEach(category => {
                const vehicle = category.find(v => v.id === vehicleId);
                if (vehicle) foundVehicle = vehicle;
            });
        });
        return foundVehicle;
    }

    /**
     * Filtra vehículos por distintivo
     * @param {Array} vehicles - Array de vehículos
     * @param {string} badgeType - Tipo de distintivo ('popular' o 'cheap')
     * @returns {Array} Array de vehículos filtrados
     */
    static filterByBadge(vehicles, badgeType) {
        return vehicles.filter(vehicle => vehicle.badge === badgeType);
    }

    /**
     * Busca vehículos por texto
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise<Array>} Array de vehículos que coinciden
     */
    static async searchVehicles(searchTerm) {
        return new Promise(resolve => {
            setTimeout(() => {
                const allVehicles = [];
                Object.values(this.vehicleDatabase).forEach(type => {
                    Object.values(type).forEach(category => {
                        allVehicles.push(...category);
                    });
                });

                const filtered = allVehicles.filter(vehicle => 
                    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vehicle.description.toLowerCase().includes(searchTerm.toLowerCase())
                );

                resolve(filtered);
            }, 200);
        });
    }

    /**
     * Envía formulario de contacto
     * @param {Object} contactData - Datos del formulario
     * @returns {Promise<Object>} Resultado del envío
     */
    static async submitContactForm(contactData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Simular validación
                    if (!contactData.name || !contactData.email || !contactData.phone) {
                        throw new Error('Datos requeridos faltantes');
                    }

                    // Simular envío exitoso
                    const result = {
                        success: true,
                        id: Date.now(),
                        message: 'Consulta enviada exitosamente',
                        timestamp: new Date().toISOString()
                    };

                    console.log('Formulario enviado:', contactData);
                    resolve(result);
                } catch (error) {
                    reject({
                        success: false,
                        error: error.message,
                        timestamp: new Date().toISOString()
                    });
                }
            }, 500);
        });
    }

    /**
     * Obtiene estadísticas de vehículos
     * @returns {Promise<Object>} Estadísticas del catálogo
     */
    static async getVehicleStats() {
        return new Promise(resolve => {
            setTimeout(() => {
                const allVehicles = [];
                Object.values(this.vehicleDatabase).forEach(type => {
                    Object.values(type).forEach(category => {
                        allVehicles.push(...category);
                    });
                });

                const stats = {
                    total: allVehicles.length,
                    autos: Object.values(this.vehicleDatabase.autos).flat().length,
                    camionetas: Object.values(this.vehicleDatabase.camionetas).flat().length,
                    popular: allVehicles.filter(v => v.badge === 'popular').length,
                    cheap: allVehicles.filter(v => v.badge === 'cheap').length,
                    categories: {
                        hatch: this.vehicleDatabase.autos.hatch.length,
                        sedan: this.vehicleDatabase.autos.sedan.length,
                        coupe: this.vehicleDatabase.autos.coupe.length,
                        suv: this.vehicleDatabase.camionetas.suv.length,
                        pickup: this.vehicleDatabase.camionetas.pickup.length,
                        furgon: this.vehicleDatabase.camionetas.furgon.length
                    }
                };

                resolve(stats);
            }, 100);
        });
    }

    /**
     * Configura endpoint base para API
     * @param {string} baseUrl - URL base de la API
     */
    static setApiBaseUrl(baseUrl) {
        this.apiBaseUrl = baseUrl;
    }

    /**
     * Método genérico para llamadas a API
     * @param {string} endpoint - Endpoint de la API
     * @param {Object} options - Opciones de fetch
     * @returns {Promise<Object>} Respuesta de la API
     */
    static async apiCall(endpoint, options = {}) {
        if (!this.apiBaseUrl) {
            throw new Error('API base URL no configurada');
        }

        const url = `${this.apiBaseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VehicleService;
} else {
    window.VehicleService = VehicleService;
}
