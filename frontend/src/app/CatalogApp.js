/**
 * CatalogApp - Aplicación principal del catálogo
 * Coordina todos los componentes y servicios
 */
class CatalogApp {
    constructor() {
        // Inicializar componentes
        this.navbar = new Navbar();
        this.modal = new ContactModal();
        this.autosPage = new AutosPage();
        this.camionetasPage = new CamionetasPage();
        
        // Estado de la aplicación
        this.currentVehicles = [];
        this.currentPage = 'all';
        
        // Inicializar analytics
        AnalyticsService.init({ enabled: true });
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        this.renderComponents();
        await this.showAllVehicles();
        this.setupKeyboardNavigation();
    }

    /**
     * Renderiza los componentes principales
     */
    renderComponents() {
        // Renderizar navbar
        document.querySelector('nav').outerHTML = this.navbar.render();
        
        // Renderizar modal
        document.body.insertAdjacentHTML('beforeend', this.modal.render());
        
        // Renderizar mensaje de éxito
        document.body.insertAdjacentHTML('beforeend', `
            <div id="successMessage" class="fixed top-4 right-4 z-50 hidden">
                <div class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
                    <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>¡Consulta enviada exitosamente!</span>
                </div>
            </div>
        `);
    }

    /**
     * Muestra todos los vehículos
     */
    async showAllVehicles() {
        try {
            this.currentVehicles = await VehicleService.getAllVehicles();
            this.currentPage = 'all';
            this.updatePageTitle('Catálogo de Vehículos', 'Descubre nuestra amplia selección de autos y camionetas');
            this.renderVehicles(this.currentVehicles);
            
            // Analytics
            AnalyticsService.trackEvent('show_all_vehicles');
        } catch (error) {
            console.error('Error loading vehicles:', error);
        }
    }

    /**
     * Muestra vehículos por categoría
     * @param {string} type - Tipo de vehículo
     * @param {string} category - Categoría específica
     */
    showCategory(type, category) {
        this.currentVehicles = VehicleService.getVehiclesByCategory(type, category);
        this.currentPage = `${type}-${category}`;
        
        const categoryNames = {
            hatch: 'Hatchbacks',
            sedan: 'Sedanes',
            coupe: 'Coupés',
            suv: 'SUVs',
            pickup: 'Pickups',
            furgon: 'Furgones'
        };
        
        this.updatePageTitle(
            categoryNames[category], 
            `Explora nuestra selección de ${categoryNames[category].toLowerCase()}`
        );
        this.renderVehicles(this.currentVehicles);
        this.navbar.closeMobileMenu();
        
        // Analytics
        AnalyticsService.trackCategoryNavigation(type, category);
    }

    /**
     * Filtra vehículos por distintivo
     * @param {string} badgeType - Tipo de distintivo
     */
    filterByBadge(badgeType) {
        const filtered = VehicleService.filterByBadge(this.currentVehicles, badgeType);
        const badgeNames = {
            popular: 'Más Vistos',
            cheap: 'Más Baratos'
        };
        
        this.updatePageTitle(
            badgeNames[badgeType], 
            `Vehículos destacados en la categoría ${badgeNames[badgeType].toLowerCase()}`
        );
        this.renderVehicles(filtered);
        
        // Analytics
        AnalyticsService.trackFilterUsage('badge', badgeType);
    }

    /**
     * Actualiza el título de la página
     * @param {string} title - Título principal
     * @param {string} subtitle - Subtítulo
     */
    updatePageTitle(title, subtitle) {
        const titleEl = document.getElementById('pageTitle');
        const subtitleEl = document.getElementById('pageSubtitle');
        
        if (titleEl) titleEl.textContent = title;
        if (subtitleEl) subtitleEl.textContent = subtitle;
    }

    /**
     * Renderiza la grilla de vehículos
     * @param {Array} vehicles - Array de vehículos
     */
    renderVehicles(vehicles) {
        const grid = document.getElementById('vehicleGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (!vehicles || vehicles.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        
        const vehicleCards = vehicles.map(vehicle => VehicleCard.render(vehicle)).join('');
        grid.innerHTML = vehicleCards;
        
        // Aplicar animación escalonada
        const cards = grid.querySelectorAll('.card-hover');
        cards.forEach((card, index) => {
            card.classList.add('stagger-item');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    /**
     * Configura navegación por teclado
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.modal.closeModal();
                this.navbar.closeMobileMenu();
            }
        });
    }
}