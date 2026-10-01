import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// Páginas
import SGLogin from './pages/SG-login/sg-login';
import SGGmailRecuperacion from './pages/SG-recuperacion-contrasena/SG-ingresar-gmail/sg-gmail-recuperacion';

const App: Component = () => {
  return (
    <Router>
      {/* Ruta inicial "/" → Página de Login */}
      <Route path="/" component={SGLogin} />

      {/* Ruta "/gmail-recuperacion" → Ingresar Gmail */}
      <Route path="/gmail-recuperacion" component={SGGmailRecuperacion} />
    </Router>
  );
};

export default App;