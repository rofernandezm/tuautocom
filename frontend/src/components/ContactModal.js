/**
 * ContactModal Component
 * Maneja el modal de contacto para consultas de vehículos
 */
class ContactModal {
    constructor() {
        this.selectedVehicle = null;
        this.isOpen = false;
    }

    /**
     * Renderiza el modal de contacto
     * @returns {string} HTML del modal
     */
    render() {
        return `
            <div id="contactModal" class="fixed inset-0 z-50 hidden">
                <div class="modal-backdrop fixed inset-0" onclick="CatalogApp.modal.closeModal()"></div>
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-95 opacity-0" id="modalContent">
                        <div class="p-6">
                            <!-- Modal Header -->
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-2xl font-bold text-gray-900">Consultar Vehículo</h3>
                                <button onclick="CatalogApp.modal.closeModal()" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <!-- Vehicle Info -->
                            <div id="modalVehicleInfo" class="bg-gray-50 rounded-lg p-4 mb-6">
                                <!-- Vehicle info será poblado por JavaScript -->
                            </div>

                            <!-- Contact Form -->
                            <form id="contactForm" onsubmit="CatalogApp.modal.submitContactForm(event)">
                                <div class="space-y-4">
                                    <div>
                                        <label for="contactName" class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                                        <input type="text" id="contactName" name="name" required 
                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                               placeholder="Tu nombre completo">
                                    </div>
                                    
                                    <div>
                                        <label for="contactEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" id="contactEmail" name="email" required 
                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                               placeholder="tu@email.com">
                                    </div>
                                    
                                    <div>
                                        <label for="contactPhone" class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                        <input type="tel" id="contactPhone" name="phone" required 
                                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                               placeholder="+1 234 567 8900">
                                    </div>
                                    
                                    <div>
                                        <label for="contactMessage" class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                                        <textarea id="contactMessage" name="message" rows="4" required 
                                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                                                  placeholder="Cuéntanos sobre tu interés en este vehículo..."></textarea>
                                    </div>
                                </div>

                                <div class="mt-6 flex gap-3">
                                    <button type="button" onclick="CatalogApp.modal.closeModal()" 
                                            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        Cancelar
                                    </button>
                                    <button type="submit" 
                                            class="flex-1 px-6 py-3 btn-primary text-white rounded-lg font-medium">
                                        Enviar Consulta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Abre el modal de contacto para un vehículo específico
     * @param {string} vehicleId - ID del vehículo
     */
    openContactModal(vehicleId) {
        // Buscar vehículo por ID
        this.selectedVehicle = VehicleService.findVehicleById(vehicleId);
        
        if (!this.selectedVehicle) return;
        
        // Actualizar contenido del modal
        this.updateModalContent();
        
        // Mostrar modal
        const modal = document.getElementById('contactModal');
        const modalContent = document.getElementById('modalContent');
        
        modal.classList.remove('hidden');
        this.isOpen = true;
        
        // Animar modal
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
        
        // Focus en primer input
        setTimeout(() => {
            document.getElementById('contactName').focus();
        }, 300);

        // Trackear vista
        AnalyticsService.trackVehicleView(vehicleId);
    }

    /**
     * Cierra el modal de contacto
     */
    closeModal() {
        const modal = document.getElementById('contactModal');
        const modalContent = document.getElementById('modalContent');
        
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.getElementById('contactForm').reset();
            this.isOpen = false;
        }, 300);
    }

    /**
     * Actualiza el contenido del modal con la información del vehículo
     */
    updateModalContent() {
        if (!this.selectedVehicle) return;

        document.getElementById('modalVehicleInfo').innerHTML = `
            <div class="flex items-center">
                <div class="text-3xl mr-4">${this.selectedVehicle.emoji}</div>
                <div>
                    <h4 class="font-semibold text-gray-900">${this.selectedVehicle.name}</h4>
                    <p class="text-sm text-gray-600">${this.selectedVehicle.price}</p>
                </div>
            </div>
        `;
    }

    /**
     * Maneja el envío del formulario de contacto
     * @param {Event} event - Evento del formulario
     */
    async submitContactForm(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const contactData = {
            vehicle: this.selectedVehicle,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        try {
            // Enviar datos a través del servicio
            await VehicleService.submitContactForm(contactData);
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage();
            this.closeModal();

            // Trackear envío
            AnalyticsService.trackContactFormSubmission(this.selectedVehicle.id);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            // Aquí podrías mostrar un mensaje de error
        }
    }

    /**
     * Muestra mensaje de éxito
     */
    showSuccessMessage() {
        const successMsg = document.getElementById('successMessage');
        successMsg.classList.remove('hidden');
        
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 4000);
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactModal;
} else {
    window.ContactModal = ContactModal;
}
