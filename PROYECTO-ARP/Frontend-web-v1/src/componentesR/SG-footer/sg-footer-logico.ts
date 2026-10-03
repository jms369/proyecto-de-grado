import type { MappedFooterData } from './sg-footer-i-m';

/**
 * Genera la cadena del copyright dinámicamente según los datos
 */
export const getCopyrightText = (footerData: MappedFooterData, customText?: string): string => {
  const name = customText || footerData.text;
  return `© ${footerData.year} ${name}. Todos los derechos reservados.`;
};

/**
 * Formatea la versión para su despliegue
 */
export const formatVersionText = (version?: string): string => {
  return version ? `Versión ${version}` : 'v1.0.0';
};