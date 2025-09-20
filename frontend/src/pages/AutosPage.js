/**
 * AutosPage - Página de catálogo de autos
 * Maneja la visualización de autos por categoría
 */
class AutosPage {
    constructor() {
        this.currentCategory = null;
        this.vehicles = [];
    }

    /**
     * Renderiza la página de autos
     * @param {string} category - Categoría de autos ('hatch', 'sedan', 'coupe')
     * @returns {string} HTML de la página
     */
    render(category = null) {
        this.currentCategory = category;
        
        if (category) {
            this.vehicles = VehicleService.getVehiclesByCategory('autos', category);
        } else {
            this.vehicles = VehicleService.getAllAutosByType();
        }

        return `
            <div class="autos-page">
                ${this.renderHeader()}
                ${this.renderFilters()}
                ${this.renderVehicleGrid()}
                ${this.renderEmptyState()}
            </div>
        `;
    }

    /**
     * Renderiza el header de la página
     * @returns {string} HTML del header
     */
    renderHeader() {
        const titles = {
            hatch: {
                title: 'Hatchbacks',
                subtitle: 'Autos compactos y versátiles para la ciudad'
            },
            sedan: {
                title: 'Sedanes',
                subtitle: 'Elegancia y confort para toda la familia'
            },
            coupe: {
                title: 'Coupés',
                subtitle: 'Deportividad y estilo en cada curva'
            }
        };

        const config = this.currentCategory ? 
            titles[this.currentCategory] : 
            { title: 'Catálogo de Autos', subtitle: 'Descubre nuestra selección completa de automóviles' };

        return `
            <div class="text-center mb-12 fade-in">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">${config.title}</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">${config.subtitle}</p>
            </div>
        `;
    }

    /**
     * Renderiza los filtros de la página
     * @returns {string} HTML de los filtros
     */
    renderFilters() {
        return `
            <div class="mb-8 flex flex-wrap gap-4 justify-center">
                <button onclick="CatalogApp.autosPage.showAllAutos()" 
                        class="px-6 py-2 ${!this.currentCategory ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'} rounded-full hover:bg-indigo-200 transition-colors duration-200">
                    Todos los Autos
                </button>
                <button onclick="CatalogApp.showCategory('autos', 'hatch')" 
                        class="px-6 py-2 ${this.currentCategory === 'hatch' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    Hatchbacks
                </button>
                <button onclick="CatalogApp.showCategory('autos', 'sedan')" 
                        class="px-6 py-2 ${this.currentCategory === 'sedan' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    Sedanes
                </button>
                <button onclick="CatalogApp.showCategory('autos', 'coupe')" 
                        class="px-6 py-2 ${this.currentCategory === 'coupe' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    Coupés
                </button>
                <button onclick="CatalogApp.filterByBadge('popular')" 
                        class="px-6 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200">
                    Más Vistos
                </button>
                <button onclick="CatalogApp.filterByBadge('cheap')" 
                        class="px-6 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200">
                    Más Baratos
                </button>
            </div>
        `;
    }

    /**
     * Renderiza la grilla de vehículos
     * @returns {string} HTML de la grilla
     */
    renderVehicleGrid() {
        if (!this.vehicles || this.vehicles.length === 0) {
            return '<div id="vehicleGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"></div>';
        }

        const vehicleCards = this.vehicles.map(vehicle => VehicleCard.render(vehicle)).join('');
        
        return `
            <div id="vehicleGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${vehicleCards}
            </div>
        `;
    }

    /**
     * Renderiza el estado vacío
     * @returns {string} HTML del estado vacío
     */
    renderEmptyState() {
        const isHidden = this.vehicles && this.vehicles.length > 0 ? 'hidden' : '';
        
        return `
            <div id="emptyState" class="${isHidden} text-center py-16">
                <div class="text-6xl mb-4">🚗</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron autos</h3>
                <p class="text-gray-600">Intenta con otra categoría o filtro</p>
            </div>
        `;
    }

    /**
     * Muestra todos los autos
     */
    showAllAutos() {
        this.currentCategory = null;
        this.vehicles = VehicleService.getAllAutosByType();
        this.updatePage();
    }

    /**
     * Muestra autos por categoría
     * @param {string} category - Categoría de autos
     */
    showCategory(category) {
        this.currentCategory = category;
        this.vehicles = VehicleService.getVehiclesByCategory('autos', category);
        this.updatePage();
    }

    /**
     * Actualiza la página con los vehículos actuales
     */
    updatePage() {
        const container = document.querySelector('.autos-page') || document.getElementById('vehicleGrid').parentNode;
        container.innerHTML = this.render(this.currentCategory);
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutosPage;
} else {
    window.AutosPage = AutosPage;
}
