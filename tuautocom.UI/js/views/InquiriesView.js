/**
 * InquiriesView
 * Vista educativa para visualizar consultas desde MongoDB
 * Colección: reservas (tuautocom.reservas)
 * 
 * @class
 */

import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { inquiryService } from '../services/inquiryService.js';

export class InquiriesView {
  constructor() {
    this.inquiries = [];
  }

  /**
   * Inicializa la vista cargando datos desde MongoDB
   * Operación: Reservation.find()
   * @async
   */
  async init() {
    try {
      // Cargando consultas desde MongoDB (Reservation.find())
      this.inquiries = await inquiryService.getAll();
    } catch (error) {
      console.error('❌ Error al cargar desde MongoDB:', error);
      this.inquiries = [];
    }
  }

  /**
   * Renderiza la vista completa
   * @returns {HTMLElement}
   */
  render() {
    const view = document.createElement('div');
    view.className = 'min-h-screen bg-primary-dark';

    // Header (sin buscador - vista de solo visualización)
    const header = new Header({ showSearch: false });
    view.appendChild(header.render());

    // Contenido principal
    const main = document.createElement('main');
    main.className = 'w-full max-w-7xl mx-auto px-5 py-10';

    // Cabecera informativa
    const headerInfo = this._renderHeaderInfo();
    main.appendChild(headerInfo);

    // Lista de consultas
    const list = this._renderInquiriesList();
    main.appendChild(list);

    view.appendChild(main);

    // Footer
    const footer = new Footer();
    view.appendChild(footer.render());

    return view;
  }

  /**
   * Renderiza información de la colección MongoDB
   * @private
   * @returns {HTMLElement}
   */
  _renderHeaderInfo() {
    const container = document.createElement('div');
    container.className = 'mb-8';

    // Título y descripción
    const titleSection = document.createElement('div');
    titleSection.className = 'mb-6';
    titleSection.innerHTML = `
      <h1 class="text-white text-4xl font-bold mb-3">
        📋 Consultas de Vehículos
      </h1>
      <p class="text-primary-light text-lg">
        Visualización de datos almacenados en MongoDB Atlas
      </p>
    `;
    container.appendChild(titleSection);

    // Info de MongoDB - usando paleta del tema
    const mongoInfo = document.createElement('div');
    mongoInfo.className = 'bg-primary-medium border-l-4 border-primary-light rounded-lg p-6 shadow-lg';
    mongoInfo.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p class="text-primary-light text-sm font-semibold mb-2">Cluster</p>
          <p class="text-white font-mono text-sm break-all">tuautocom.3qgpazz.mongodb.net</p>
        </div>
        <div>
          <p class="text-primary-light text-sm font-semibold mb-2">Base de Datos</p>
          <p class="text-white font-mono text-sm">tuautocom</p>
        </div>
        <div>
          <p class="text-primary-light text-sm font-semibold mb-2">Colección</p>
          <p class="text-white font-mono text-sm">reservas</p>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-primary-light/40">
        <p class="text-white text-base">
          <span class="text-primary-light font-semibold">Documentos encontrados:</span> 
          <span class="font-bold text-xl ml-2">${this.inquiries.length}</span>
        </p>
      </div>
    `;
    container.appendChild(mongoInfo);

    return container;
  }

  /**
   * Renderiza lista de consultas
   * @private
   * @returns {HTMLElement}
   */
  _renderInquiriesList() {
    const container = document.createElement('div');
    container.className = 'space-y-4';

    if (this.inquiries.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 bg-primary-medium rounded-lg border-2 border-dashed border-primary-light/40 shadow-lg">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-white text-xl font-semibold mb-3">No hay consultas registradas</p>
          <p class="text-primary-light text-sm mb-2">
            La colección <span class="font-mono font-semibold">reservas</span> está vacía
          </p>
          <p class="text-primary-light/80 text-sm">
            Los documentos aparecerán aquí cuando se envíe el formulario de contacto
          </p>
        </div>
      `;
      return container;
    }

    // Título de la sección
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'text-white text-2xl font-bold mb-4 mt-8';
    sectionTitle.textContent = `📄 Documentos (${this.inquiries.length})`;
    container.appendChild(sectionTitle);

    // Ordenar por fecha más reciente primero
    const sorted = [...this.inquiries].sort((a, b) => 
      new Date(b.createdAt || b.reservationDate) - new Date(a.createdAt || a.reservationDate)
    );

