import { createSignal } from 'solid-js';
import type { MisDatosForm, MisDatosErrors } from '../../types/sg-mis-datos-i-m';
import {
  sanitizeLettersOnly,
  sanitizeAlphanumeric,
  sanitizeNumbersOnly,
  mapFrontendToBackendMisDatos
} from '../../types/sg-mis-datos-i-m';

export const useMisDatosLogic = (onClose?: () => void) => {
  const [formData, setFormData] = createSignal<MisDatosForm>({
    nombre1: 'Carlos',
    nombre2: 'Eduardo',
    apellido1: 'Mendoza',
    apellido2: 'Pérez',
    gmailUsuario: 'carlos.mendoza@gmail.com',
    rol: 'ADMINISTRADOR',
    carnetIdentidad: '8492019',
    complemento: '1B',
    numeroCelular: '71234567',
    direccion: 'Av. Las Palmas #450',
    fechaNacimiento: '1995-08-20',
    grupoSanguineo: 'O+'
  });

  const [errors, setErrors] = createSignal<MisDatosErrors>({});
  const [successMsg, setSuccessMsg] = createSignal<string>('');

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

  const handleSave = (e: Event) => {
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

    const payload = mapFrontendToBackendMisDatos(current);
    console.log('Payload a enviar:', payload);

    setSuccessMsg('¡Información actualizada con éxito!');
    
    // Opcional: cerrar el modal automáticamente tras guardar
    setTimeout(() => {
      if (onClose) onClose();
    }, 1200);
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return {
    formData,
    errors,
    successMsg,
    handleInputChange,
    handleSave,
    handleCancel
  };
};