// src/lógico.ts (o sg-editar-web-logico.ts)
import { createSignal, onMount } from 'solid-js';
import type { BaseImage, ProductImage, WebLinks, WebInfo } from '../../types/sg-editar-web-i-m';
import { validateImageFile } from '../../types/sg-editar-web-i-m';
import {
  apiActualizarLogo, apiActualizarRedes, apiActualizarInfo,
  apiSubirLogo, apiSubirOferta, apiSubirImagenProducto,
  apiCrearOferta, apiEliminarOferta,
  apiObtenerLogo, apiObtenerFooter, apiObtenerDatosSitioCompletos,
  apiObtenerArchivosProductos, apiEliminarArchivoProducto
} from '../../services/apis_SG/editar_web_api';

const BACKEND_HOST = 'http://localhost:3000';

export const useEditarWebLogic = (navigate: (to: string) => void) => {
  // --- ESTADOS ---
  const [logoPreview, setLogoPreview] = createSignal<string | null>(null);
  const [links, setLinks] = createSignal<WebLinks>({ facebook: '', instagram: '', whatsapp: '', tiktok: '', ubicacion: '' });
  const [infoText, setInfoText] = createSignal<string>("Información por defecto de la empresa...");
  const [isEditingInfo, setIsEditingInfo] = createSignal<boolean>(false);
  
  // Estado para Ofertas
  const [offerImages, setOfferImages] = createSignal<BaseImage[]>([]);
  const [selectedOfferImages, setSelectedOfferImages] = createSignal<Set<number>>(new Set());
  
  // Estado para Imágenes de Productos (archivos físicos)
  const [productImages, setProductImages] = createSignal<any[]>([]);
  const [selectedProductImages, setSelectedProductImages] = createSignal<Set<string>>(new Set());
  
  // Estado para el Modal
  const [previewModalUrl, setPreviewModalUrl] = createSignal<string | null>(null);

  // --- CARGA INICIAL DE DATOS ---
  onMount(async () => {
    try {
      // 1. Cargar Logo
      const logoData = await apiObtenerLogo();
      if (logoData && logoData.logo_url_sw) {
        setLogoPreview(`${BACKEND_HOST}${logoData.logo_url_sw}`);
      }

      // 2. Cargar Redes y Contacto
      const footerData = await apiObtenerFooter();
      if (footerData) {
        setLinks({
          facebook: footerData.url_facebook_sw || '',
          instagram: footerData.url_instagram_sw || '',
          whatsapp: footerData.num_whatsapp_sw || '',
          tiktok: footerData.url_tiktok_sw || '',
          ubicacion: footerData.url_ubicacion_sw || ''
        });
      }

      // 3. Cargar Info y Ofertas
      const homeData = await apiObtenerDatosSitioCompletos();
      if (homeData) {
        if (homeData.masInformacion) setInfoText(homeData.masInformacion);
        
        if (homeData.ofertas) {
          const ofertasFormateadas = homeData.ofertas.map((o: any) => ({
            id: o.id_oferta,
            nombreOriginal: 'Oferta',
            tamano: 0,
            tipoMime: 'image/jpeg',
            url: `${BACKEND_HOST}${o.url_oferta_sw}`
          }));
          setOfferImages(ofertasFormateadas);
        }
      }

      // 4. Cargar archivos físicos de la carpeta img_productos
      const archivosFisicos = await apiObtenerArchivosProductos();
      const imagenesFisicas = archivosFisicos.map((url, index) => ({
        id: `fisica-${index}`, // ID único temporal
        nombreOriginal: url.split('/').pop() || 'Imagen',
        tamano: 0,
        tipoMime: 'image/jpeg',
        url: `${BACKEND_HOST}${url}`
      }));
      setProductImages(imagenesFisicas);

    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    }
  });

  // --- HANDLERS LOGO ---
  const handleLogoUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const error = validateImageFile(file);
      if (error) { alert(error); return; }

      try {
        const url = await apiSubirLogo(file);
        setLogoPreview(`${BACKEND_HOST}${url}`);
      } catch (err) {
        console.error('Error al subir logo:', err);
        alert('No se pudo subir el logo.');
      }
    }
  };

  const handleDeleteLogo = () => setLogoPreview(null);

  const handleSaveLogo = async () => {
    const url = logoPreview();
    if (!url) return alert('No hay logo para guardar.');
    
    try {
      const urlRelativa = url.replace(BACKEND_HOST, '');
      await apiActualizarLogo(urlRelativa);
      alert('Logo guardado correctamente');
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS ENLACES ---
  const handleSaveLinks = async () => {
    try {
      await apiActualizarRedes(links());
      alert('Enlaces guardados correctamente');
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS INFO ---
  const handleSaveInfo = async () => {
    try {
      await apiActualizarInfo(infoText());
      setIsEditingInfo(false);
      alert('Información guardada');
    } catch (error) { console.error(error); }
  };

  // --- HANDLERS GALERÍA ---
  const toggleSelectImage = (id: number | string, isProduct: boolean) => {
    if (isProduct) {
      const newSet = new Set(selectedProductImages());
      newSet.has(id as string) ? newSet.delete(id as string) : newSet.add(id as string);
      setSelectedProductImages(newSet);
    } else {
      const newSet = new Set(selectedOfferImages());
      newSet.has(id as number) ? newSet.delete(id as number) : newSet.add(id as number);
      setSelectedOfferImages(newSet);
    }
  };

  const handleDeleteSelected = async (isProduct: boolean) => {
    if (isProduct) {
      // Eliminar archivos físicos de la carpeta img_productos
      const urlsAEliminar = Array.from(selectedProductImages());
      for (const id of urlsAEliminar) {
        const img = productImages().find(p => p.id === id);
        if (img) {
          try {
            const urlRelativa = img.url.replace(BACKEND_HOST, '');
            await apiEliminarArchivoProducto(urlRelativa);
          } catch (error) { console.error('Error al eliminar archivo:', error); }
        }
      }
      setProductImages(prev => prev.filter(img => !selectedProductImages().has(img.id)));
      setSelectedProductImages(new Set<string>());
    } else {
      // Eliminar ofertas de la BD
      const idsAEliminar = Array.from(selectedOfferImages());
      for (const id of idsAEliminar) {
        try { await apiEliminarOferta(id); } catch (error) { console.error(error); }
      }
      setOfferImages(prev => prev.filter(img => !selectedOfferImages().has(img.id)));
      setSelectedOfferImages(new Set<number>());
    }
  };

  // Subir Ofertas
  const handleOfferUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      for (const file of Array.from(target.files)) {
        const error = validateImageFile(file);
        if (error) { alert(error); continue; }

        try {
          const url = await apiSubirOferta(file);
          await apiCrearOferta(url);
          
          // Recargamos las ofertas para mostrar la nueva
          const homeData = await apiObtenerDatosSitioCompletos();
          if (homeData && homeData.ofertas) {
            setOfferImages(homeData.ofertas.map((o: any) => ({
              id: o.id_oferta,
              nombreOriginal: 'Oferta',
              tamano: 0,
              tipoMime: 'image/jpeg',
              url: `${BACKEND_HOST}${o.url_oferta_sw}`
            })));
          }
        } catch (err) { 
          console.error('Error al subir oferta:', err); 
          alert('No se pudo subir la oferta.');
        }
      }
    }
  };

  // Subir Imágenes de Productos (Físicas)
  const handleProductUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      for (const file of Array.from(target.files)) {
        const error = validateImageFile(file);
        if (error) { alert(error); continue; }

        try {
          const url = await apiSubirImagenProducto(file);
          
          // Añadimos la nueva imagen a la lista visual
          const nuevaImagen = {
            id: `fisica-${Date.now()}-${Math.random()}`,
            nombreOriginal: file.name,
            tamano: file.size,
            tipoMime: file.type,
            url: `${BACKEND_HOST}${url}`
          };
          setProductImages(prev => [...prev, nuevaImagen]);
          
        } catch (err) { 
          console.error('Error al subir imagen de producto:', err); 
          alert('No se pudo subir la imagen.');
        }
      }
    }
  };

  return {
    logoPreview, handleLogoUpload, handleDeleteLogo, handleSaveLogo,
    links, setLinks, handleSaveLinks,
    infoText, setInfoText, isEditingInfo, setIsEditingInfo, handleSaveInfo,
    offerImages, selectedOfferImages,
    productImages, selectedProductImages,
    toggleSelectImage, handleDeleteSelected, 
    handleOfferUpload, handleProductUpload, // <-- AHORA SÍ ESTÁ INCLUIDO
    previewModalUrl, setPreviewModalUrl
  };
};