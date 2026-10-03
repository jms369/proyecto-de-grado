import type { Component } from 'solid-js';
import type { SGFooterProps } from './sg-footer-i-m';
import { mapBackendToFooterData } from './sg-footer-i-m';
import { getCopyrightText, formatVersionText } from './sg-footer-logico';
import './sg-footer.css';

export const SGFooter: Component<SGFooterProps> = (props) => {
  // Carga de datos base mapeados
  const footerData = () => mapBackendToFooterData();

  return (
    <footer class="sg-footer-container">
      {/* Texto de Copyright */}
      <p class="sg-footer-copyright">
        {getCopyrightText(footerData(), props.customText)}
      </p>

      {/* Indicador de Versión */}
      <span class="sg-footer-version">
        {formatVersionText(props.version || footerData().version)}
      </span>
    </footer>
  );
};

export default SGFooter;