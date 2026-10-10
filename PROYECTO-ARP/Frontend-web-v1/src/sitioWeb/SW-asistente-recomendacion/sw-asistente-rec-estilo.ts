// ============================================================================
// INICIO MODIFICACIÓN: Estado base inicializado en vacío y nulo
// ============================================================================

import { createSignal } from 'solid-js';
import type { SWAstistenteFormModel } from '../../types/SW-types/sw-asistente-recomendacion-i-m';

const estadoInicial: SWAstistenteFormModel = {
  precioARP: '',
  camaraPrincipalARP: null,
  camaraFrontalARP: null,
  bateriaARP: null,
  certificacionIPARP: null,
  pantallaARP: null,
  almacenamientoARP: null,
  ramARP: null,
  antutuARP: null,
  tazaRefrezcoARP: null,
};

export const useAsistenteRecEstilo = () => {
  const [isAvanzadoOpen, setIsAvanzadoOpen] = createSignal<boolean>(false);
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const [formBasico, setFormBasico] = createSignal<SWAstistenteFormModel>({ ...estadoInicial });
  const [formAvanzado, setFormAvanzado] = createSignal<SWAstistenteFormModel>({ ...estadoInicial });

  const toggleAvanzado = () => {
    setIsAvanzadoOpen(!isAvanzadoOpen());
  };

  const actualizarBasico = <K extends keyof SWAstistenteFormModel>(campo: K, valor: SWAstistenteFormModel[K]) => {
    setFormBasico((prev) => ({ ...prev, [campo]: valor }));
  };

  const actualizarAvanzado = <K extends keyof SWAstistenteFormModel>(campo: K, valor: SWAstistenteFormModel[K]) => {
    setFormAvanzado((prev) => ({ ...prev, [campo]: valor }));
  };

  return {
    isAvanzadoOpen,
    toggleAvanzado,
    isLoading,
    setIsLoading,
    formBasico,
    actualizarBasico,
    formAvanzado,
    actualizarAvanzado,
  };
};

// ============================================================================
// FIN MODIFICACIÓN
// ============================================================================