    sorted.forEach((inquiry, index) => {
      const card = this._renderInquiryCard(inquiry, index + 1);
      container.appendChild(card);
    });

    return container;
  }

  /**
   * Renderiza una tarjeta de consulta (documento MongoDB)
   * @private
   * @param {Object} inquiry - Documento de la colección reservas
   * @param {number} index - Índice del documento
   * @returns {HTMLElement}
   */
  _renderInquiryCard(inquiry, index) {
    const card = document.createElement('div');
    card.className = 'bg-primary-medium rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary-light/30 transition-all duration-300 border border-primary-light/20';

    const date = new Date(inquiry.createdAt || inquiry.reservationDate);
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    card.innerHTML = `
      <!-- Cabecera del documento -->
      <div class="bg-primary-dark px-6 py-4 border-b-2 border-primary-light/40">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-3">
            <span class="text-primary-light font-mono text-sm font-semibold">Documento #${index}</span>
            <span class="text-primary-light/50 text-xs">•</span>
            <span class="text-primary-light/90 font-mono text-xs">_id: ${inquiry._id}</span>
          </div>
          <span class="text-primary-light/80 text-sm font-medium">${formattedDate}</span>
        </div>
      </div>

      <!-- Contenido del documento -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Información del contacto -->
          <div class="space-y-4">
            <h3 class="text-white text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b border-primary-light/30">
              <span>👤</span> Información del Contacto
            </h3>
            
            <div class="space-y-3">
              <div>
                <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">authorFirstName</p>
                <p class="text-white font-medium text-base">${inquiry.authorFirstName}</p>
              </div>
              
              <div>
                <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">authorLastName</p>
                <p class="text-white font-medium text-base">${inquiry.authorLastName}</p>
              </div>
              
              <div>
                <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">email</p>
                <p class="text-white font-mono text-sm">${inquiry.email}</p>
              </div>
              
              <div>
                <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">phoneNumber</p>
                <p class="text-white font-mono text-sm">${inquiry.phoneNumber}</p>
              </div>
            </div>
          </div>

          <!-- Información de la consulta -->
          <div class="space-y-4">
            <h3 class="text-white text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b border-primary-light/30">
              <span>🚗</span> Detalles de la Consulta
            </h3>
            
            <div class="space-y-3">
              ${inquiry.vehicleTitle ? `
                <div>
                  <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">vehicleTitle</p>
                  <p class="text-white font-medium text-base">${inquiry.vehicleTitle}</p>
                </div>
              ` : ''}
              
              ${inquiry.vehicleId ? `
                <div>
                  <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">vehicleId</p>
                  <p class="text-white font-mono text-sm">${inquiry.vehicleId}</p>
                </div>
              ` : ''}
              
              <div>
                <p class="text-primary-light text-xs font-mono font-semibold mb-1.5">reservationDate</p>
                <p class="text-white font-mono text-sm">${new Date(inquiry.reservationDate).toLocaleDateString('es-ES')}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje (si existe) -->
        ${inquiry.message ? `
          <div class="mt-6 pt-6 border-t-2 border-primary-light/30">
            <p class="text-primary-light text-xs font-mono font-semibold mb-3">message</p>
            <div class="bg-primary-dark rounded-lg p-4 border border-primary-light/20">
              <p class="text-white text-sm leading-relaxed">${inquiry.message}</p>
            </div>
          </div>
        ` : ''}

        <!-- Metadatos del documento -->
        <div class="mt-6 pt-6 border-t-2 border-primary-light/30">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">📊</span>
            <p class="text-primary-light text-xs font-mono font-semibold">Metadatos MongoDB</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-primary-dark rounded-lg px-4 py-3 border border-primary-light/20">
              <p class="text-primary-light text-xs font-mono font-semibold mb-2">createdAt</p>
              <p class="text-white text-xs font-mono">${inquiry.createdAt ? new Date(inquiry.createdAt).toISOString() : 'N/A'}</p>
            </div>
            <div class="bg-primary-dark rounded-lg px-4 py-3 border border-primary-light/20">
              <p class="text-primary-light text-xs font-mono font-semibold mb-2">updatedAt</p>
              <p class="text-white text-xs font-mono">${inquiry.updatedAt ? new Date(inquiry.updatedAt).toISOString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  /**
   * Destruye la vista y limpia recursos
   */
  destroy() {
    this.inquiries = [];
  }
}
