/**
 * CamionetasPage - Página de catálogo de camionetas
 * Maneja la visualización de camionetas por categoría
 */
class CamionetasPage {
    constructor() {
        this.currentCategory = null;
        this.vehicles = [];
    }

    /**
     * Renderiza la página de camionetas
     * @param {string} category - Categoría de camionetas ('suv', 'pickup', 'furgon')
     * @returns {string} HTML de la página
     */
    render(category = null) {
        this.currentCategory = category;
        
        if (category) {
            this.vehicles = VehicleService.getVehiclesByCategory('camionetas', category);
        } else {
            this.vehicles = VehicleService.getAllCamionetasByType();
        }

        return `
            <div class="camionetas-page">
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
            suv: {
                title: 'SUVs',
                subtitle: 'Versatilidad y comodidad para toda aventura'
            },
            pickup: {
                title: 'Pickups',
                subtitle: 'Potencia y capacidad para el trabajo y la aventura'
            },
            furgon: {
                title: 'Furgones',
                subtitle: 'Soluciones comerciales y de transporte'
            }
        };

        const config = this.currentCategory ? 
            titles[this.currentCategory] : 
            { title: 'Catálogo de Camionetas', subtitle: 'Descubre nuestra selección completa de camionetas y utilitarios' };

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
                <button onclick="CatalogApp.camionetasPage.showAllCamionetas()" 
                        class="px-6 py-2 ${!this.currentCategory ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'} rounded-full hover:bg-indigo-200 transition-colors duration-200">
                    Todas las Camionetas
                </button>
                <button onclick="CatalogApp.showCategory('camionetas', 'suv')" 
                        class="px-6 py-2 ${this.currentCategory === 'suv' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    SUVs
                </button>
                <button onclick="CatalogApp.showCategory('camionetas', 'pickup')" 
                        class="px-6 py-2 ${this.currentCategory === 'pickup' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    Pickups
                </button>
                <button onclick="CatalogApp.showCategory('camionetas', 'furgon')" 
                        class="px-6 py-2 ${this.currentCategory === 'furgon' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-full hover:bg-gray-200 transition-colors duration-200">
                    Furgones
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
                <div class="text-6xl mb-4">🚙</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron camionetas</h3>
                <p class="text-gray-600">Intenta con otra categoría o filtro</p>
            </div>
        `;
    }

    /**
     * Muestra todas las camionetas
     */
    showAllCamionetas() {
        this.currentCategory = null;
        this.vehicles = VehicleService.getAllCamionetasByType();
        this.updatePage();
    }

    /**
     * Muestra camionetas por categoría
     * @param {string} category - Categoría de camionetas
     */
    showCategory(category) {
        this.currentCategory = category;
        this.vehicles = VehicleService.getVehiclesByCategory('camionetas', category);
        this.updatePage();
    }

    /**
     * Actualiza la página con los vehículos actuales
     */
    updatePage() {
        const container = document.querySelector('.camionetas-page') || document.getElementById('vehicleGrid').parentNode;
        container.innerHTML = this.render(this.currentCategory);
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CamionetasPage;
} else {
    window.CamionetasPage = CamionetasPage;
}
