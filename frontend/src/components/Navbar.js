/**
 * Navbar Component
 * Maneja la navegación principal del catálogo de vehículos
 */
class Navbar {
    constructor() {
        this.mobileMenuOpen = false;
    }

    /**
     * Renderiza el componente Navbar
     * @returns {string} HTML del navbar
     */
    render() {
        return `
            <nav class="bg-white navbar-shadow sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <div class="text-2xl font-bold text-gray-800">
                                🚗 <span class="text-indigo-600">AutoCatalog</span>
                            </div>
                        </div>

                        <!-- Navigation Menu -->
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-8">
                                <!-- Autos Dropdown -->
                                <div class="relative group">
                                    <button class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                                        Autos
                                        <svg class="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 slide-down">
                                        <div class="py-2">
                                            <a href="#" onclick="CatalogApp.showCategory('autos', 'hatch')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Hatch</a>
                                            <a href="#" onclick="CatalogApp.showCategory('autos', 'sedan')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Sedan</a>
                                            <a href="#" onclick="CatalogApp.showCategory('autos', 'coupe')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Coupé</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Camionetas Dropdown -->
                                <div class="relative group">
                                    <button class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                                        Camionetas
                                        <svg class="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 slide-down">
                                        <div class="py-2">
                                            <a href="#" onclick="CatalogApp.showCategory('camionetas', 'suv')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">SUV</a>
                                            <a href="#" onclick="CatalogApp.showCategory('camionetas', 'pickup')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Pickup</a>
                                            <a href="#" onclick="CatalogApp.showCategory('camionetas', 'furgon')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Furgón</a>
                                        </div>
                                    </div>
                                </div>

                                <button onclick="CatalogApp.showAllVehicles()" class="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                                    Ver Todos
                                </button>
                            </div>
                        </div>

                        <!-- Mobile menu button -->
                        <div class="md:hidden">
                            <button onclick="CatalogApp.navbar.toggleMobileMenu()" class="text-gray-700 hover:text-indigo-600 p-2">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div id="mobileMenu" class="md:hidden hidden bg-white border-t">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        <div class="px-3 py-2 text-sm font-medium text-gray-900">Autos</div>
                        <a href="#" onclick="CatalogApp.showCategory('autos', 'hatch')" class="block px-6 py-2 text-sm text-gray-700">Hatch</a>
                        <a href="#" onclick="CatalogApp.showCategory('autos', 'sedan')" class="block px-6 py-2 text-sm text-gray-700">Sedan</a>
                        <a href="#" onclick="CatalogApp.showCategory('autos', 'coupe')" class="block px-6 py-2 text-sm text-gray-700">Coupé</a>
                        
                        <div class="px-3 py-2 text-sm font-medium text-gray-900 mt-4">Camionetas</div>
                        <a href="#" onclick="CatalogApp.showCategory('camionetas', 'suv')" class="block px-6 py-2 text-sm text-gray-700">SUV</a>
                        <a href="#" onclick="CatalogApp.showCategory('camionetas', 'pickup')" class="block px-6 py-2 text-sm text-gray-700">Pickup</a>
                        <a href="#" onclick="CatalogApp.showCategory('camionetas', 'furgon')" class="block px-6 py-2 text-sm text-gray-700">Furgón</a>
                        
                        <button onclick="CatalogApp.showAllVehicles()" class="block w-full text-left px-3 py-2 text-sm text-gray-700 mt-4">Ver Todos</button>
                    </div>
                </div>
            </nav>
        `;
    }

    /**
     * Alterna la visibilidad del menú móvil
     */
    toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    }

    /**
     * Cierra el menú móvil
     */
    closeMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.add('hidden');
        this.mobileMenuOpen = false;
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navbar;
} else {
    window.Navbar = Navbar;
}
