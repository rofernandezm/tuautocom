/**
 * AppInitializer - Inicialización y funciones globales de la aplicación
 * Maneja la inicialización y expone funciones globales para compatibilidad
 */

// Crear instancia global de la aplicación
window.CatalogApp = null;

/**
 * Inicializa la aplicación cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
    window.CatalogApp = new CatalogApp();
    window.CatalogApp.init();
});

/**
 * Funciones globales para compatibilidad (legacy)
 * Estas funciones son llamadas desde elementos HTML con onclick
 */

/**
 * Muestra vehículos por categoría
 * @param {string} type - Tipo de vehículo (autos, camionetas)
 * @param {string} category - Categoría específica (hatch, sedan, suv, etc.)
 */
function showCategory(type, category) {
    if (window.CatalogApp) {
        window.CatalogApp.showCategory(type, category);
    }
}

/**
 * Muestra todos los vehículos
 */
function showAllVehicles() {
    if (window.CatalogApp) {
        window.CatalogApp.showAllVehicles();
    }
}

/**
 * Filtra vehículos por distintivo
 * @param {string} badgeType - Tipo de distintivo (popular, cheap)
 */
function filterByBadge(badgeType) {
    if (window.CatalogApp) {
        window.CatalogApp.filterByBadge(badgeType);
    }
}

/**
 * Alterna el menú móvil
 * Esta función es específica del navbar y debe ser manejada por el componente Navbar
 */
function toggleMobileMenu() {
    if (window.CatalogApp && window.CatalogApp.navbar) {
        window.CatalogApp.navbar.toggleMobileMenu();
    }
}

/**
 * Cierra el modal de contacto
 * Esta función es específica del modal y debe ser manejada por el componente ContactModal
 */
function closeModal() {
    if (window.CatalogApp && window.CatalogApp.modal) {
        window.CatalogApp.modal.closeModal();
    }
}

/**
 * Envía el formulario de contacto
 * @param {Event} event - Evento del formulario
 */
function submitContactForm(event) {
    if (window.CatalogApp && window.CatalogApp.modal) {
        window.CatalogApp.modal.submitContactForm(event);
    }
}

/**
 * Abre el modal de contacto para un vehículo específico
 * @param {string} vehicleId - ID del vehículo
 */
function openContactModal(vehicleId) {
    if (window.CatalogApp && window.CatalogApp.modal) {
        // Buscar el vehículo en los datos actuales
        const vehicle = window.CatalogApp.currentVehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            window.CatalogApp.modal.openModal(vehicle);
        }
    }
}