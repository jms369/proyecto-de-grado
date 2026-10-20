// src/lógico.ts (o sg-gmails-recup-logico.ts)

import { createSignal, onMount } from 'solid-js';
import type { GmailsRecuperacionState, GmailsRecuperacionErrors } from '../../types/sg-gmails-recuperacion-i-m';
import { apiObtenerGmails, apiActualizarGmails } from '../../services/apis_SG/gmails_recuperacion_api';

export const useGmailsRecuperacionLogic = () => {
  const [emails, setEmails] = createSignal<GmailsRecuperacionState>({
    email1: '',
    email2: '',
    email3: ''
  });

  const [errors, setErrors] = createSignal<GmailsRecuperacionErrors>({});
  const [successMsg, setSuccessMsg] = createSignal<string>('');
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const validateEmailFormat = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/i;
    return emailRegex.test(email);
  };

  // ✅ GET AUTOMÁTICO AL RENDERIZAR
  onMount(async () => {
    try {
      const data = await apiObtenerGmails();
      setEmails({
        email1: data.gmail1_sg || '',
        email2: data.gmail2_sg || '',
        email3: data.gmail3_sg || ''
      });
    } catch (error) {
      console.error('Error al cargar los gmails:', error);
    }
  });

  const handleEmailChange = (key: keyof GmailsRecuperacionState, rawValue: string) => {
    const cleanedValue = rawValue.replace(/\s+/g, '');
    setEmails((prev) => ({ ...prev, [key]: cleanedValue }));

    if (cleanedValue.length > 0 && !validateEmailFormat(cleanedValue)) {
      setErrors((prev) => ({
        ...prev,
        [key]: 'Debe terminar en @gmail.com o @hotmail.com'
      }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSave = async (e: Event) => {
    e.preventDefault();
    setSuccessMsg('');
    const current = emails();
    const newErrors: GmailsRecuperacionErrors = {};

    (['email1', 'email2', 'email3'] as Array<keyof GmailsRecuperacionState>).forEach((field) => {
      const val = current[field];
      if (val && !validateEmailFormat(val)) {
        newErrors[field] = 'Formato inválido (@gmail.com o @hotmail.com)';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!current.email1 && !current.email2 && !current.email3) {
      setErrors({ email1: 'Ingresa al menos un correo de recuperación' });
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Enviamos null si el campo está vacío
      await apiActualizarGmails(
        current.email1 || null,
        current.email2 || null,
        current.email3 || null
      );

      setSuccessMsg('¡Correos de recuperación guardados correctamente!');
      setTimeout(() => setSuccessMsg(''), 3000);

    } catch (error) {
      console.error('Error al guardar los gmails:', error);
      alert('No se pudieron guardar los correos. Revise la consola.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emails,
    errors,
    successMsg,
    isLoading,
    handleEmailChange,
    handleSave
  };
};