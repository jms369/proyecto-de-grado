// src/lógico.ts (o sg-mis-datos-logico.ts)

import { createSignal, onMount } from 'solid-js';
import type { MisDatosForm, MisDatosErrors } from '../../types/sg-mis-datos-i-m';
import {
  sanitizeLettersOnly,
  sanitizeAlphanumeric,
  sanitizeNumbersOnly,
  mapFrontendToBackendMisDatos,
  mapBackendToFrontendMisDatos
} from '../../types/sg-mis-datos-i-m';
import { apiObtenerMisDatos, apiActualizarMisDatos } from '../../services/apis_SG/mis_datos_api';

export const useMisDatosLogic = (onClose?: () => void) => {
  const [formData, setFormData] = createSignal<MisDatosForm>({
    nombre1: '', nombre2: '', apellido1: '', apellido2: '',
    gmailUsuario: '', rol: '', carnetIdentidad: '', complemento: '',
    numeroCelular: '', direccion: '', fechaNacimiento: '', grupoSanguineo: ''
  });

  const [errors, setErrors] = createSignal<MisDatosErrors>({});
  const [successMsg, setSuccessMsg] = createSignal<string>('');
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  // ✅ GET AUTOMÁTICO AL RENDERIZAR
  onMount(async () => {
    try {
      const data = await apiObtenerMisDatos();
      setFormData(mapBackendToFrontendMisDatos(data));
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  });

  const handleInputChange = (field: keyof MisDatosForm, value: string) => {
    let sanitizedValue = value;

    if (['nombre1', 'nombre2', 'apellido1', 'apellido2'].includes(field)) {
      sanitizedValue = sanitizeLettersOnly(value);
    } else if (field === 'complemento') {
      sanitizedValue = sanitizeAlphanumeric(value);
    } else if (field === 'numeroCelular' || field === 'carnetIdentidad') {
      sanitizedValue = sanitizeNumbersOnly(value);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

    if (errors()[field as keyof MisDatosErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async (e: Event) => {
    e.preventDefault();
    setSuccessMsg('');
    const current = formData();
    const newErrors: MisDatosErrors = {};

    if (!current.nombre1) newErrors.nombre1 = 'Primer nombre es obligatorio';
    if (!current.apellido1) newErrors.apellido1 = 'Primer apellido es obligatorio';
    if (!current.carnetIdentidad) newErrors.carnetIdentidad = 'Carnet de identidad es obligatorio';
    if (!current.numeroCelular) newErrors.numeroCelular = 'Número celular es obligatorio';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = mapFrontendToBackendMisDatos(current);
      await apiActualizarMisDatos(payload);

      setSuccessMsg('¡Información actualizada con éxito!');

      setTimeout(() => {
        if (onClose) onClose();
      }, 1200);

    } catch (error) {
      console.error('Error al guardar:', error);
      alert('No se pudieron guardar los datos. Revise la consola.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return {
    formData,
    errors,
    successMsg,
    isLoading, // ⚠️ Exportado para el .tsx
    handleInputChange,
    handleSave,
    handleCancel
  };
};