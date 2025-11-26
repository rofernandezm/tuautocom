/**
 * AdminVehicleFormView
 * Vista de administración para agregar/editar vehículos
 * Implementación del diseño "Cargar Vehículo (Administración)" de Stitch
 * 
 * @class
 * @param {string|null} vehicleId - ID del vehículo a editar (null para crear nuevo)
 */

import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';
import { vehicleService } from '../services/vehicleService.js';
import { catalogService } from '../services/catalogService.js';

export class AdminVehicleFormView {
  constructor(vehicleId = null) {
    this.vehicleId = vehicleId;
    this.vehicle = null;
    this.selectedImages = [];
    this.catalogs = {
      brands: [],
      categories: [],
      fuels: [],
      transmissions: [],
      colors: [],
      tractions: []
    };
  }

  /**
   * Inicializa la vista
   * Si hay vehicleId, carga los datos del vehículo
   * @async
   */
  async init() {
    // Cargar catálogos desde backend
    try {
      const [brands, categories, fuels, transmissions, colors, tractions] = await Promise.all([
        catalogService.getBrands(),
        catalogService.getCategories(),
        catalogService.getFuels(),
        catalogService.getTransmissions(),
        catalogService.getColors(),
        catalogService.getItems('tractions')
      ]);

      this.catalogs.brands = brands;
      this.catalogs.categories = categories;
      this.catalogs.fuels = fuels;
      this.catalogs.transmissions = transmissions;
      this.catalogs.colors = colors;
      this.catalogs.tractions = tractions;
    } catch (error) {
      console.error('Error cargando catálogos:', error);
    }

    if (this.vehicleId) {
      // Modo edición - cargar datos
      try {
        this.vehicle = await vehicleService.getById(this.vehicleId);
        if (!this.vehicle) {
          console.error('Vehículo no encontrado');
          window.location.hash = '#catalog';
        }
      } catch (error) {
        console.error('Error cargando vehículo:', error);
      }
    }
  }

  /**
   * Renderiza la vista completa
   * @returns {HTMLElement}
   */
  render() {
    const view = document.createElement('div');
    view.className = 'min-h-screen bg-primary-dark';

    // Header
    const header = new Header();
    view.appendChild(header.render());

    // Contenido principal
    view.appendChild(this._renderContent());

    // Footer
    const footer = new Footer();
    view.appendChild(footer.render());

    return view;
  }

