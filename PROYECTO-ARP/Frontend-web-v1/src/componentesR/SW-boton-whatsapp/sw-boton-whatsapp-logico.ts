// src/componentesR/SW-boton-whatsapp/sw-boton-whatsapp-logico.ts

import { createSignal, onMount } from 'solid-js';
import { apiObtenerWhatsapp } from './boton_whatsapp_api';
import { mapWhatsAppUrl } from './sw-boton-whatsapp-i-m';

export const useWhatsappLogic = () => {
  // Número por defecto mientras se carga el real
  const [phone, setPhone] = createSignal<string>('59100000000'); 

  // Al montar el componente, buscamos el número real en la BD
  onMount(async () => {
    try {
      const data = await apiObtenerWhatsapp();
      if (data.whatsapp) {
        setPhone(data.whatsapp);
      }
    } catch (error) {
      console.error('Error al cargar el número de WhatsApp:', error);
    }
  });

  // Función para generar el enlace final
  const getLink = (message?: string) => {
    return mapWhatsAppUrl(phone(), message);
  };

  return { phone, getLink };
};