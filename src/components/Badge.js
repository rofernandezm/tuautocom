/**
 * Badge Component
 * Maneja los distintivos de vehículos (Más vistos, Más baratos)
 */
class Badge {
    /**
     * Configuración de distintivos disponibles
     */
    static config = {
        popular: {
            text: 'Más Visto',
            class: 'badge-popular',
            bgGradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
        },
        cheap: {
            text: 'Más Barato',
            class: 'badge-cheap',
            bgGradient: 'linear-gradient(135deg, #26de81, #20bf6b)'
        }
    };

    /**
     * Renderiza un distintivo
     * @param {string} type - Tipo de distintivo ('popular' o 'cheap')
     * @param {Object} options - Opciones adicionales
     * @returns {string} HTML del distintivo
     */
    static render(type, options = {}) {
        if (!type || !this.config[type]) return '';

        const config = this.config[type];
        const {
            position = 'top-4 right-4',
            size = 'text-xs',
            customText = null
        } = options;

        return `
            <div class="absolute ${position} z-10">
                <span class="px-3 py-1 ${size} font-semibold text-white rounded-full ${config.class}">
                    ${customText || config.text}
                </span>
            </div>
        `;
    }

    /**
     * Renderiza múltiples distintivos
     * @param {Array} badges - Array de distintivos
     * @returns {string} HTML de los distintivos
     */
    static renderMultiple(badges) {
        if (!Array.isArray(badges) || badges.length === 0) return '';

        return badges.map((badge, index) => {
            const position = index === 0 ? 'top-4 right-4' : `top-${4 + (index * 10)} right-4`;
            return this.render(badge.type, { 
                ...badge.options, 
                position 
            });
        }).join('');
    }

    /**
     * Obtiene la configuración de un distintivo
     * @param {string} type - Tipo de distintivo
     * @returns {Object} Configuración del distintivo
     */
    static getConfig(type) {
        return this.config[type] || null;
    }

    /**
     * Verifica si un tipo de distintivo es válido
     * @param {string} type - Tipo de distintivo
     * @returns {boolean} True si es válido
     */
    static isValidType(type) {
        return type && this.config.hasOwnProperty(type);
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Badge;
} else {
    window.Badge = Badge;
}
