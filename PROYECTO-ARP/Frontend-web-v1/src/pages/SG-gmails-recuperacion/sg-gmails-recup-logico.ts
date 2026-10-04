import { createSignal } from 'solid-js';
import type { GmailsRecuperacionState, GmailsRecuperacionErrors } from '../../types/sg-gmails-recuperacion-i-m';

export const useGmailsRecuperacionLogic = () => {
  const [emails, setEmails] = createSignal<GmailsRecuperacionState>({
    email1: '',
    email2: '',
    email3: ''
  });

  const [errors, setErrors] = createSignal<GmailsRecuperacionErrors>({});
  const [successMsg, setSuccessMsg] = createSignal<string>('');

  // Regex para comprobar estructura y dominios permitidos (@gmail.com o @hotmail.com)
  const validateEmailFormat = (email: string): boolean => {
    if (!email) return true; // Si está vacío es válido temporalmente hasta enviar
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/i;
    return emailRegex.test(email);
  };

  // Manejador de cambio con desinfección de espacios en tiempo real
  const handleEmailChange = (key: keyof GmailsRecuperacionState, rawValue: string) => {
    // Eliminar absolutamente todos los espacios ingresados por error
    const cleanedValue = rawValue.replace(/\s+/g, '');

    setEmails((prev) => ({ ...prev, [key]: cleanedValue }));

    // Validar en tiempo real si cumple con @gmail.com o @hotmail.com
    if (cleanedValue.length > 0 && !validateEmailFormat(cleanedValue)) {
      setErrors((prev) => ({
        ...prev,
        [key]: 'Debe terminar en @gmail.com o @hotmail.com'
      }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSave = (e: Event) => {
    e.preventDefault();
    const current = emails();
    const newErrors: GmailsRecuperacionErrors = {};

    // Validar formato al enviar
    (['email1', 'email2', 'email3'] as Array<keyof GmailsRecuperacionState>).forEach((field) => {
      const val = current[field];
      if (val && !validateEmailFormat(val)) {
        newErrors[field] = 'Formato inválido (@gmail.com o @hotmail.com)';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMsg('');
      return;
    }

    // Filtrar correos no vacíos limpios
    const validEmailsList = [current.email1, current.email2, current.email3].filter(
      (email) => email.trim().length > 0
    );

    if (validEmailsList.length === 0) {
      setErrors({ email1: 'Ingresa al menos un correo de recuperación' });
      setSuccessMsg('');
      return;
    }

    // Proceso exitoso
    setSuccessMsg('¡Correos de recuperación guardados correctamente!');
    console.log('Correos procesados:', validEmailsList);
  };

  return {
    emails,
    errors,
    successMsg,
    handleEmailChange,
    handleSave
  };
};