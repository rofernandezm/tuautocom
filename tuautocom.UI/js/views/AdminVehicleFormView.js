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

export class AdminVehicleFormView {
  constructor(vehicleId = null) {
    this.vehicleId = vehicleId;
    this.vehicle = null;
    this.selectedImages = [];
  }

  /**
   * Inicializa la vista
   * Si hay vehicleId, carga los datos del vehículo
   * @async
   */
  async init() {
    if (this.vehicleId) {
      // TODO: En integración con backend, cargar vehículo
      console.log('📝 Modo edición - ID:', this.vehicleId);
      // this.vehicle = await vehicleService.getById(this.vehicleId);
    } else {
      console.log('📝 Modo creación - Nuevo vehículo');
    }
  }

  /**
   * Renderiza la vista completa
   * @returns {HTMLElement}
   */
  render() {
    const view = document.createElement('div');
    view.className = 'min-h-screen bg-[#10231c]';

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
      <div class="flex flex-col w-full max-w-[512px] py-5">
        <!-- Título -->
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <p class="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            ${this.vehicleId ? 'Editar Vehículo' : 'Agregar Vehículo'}
          </p>
        </div>

        <!-- Formulario -->
        <form data-vehicle-form>
          <!-- Marca -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Marca</p>
              <select
                name="brand"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
              >
                <option value="" disabled selected>Seleccione la marca</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="ford">Ford</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="nissan">Nissan</option>
                <option value="mazda">Mazda</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="hyundai">Hyundai</option>
                <option value="kia">Kia</option>
                <option value="tesla">Tesla</option>
              </select>
            </label>
          </div>

          <!-- Modelo -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Modelo</p>
              <input
                type="text"
                name="model"
                required
                placeholder="Ingrese el modelo"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
                value="${this.vehicle?.model || ''}"
              />
            </label>
          </div>

          <!-- Año -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Año</p>
              <input
                type="number"
                name="year"
                required
                min="1900"
                max="${new Date().getFullYear() + 1}"
                placeholder="Ingrese el año"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
                value="${this.vehicle?.year || ''}"
              />
            </label>
          </div>

          <!-- Precio -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Precio</p>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                placeholder="Ingrese el precio"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
                value="${this.vehicle?.price || ''}"
              />
            </label>
          </div>

          <!-- Kilometraje -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Kilometraje (opcional)</p>
              <input
                type="number"
                name="mileage"
                min="0"
                placeholder="Ingrese el kilometraje"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
                value="${this.vehicle?.mileage || ''}"
              />
            </label>
          </div>

          <!-- Combustible -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Combustible</p>
              <select
                name="fuel"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
              >
                <option value="" disabled selected>Seleccione el tipo de combustible</option>
                <option value="gasoline">Gasolina</option>
                <option value="diesel">Diésel</option>
                <option value="hybrid">Híbrido</option>
                <option value="electric">Eléctrico</option>
              </select>
            </label>
          </div>

          <!-- Categoría -->
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Categoría</p>
              <select
                name="category"
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] h-14 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
              >
                <option value="" disabled selected>Seleccione la categoría</option>
                <option value="sedan">Sedán</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pick-up</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupé</option>
                <option value="electric">Eléctrico</option>
              </select>
            </label>
          </div>

          <!-- Subir Imágenes -->
          <div class="flex flex-col p-4">
            <div 
              class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#2f6a55] px-6 py-14 cursor-pointer hover:border-[#8ecdb7] transition-colors"
              data-image-dropzone
            >
              <div class="flex max-w-[480px] flex-col items-center gap-2">
                <p class="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                  Subir Imágenes
                </p>
                <p class="text-white text-sm font-normal leading-normal max-w-[480px] text-center">
                  Arrastra y suelta imágenes aquí o haz clic para buscar
                </p>
              </div>
              <input
                type="file"
                name="images"
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
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-white text-base font-medium leading-normal pb-2">Descripción</p>
              <textarea
                name="description"
                placeholder="Ingrese una descripción detallada del vehículo"
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2f6a55] bg-[#17352b] focus:border-[#8ecdb7] min-h-36 placeholder:text-[#8ecdb7] p-[15px] text-base font-normal leading-normal"
              >${this.vehicle?.description || ''}</textarea>
            </label>
          </div>

          <!-- Botones -->
          <div class="flex justify-stretch">
            <div class="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
              <button
                type="button"
                data-action="cancel"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#214a3c] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2f6a55] transition-colors"
              >
                <span class="truncate">Cancelar</span>
              </button>
              <button
                type="submit"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#019863] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#017a4f] transition-colors"
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
        dropzone.classList.add('border-[#8ecdb7]', 'bg-[#17352b]');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-[#8ecdb7]', 'bg-[#17352b]');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-[#8ecdb7]', 'bg-[#17352b]');
        
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
    console.log('📸 Imágenes seleccionadas:', this.selectedImages.length);
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
        preview.className = 'relative w-24 h-24 rounded-lg overflow-hidden border-2 border-[#2f6a55]';
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
  _handleSubmit(form) {
    const formData = new FormData(form);
    
    const vehicleData = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      year: parseInt(formData.get('year'), 10),
      price: parseFloat(formData.get('price')),
      mileage: formData.get('mileage') ? parseInt(formData.get('mileage'), 10) : null,
      fuel: formData.get('fuel'),
      category: formData.get('category'),
      description: formData.get('description'),
      images: this.selectedImages
    };

    console.log('💾 Datos del vehículo a guardar:', vehicleData);
    
    // TODO: En integración con backend, enviar a API
    // if (this.vehicleId) {
    //   await vehicleService.update(this.vehicleId, vehicleData);
    // } else {
    //   await vehicleService.create(vehicleData);
    // }

    alert(`Vehículo ${this.vehicleId ? 'actualizado' : 'creado'} exitosamente!\n\n${vehicleData.brand} ${vehicleData.model} ${vehicleData.year}\nPrecio: $${vehicleData.price.toLocaleString()}`);
    
    // Redirigir al catálogo
    window.location.hash = '#catalog';
  }

  /**
   * Destruye la vista
   */
  destroy() {
    // Limpiar referencias
    this.selectedImages = [];
  }
}
