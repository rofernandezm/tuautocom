/**
 * VehicleCard Component
 * Renderiza tarjetas individuales de vehículos con distintivos opcionales
 */
class VehicleCard {
    /**
     * Renderiza una tarjeta de vehículo
     * @param {Object} vehicle - Datos del vehículo
     * @returns {string} HTML de la tarjeta
     */
    static render(vehicle) {
        return `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover fade-in">
                <!-- Badge -->
                ${this.renderBadge(vehicle.badge)}
                
                <!-- Vehicle Image -->
                <div class="vehicle-image relative">
                    <div class="text-center">
                        <div class="text-6xl mb-2">${vehicle.emoji}</div>
                    </div>
                </div>
                
                <!-- Vehicle Info -->
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${vehicle.name}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${vehicle.description}</p>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-indigo-600">${vehicle.price}</span>
                        <button onclick="CatalogApp.modal.openContactModal('${vehicle.id}')" 
                                class="btn-primary text-white px-6 py-2 rounded-lg font-medium">
                            Consultar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza el distintivo del vehículo si existe
     * @param {string} badge - Tipo de distintivo ('popular' o 'cheap')
     * @returns {string} HTML del distintivo
     */
    static renderBadge(badge) {
        if (!badge) return '';
        
        const badgeConfig = {
            popular: {
                text: 'Más Visto',
                class: 'badge-popular'
            },
            cheap: {
                text: 'Más Barato',
                class: 'badge-cheap'
            }
        };

        const config = badgeConfig[badge];
        if (!config) return '';

        return `
            <div class="absolute top-4 right-4 z-10">
                <span class="px-3 py-1 text-xs font-semibold text-white rounded-full ${config.class}">
                    ${config.text}
                </span>
            </div>
        `;
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VehicleCard;
} else {
    window.VehicleCard = VehicleCard;
}
