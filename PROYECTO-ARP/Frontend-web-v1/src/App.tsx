import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// Páginas
import SGLogin from './pages/SG-login/sg-login';
import SGGmailRecuperacion from './pages/SG-recuperacion-contrasena/SG-ingresar-gmail/sg-gmail-recuperacion';
// 1. Importar la nueva página del código de recuperación
import SGCodigoRecuperacion from './pages/SG-recuperacion-contrasena/SG-ingresar-codigo/sg-codigo-recuperacion';
// 2. Importar la página de nueva contraseña
import SGNuevaContrasena from './pages/SG-recuperacion-contrasena/SG-reestablecer-contrasena/sg-nueva-contrasena';

const App: Component = () => {
  return (
    <Router>
      {/* Ruta inicial "/" → Página de Login */}
      <Route path="/" component={SGLogin} />

      {/* Ruta "/gmail-recuperacion" → Ingresar Gmail */}
      <Route path="/gmail-recuperacion" component={SGGmailRecuperacion} />

      {/* 2. Nueva ruta para ingresar el código de verificación */}
      <Route path="/codigo-recuperacion" component={SGCodigoRecuperacion} />

      {/* 2. Nueva ruta para reestablecer la contraseña */}
      <Route path="/reestablecer-contrasena" component={SGNuevaContrasena} />
    </Router>
  );
};

export default App;