  /**
   * Renderiza el contenido principal del formulario
   * @private
   * @returns {HTMLElement}
   */
  _renderContent() {
    const content = document.createElement('div');
    content.className = 'px-4 md:px-40 flex flex-1 justify-center py-5';

    content.innerHTML = `
      <div class="flex flex-col w-full max-w-form-container-lg py-5">
        <!-- Título -->
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <p class="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            ${this.vehicleId ? 'Editar Vehículo' : 'Agregar Vehículo'}
          </p>
        </div>

        <!-- Formulario -->
        <form data-vehicle-form>
          <!-- Marca -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Marca</p>
              <select
                name="brand"
                required
                class="form-field-select"
                data-catalog="brands"
              >
                <option value="" disabled selected>Seleccione la marca</option>
                ${this._renderCatalogOptions('brands')}
              </select>
            </label>
          </div>

          <!-- Modelo -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Modelo</p>
              <input
                type="text"
                name="model"
                required
                placeholder="Ingrese el modelo"
                class="form-field-input"
                value="${this.vehicle?.model || ''}"
              />
            </label>
          </div>

          <!-- Año -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Año</p>
              <input
                type="number"
                name="year"
                required
                min="1900"
                max="${new Date().getFullYear() + 1}"
                placeholder="Ingrese el año"
                class="form-field-input"
                value="${this.vehicle?.year || ''}"
              />
            </label>
          </div>

          <!-- Precio -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Precio</p>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                placeholder="Ingrese el precio"
                class="form-field-input"
                value="${this.vehicle?.price || ''}"
              />
            </label>
          </div>

          <!-- Kilometraje -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Kilometraje (opcional)</p>
              <input
                type="number"
                name="mileage"
                min="0"
                placeholder="Ingrese el kilometraje"
                class="form-field-input"
                value="${this.vehicle?.mileage || ''}"
              />
            </label>
          </div>

          <!-- Combustible -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Combustible</p>
              <select
                name="fuel"
                required
                class="form-field-select"
                data-catalog="fuels"
              >
                <option value="" disabled selected>Seleccione el tipo de combustible</option>
                ${this._renderCatalogOptions('fuels')}
              </select>
            </label>
          </div>

          <!-- Categoría -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Categoría</p>
              <select
                name="category"
                required
                class="form-field-select"
                data-catalog="categories"
              >
                <option value="" disabled selected>Seleccione la categoría</option>
                ${this._renderCatalogOptions('categories')}
              </select>
            </label>
          </div>

          <!-- Subir Imágenes -->
          <div class="flex flex-col p-4">
            <div 
              class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-form-border px-6 py-14 cursor-pointer hover:border-form-border-focus transition-colors"
              data-image-dropzone
            >
              <div class="flex flex-col items-center gap-2">
                <p class="text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                  Subir Imágenes
                </p>
                <p class="text-white text-sm font-normal leading-normal text-center">
                  Arrastra y suelta imágenes aquí o haz clic para buscar
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                data-image-input
              />
            </div>
            <!-- Preview de imágenes seleccionadas -->
            <div class="flex flex-wrap gap-2 mt-4" data-image-preview></div>
          </div>

          <!-- Descripción -->
          <div class="form-field-container">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="form-label">Descripción</p>
              <textarea
                name="description"
                placeholder="Ingrese una descripción detallada del vehículo"
                class="form-field-textarea"
              >${this.vehicle?.description || ''}</textarea>
            </label>
          </div>

          <!-- Botones -->
          <div class="flex justify-stretch">
            <div class="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
              <button
                type="button"
                data-action="cancel"
                class="btn-secondary-lg"
              >
                <span class="truncate">Cancelar</span>
              </button>
              <button
                type="submit"
                class="btn-primary-lg"
              >
                <span class="truncate">Guardar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    this._attachEventListeners(content);
    return content;
  }

  /**
   * Renderiza las opciones de un catálogo
   * @private
   * @param {string} catalogType - Tipo de catálogo (brands, categories, etc.)
   * @returns {string} HTML de las opciones
   */
  _renderCatalogOptions(catalogType) {
    const items = this.catalogs[catalogType] || [];
    return items
      .map(item => `<option value="${item.id}">${item.label}</option>`)
      .join('');
  }

  /**
   * Adjunta event listeners al formulario
   * @private
   * @param {HTMLElement} content
   */
  _attachEventListeners(content) {
    const form = content.querySelector('[data-vehicle-form]');
    const cancelBtn = content.querySelector('[data-action="cancel"]');
    const dropzone = content.querySelector('[data-image-dropzone]');
    const imageInput = content.querySelector('[data-image-input]');

    // Submit del formulario
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleSubmit(form);
      });
    }

    // Botón cancelar
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
          window.location.hash = '#catalog';
        }
      });
    }

    // Drag & Drop de imágenes
    if (dropzone && imageInput) {
      // Click para abrir selector de archivos
      dropzone.addEventListener('click', () => {
        imageInput.click();
      });

      // Drag events
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-form-border-focus', 'bg-form-bg');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-form-border-focus', 'bg-form-bg');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-form-border-focus', 'bg-form-bg');
        
        const files = Array.from(e.dataTransfer.files).filter(file => 
          file.type.startsWith('image/')
        );
        
        this._handleImageFiles(files, content);
      });

      // File input change
      imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        this._handleImageFiles(files, content);
      });
    }
  }

  /**
   * Maneja los archivos de imagen seleccionados
   * @private
   * @param {File[]} files
   * @param {HTMLElement} content
   */
  _handleImageFiles(files, content) {
    this.selectedImages = [...this.selectedImages, ...files];
    this._renderImagePreviews(content);
  // Imágenes seleccionadas: manejar en upload flow
  }

  /**
   * Renderiza los previews de las imágenes seleccionadas
   * @private
   * @param {HTMLElement} content
   */
  _renderImagePreviews(content) {
    const previewContainer = content.querySelector('[data-image-preview]');
    if (!previewContainer) return;

    previewContainer.innerHTML = '';

    this.selectedImages.forEach((file, index) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const preview = document.createElement('div');
        preview.className = 'relative w-24 h-24 rounded-lg overflow-hidden border-2 border-form-border';
        preview.innerHTML = `
          <img 
            src="${e.target.result}" 
            alt="Preview ${index + 1}"
            class="w-full h-full object-cover"
          />
          <button
            type="button"
            data-remove-image="${index}"
            class="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        `;

        // Event listener para remover imagen
        const removeBtn = preview.querySelector('[data-remove-image]');
        removeBtn.addEventListener('click', () => {
          this.selectedImages.splice(index, 1);
          this._renderImagePreviews(content);
        });

        previewContainer.appendChild(preview);
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Maneja el envío del formulario
   * @private
   * @param {HTMLFormElement} form
   */
  async _handleSubmit(form) {
    // ⚠️ NO usar new FormData(form) porque incluiría el input file con nombres solamente
    // En su lugar, extraer campos manualmente
    
    // Extraer valores del formulario manualmente (sin el input file)
    const getBrandValue = () => form.querySelector('[name="brand"]').value;
    const getModelValue = () => form.querySelector('[name="model"]').value;
    const getYearValue = () => form.querySelector('[name="year"]').value;
    const getPriceValue = () => form.querySelector('[name="price"]').value;
    const getMileageValue = () => form.querySelector('[name="mileage"]').value;
    const getFuelValue = () => form.querySelector('[name="fuel"]').value;
    const getCategoryValue = () => form.querySelector('[name="category"]').value;
    const getDescriptionValue = () => form.querySelector('[name="description"]').value;
    
    // Construir datos del vehículo (SIN imágenes - se enviarán aparte)
    // 📝 NOTA: Las imágenes se envían vía multer en FormData, no en JSON
    const vehicleData = {
      title: `${getBrandValue()} ${getModelValue()} ${getYearValue()}`,
      description: getDescriptionValue(),
      category: getCategoryValue(),
      brand: getBrandValue(),
      model: getModelValue(),
      year: parseInt(getYearValue(), 10),
      price: parseFloat(getPriceValue()),
      mileage: getMileageValue() ? parseInt(getMileageValue(), 10) : 0,
      specs: {
        fuel: getFuelValue(),
        transmission: 'Automática', // TODO: Agregar campo al formulario
        motor: '', // TODO: Agregar campo al formulario
        version: '', // TODO: Agregar campo al formulario
        color: '', // TODO: Agregar campo al formulario
        traction: '' // TODO: Agregar campo al formulario
      },
      condition: {
        use: !getMileageValue() || getMileageValue() === '0' ? 'new' : 'used',
        exterior: '', // TODO: Agregar campo al formulario
        interior: '', // TODO: Agregar campo al formulario
        mechanics: '' // TODO: Agregar campo al formulario
      },
      // NO incluir images aquí - se manejan vía multer en FormData
    };

  // Datos del vehículo preparados para envío
    
    try {
      // Obtener botón de submit para mostrar loading
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = this.vehicleId ? 'Actualizando...' : 'Guardando...';

      let result;
      
      if (this.vehicleId) {
        // Actualizar vehículo existente
  result = await vehicleService.update(this.vehicleId, vehicleData);
      } else {
        // 📝 NOTA EDUCATIVA: FormData permite enviar archivos junto con datos
        // Usamos multipart/form-data para enviar JSON + archivos binarios
        const uploadFormData = new FormData();
        
        // Agregar campos de datos del vehículo como JSON
        uploadFormData.append('data', JSON.stringify(vehicleData));
        
        // Agregar archivos de imágenes (multer los procesa automáticamente)
        this.selectedImages.forEach((file) => uploadFormData.append('images', file));
        
  result = await vehicleService.createWithFiles(uploadFormData);
      }

      // Redirigir al catálogo
      window.location.hash = '#catalog';
      
    } catch (error) {
      console.error('Error guardando vehículo:', error);
      
      // Restaurar botón
      const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = false;
      submitBtn.textContent = this.vehicleId ? 'Actualizar Vehículo' : 'Guardar Vehículo';
    }
  }

  /**
   * Destruye la vista
   */
  destroy() {
    // Limpiar referencias
    this.selectedImages = [];
  }
}
