/**
 * AnalyticsService
 * Servicio para tracking y análisis de interacciones del usuario
 */
class AnalyticsService {
    static events = [];
    static sessionId = null;
    static userId = null;

    /**
     * Inicializa el servicio de analytics
     * @param {Object} config - Configuración del servicio
     */
    static init(config = {}) {
        this.sessionId = this.generateSessionId();
        this.userId = config.userId || this.generateUserId();
        this.trackingEnabled = config.enabled !== false;
        
        if (this.trackingEnabled) {
            this.trackPageLoad();
            this.setupEventListeners();
        }
    }

    /**
     * Genera un ID único de sesión
     * @returns {string} ID de sesión
     */
    static generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Genera un ID único de usuario
     * @returns {string} ID de usuario
     */
    static generateUserId() {
        let userId = localStorage.getItem('autocatalog_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('autocatalog_user_id', userId);
        }
        return userId;
    }

    /**
     * Configura listeners de eventos globales
     */
    static setupEventListeners() {
        // Track clicks en enlaces
        document.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                this.trackLinkClick(event.target.href, event.target.textContent);
            }
        });

        // Track tiempo en página
        window.addEventListener('beforeunload', () => {
            this.trackTimeOnPage();
        });

        // Track errores JavaScript
        window.addEventListener('error', (event) => {
            this.trackError(event.error);
        });
    }

    /**
     * Registra un evento genérico
     * @param {string} eventName - Nombre del evento
     * @param {Object} properties - Propiedades del evento
     */
    static trackEvent(eventName, properties = {}) {
        if (!this.trackingEnabled) return;

        const event = {
            id: this.generateEventId(),
            name: eventName,
            properties: {
                ...properties,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId,
                userId: this.userId,
                userAgent: navigator.userAgent,
                url: window.location.href,
                referrer: document.referrer
            }
        };

        this.events.push(event);
        this.sendEventToBackend(event);
        
        console.log('Analytics Event:', event);
    }

    /**
     * Registra vista de vehículo
     * @param {string} vehicleId - ID del vehículo
     * @param {Object} vehicleData - Datos del vehículo
     */
    static trackVehicleView(vehicleId, vehicleData = {}) {
        this.trackEvent('vehicle_view', {
            vehicleId,
            vehicleName: vehicleData.name,
            vehicleCategory: vehicleData.category,
            vehicleType: vehicleData.type,
            vehiclePrice: vehicleData.price,
            vehicleBadge: vehicleData.badge
        });
    }

    /**
     * Registra envío de formulario de contacto
     * @param {string} vehicleId - ID del vehículo consultado
     * @param {Object} formData - Datos del formulario
     */
    static trackContactFormSubmission(vehicleId, formData = {}) {
        this.trackEvent('contact_form_submission', {
            vehicleId,
            hasName: !!formData.name,
            hasEmail: !!formData.email,
            hasPhone: !!formData.phone,
            messageLength: formData.message ? formData.message.length : 0
        });
    }

    /**
     * Registra navegación por categorías
     * @param {string} type - Tipo de vehículo
     * @param {string} category - Categoría específica
     */
    static trackCategoryNavigation(type, category) {
        this.trackEvent('category_navigation', {
            vehicleType: type,
            category: category
        });
    }

    /**
     * Registra uso de filtros
     * @param {string} filterType - Tipo de filtro aplicado
     * @param {string} filterValue - Valor del filtro
     */
    static trackFilterUsage(filterType, filterValue) {
        this.trackEvent('filter_usage', {
            filterType,
            filterValue
        });
    }

    /**
     * Registra búsquedas
     * @param {string} searchTerm - Término de búsqueda
     * @param {number} resultsCount - Número de resultados
     */
    static trackSearch(searchTerm, resultsCount) {
        this.trackEvent('search', {
            searchTerm,
            resultsCount,
            searchTermLength: searchTerm.length
        });
    }

    /**
     * Registra clicks en enlaces
     * @param {string} url - URL del enlace
     * @param {string} text - Texto del enlace
     */
    static trackLinkClick(url, text) {
        this.trackEvent('link_click', {
            url,
            linkText: text,
            isExternal: !url.includes(window.location.hostname)
        });
    }

    /**
     * Registra carga de página
     */
    static trackPageLoad() {
        this.pageLoadTime = Date.now();
        this.trackEvent('page_load', {
            path: window.location.pathname,
            title: document.title,
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart
        });
    }

    /**
     * Registra tiempo en página
     */
    static trackTimeOnPage() {
        if (this.pageLoadTime) {
            const timeOnPage = Date.now() - this.pageLoadTime;
            this.trackEvent('time_on_page', {
                duration: timeOnPage,
                path: window.location.pathname
            });
        }
    }

    /**
     * Registra errores
     * @param {Error} error - Error ocurrido
     */
    static trackError(error) {
        this.trackEvent('javascript_error', {
            message: error.message,
            stack: error.stack,
            fileName: error.fileName,
            lineNumber: error.lineNumber
        });
    }

    /**
     * Registra rendimiento
     * @param {string} metricName - Nombre de la métrica
     * @param {number} value - Valor de la métrica
     */
    static trackPerformance(metricName, value) {
        this.trackEvent('performance_metric', {
            metricName,
            value,
            unit: 'milliseconds'
        });
    }

    /**
     * Genera ID único para eventos
     * @returns {string} ID del evento
     */
    static generateEventId() {
        return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Envía evento al backend
     * @param {Object} event - Evento a enviar
     */
    static async sendEventToBackend(event) {
        try {
            // En producción, esto enviaría datos a un servicio de analytics real
            // Por ahora solo simula el envío
            if (this.apiEndpoint) {
                await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(event)
                });
            }
        } catch (error) {
            console.warn('Failed to send analytics event:', error);
        }
    }

    /**
     * Obtiene estadísticas de eventos
     * @returns {Object} Estadísticas de analytics
     */
    static getAnalyticsStats() {
        const stats = {
            totalEvents: this.events.length,
            sessionId: this.sessionId,
            userId: this.userId,
            eventTypes: {},
            recentEvents: this.events.slice(-10)
        };

        // Contar eventos por tipo
        this.events.forEach(event => {
            stats.eventTypes[event.name] = (stats.eventTypes[event.name] || 0) + 1;
        });

        return stats;
    }

    /**
     * Exporta datos de analytics
     * @returns {Array} Array de todos los eventos
     */
    static exportData() {
        return {
            events: this.events,
            sessionId: this.sessionId,
            userId: this.userId,
            exportDate: new Date().toISOString()
        };
    }

    /**
     * Limpia datos de analytics
     */
    static clearData() {
        this.events = [];
        localStorage.removeItem('autocatalog_user_id');
        this.userId = this.generateUserId();
    }

    /**
     * Configura endpoint de API para analytics
     * @param {string} endpoint - URL del endpoint
     */
    static setApiEndpoint(endpoint) {
        this.apiEndpoint = endpoint;
    }

    /**
     * Habilita o deshabilita el tracking
     * @param {boolean} enabled - Estado del tracking
     */
    static setTrackingEnabled(enabled) {
        this.trackingEnabled = enabled;
        
        if (enabled) {
            this.setupEventListeners();
        }
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsService;
} else {
    window.AnalyticsService = AnalyticsService;
}
