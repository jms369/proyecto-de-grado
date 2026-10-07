// ============================================================================
// INICIO MODIFICACIÓN: Creación de lógica de estado y controladores para SG-editar-web
// ============================================================================
import { createSignal } from 'solid-js';
import type { BaseImage, ProductImage, WebLinks, WebInfo } from '../../types/sg-editar-web-i-m';
import { validateImageFile } from '../../types/sg-editar-web-i-m';

export const useEditarWebLogic = (navigate: (to: string) => void) => {
  // Estado Logo
  const [logoPreview, setLogoPreview] = createSignal<string | null>(null);
  
  // Estado Enlaces
  const [links, setLinks] = createSignal<WebLinks>({ facebook: '', instagram: '', whatsapp: '', tiktok: '', ubicacion: '' });
  
  // Estado Información
  const [infoText, setInfoText] = createSignal<string>("Información por defecto de la empresa...");
  const [isEditingInfo, setIsEditingInfo] = createSignal<boolean>(false);

  // Estado Imágenes de Ofertas (Independientes)
  const [offerImages, setOfferImages] = createSignal<BaseImage[]>([]);
  const [selectedOfferImages, setSelectedOfferImages] = createSignal<Set<number>>(new Set());

  // Estado Imágenes de Productos
  const PRODUCTO_ID_ACTUAL = 10; // Simulación del ID del producto actual
  const [productImages, setProductImages] = createSignal<ProductImage[]>([]);
  const [selectedProductImages, setSelectedProductImages] = createSignal<Set<number>>(new Set());

  // Estado Modal Vista Previa
  const [previewModalUrl, setPreviewModalUrl] = createSignal<string | null>(null);

  // Handlers Logo
  const handleLogoUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const error = validateImageFile(file);
      if (!error) {
        setLogoPreview(URL.createObjectURL(file));
      } else {
        alert(error);
      }
    }
  };

  const handleDeleteLogo = () => setLogoPreview(null);
  const handleSaveLogo = () => alert("Logotipo guardado exitosamente");

  // Handlers Enlaces
  const handleSaveLinks = () => alert("Enlaces guardados");

  // Handlers Info
  const handleSaveInfo = () => {
    setIsEditingInfo(false);
    alert("Información guardada");
  };

  // Handlers Galerías (Lógica genérica para simplificar)
  const toggleSelectImage = (id: number, isProduct: boolean) => {
    if (isProduct) {
      const newSet = new Set(selectedProductImages());
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      setSelectedProductImages(newSet);
    } else {
      const newSet = new Set(selectedOfferImages());
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      setSelectedOfferImages(newSet);
    }
  };

  
  const handleDeleteSelected = (isProduct: boolean) => {
    if (isProduct) {
      setProductImages(prev => prev.filter(img => !selectedProductImages().has(img.id)));
      setSelectedProductImages(new Set<number>());
    } else {
      setOfferImages(prev => prev.filter(img => !selectedOfferImages().has(img.id)));
      setSelectedOfferImages(new Set<number>());
    }
  };

  return {
    logoPreview, handleLogoUpload, handleDeleteLogo, handleSaveLogo,
    links, setLinks, handleSaveLinks,
    infoText, setInfoText, isEditingInfo, setIsEditingInfo, handleSaveInfo,
    offerImages, selectedOfferImages,
    productImages, selectedProductImages, PRODUCTO_ID_ACTUAL,
    toggleSelectImage, handleDeleteSelected,
    previewModalUrl, setPreviewModalUrl
  };
};
// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================