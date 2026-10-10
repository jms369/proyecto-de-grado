import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';

// Páginas
import SGLogin from './pages/SG-login/sg-login';
import SGGmailRecuperacion from './pages/SG-recuperacion-contrasena/SG-ingresar-gmail/sg-gmail-recuperacion';
// 1. Importar la nueva página del código de recuperación
import SGCodigoRecuperacion from './pages/SG-recuperacion-contrasena/SG-ingresar-codigo/sg-codigo-recuperacion';
// 2. Importar la página de nueva contraseña
import SGNuevaContrasena from './pages/SG-recuperacion-contrasena/SG-reestablecer-contrasena/sg-nueva-contrasena';
// Importación del nuevo módulo Dashboard
import SGDashboard from './pages/SG-dashboard/sg-dashboard';
// Importación del nuevo módulo Crear Usuario
import SGCrearUsuario from './pages/SG-crear-usuario/sg-crear-usuario';
// Importación del nuevo módulo Editar Productos
import SGEditarProductos from './pages/SG-editar-productos/sg-editar-productos';
// Importación del nuevo módulo Ver Productos
import SGVerProductos from './pages/SG-ver-productos/sg-ver-productos';
// Importacion del nuevo módulo Editar Web
import SGEditarWeb from './pages/SG-editar-web/sg-editar-web';

// PAGINAS DEL SITIO WEB
import SWHome from './sitioWeb/SW-home/sw-home';
import SWPoliticaEnvios from './sitioWeb/SW-politica-envios/sw-politica-envios';
import SWTerminosCondiciones from './sitioWeb/SW-terminos-y-c/sw-terminos-y-c';
import SWPoliticasVentas from './sitioWeb/SW-politica-ventas/sw-politica-ventas';
import SWCatalogoProductos from './sitioWeb/SW-catalogo-productos/sw-catalogo-productos';
import SWAsistente from './sitioWeb/SW-asistente-recomendacion/sw-asistente-rec';
//import SWProductos from './sitioWeb/SW-productos/sw-productos';
//import SWAsistente from './sitioWeb/SW-asistente/sw-asistente';
//import SWProductos from './sitioWeb/SW-productos/sw-productos';
//import SWAsistente from './sitioWeb/SW-asistente/sw-asistente';



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

      {/* Ruta "/dashboard" → Dashboard principal */}
      <Route path="/dashboard" component={SGDashboard} />

      {/* Ruta "/crear-usuario" → Crear Usuario */}
      <Route path="/crear-usuario" component={SGCrearUsuario} />

      {/* Ruta "/editar-productos" → Editar Productos */}
      <Route path="/editar-productos" component={SGEditarProductos} />

      {/* Ruta "/ver-productos" → Ver Productos */}
      <Route path="/ver-productos" component={SGVerProductos} />

      {/* Ruta "/editar-web" → Editar Web */}
      <Route path="/editar-web" component={SGEditarWeb} />


      {/* Rutas del Sitio Web */}
      {/* Ruta "/home" → Página de Inicio del Sitio Web */}
      <Route path="/home" component={SWHome} />

      {/* Ruta "/politicas-envios" → Política de Envíos */}
      <Route path="/politicas-envios" component={SWPoliticaEnvios} />

      {/* Ruta "/terminos-y-condiciones" → Términos y Condiciones */}
      <Route path="/terminos-y-condiciones" component={SWTerminosCondiciones} />

      {/* Ruta "/politicas-ventas" → Políticas de Ventas */}
      <Route path="/politicas-ventas" component={SWPoliticasVentas} />

      {/* Ruta "/catalogo-productos" → Catálogo de Productos */}
      <Route path="/catalogo-productos" component={SWCatalogoProductos} />

      {/* Ruta "/asistente" → Asistente de Recomendación */}
      <Route path="/asistente" component={SWAsistente} />
    </Router>
  );
};

export default App;