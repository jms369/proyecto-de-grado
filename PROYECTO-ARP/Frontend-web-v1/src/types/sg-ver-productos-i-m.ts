// ============================================================================
// 1. DTO (Data Transfer Object) - EL IDIOMA DEL BACKEND
// ============================================================================
// ¿QUÉ ES? Es una "plantilla" que describe exactamente cómo viene la información
// desde tu base de datos MySQL a través del Backend.
// ¿PARA QUÉ SIRVE? Para que TypeScript sepa qué tipo de dato hay en cada propiedad.
// ¿RECIBE/ENVÍA? Se usa para RECIBIR los datos del backend (en un fetch GET).
//  IMPORTANTE: Los nombres deben ser EXACTOS a las columnas de tu tabla PRODUCTOS_CELULAR.

export interface SGProductoVerDTO {
  id_producto: number;              // Recibe: Número entero (ej. 1)
  url_imagen: string;               // Recibe: Texto (ruta de la foto en el servidor)
  marca_celular: string;            // Recibe: Texto (ej. "Samsung")
  modelo_celular: string;           // Recibe: Texto (ej. "Galaxy S25")
  precio_celular: number;           // Recibe: Número entero (ej. 1200)
  estado_celular: number | boolean; // Recibe: 1 o 0 (porque en MySQL es tinyint)
  procesador_celular: string;       // Recibe: Texto (ej. "Snapdragon")
  almacenamiento_celular: number;   // Recibe: Número entero (GB)
  ram_celular: number;              // Recibe: Número entero (GB)
  bateria_celular: number;          // Recibe: Número entero (mAh)
  puntuacion_celular: number;       // Recibe: Número entero (AnTuTu)
  pantalla_celular: string;         // Recibe: Texto (ej. "AMOLED")
  cam_principal_cel: number;        // Recibe: Número entero (MP)
  certificacionip_celular: number | boolean; // Recibe: 1 o 0
  carga_rapida_cel: number;         // Recibe: Número entero (W)
  cam_frontal_cel: number;          // Recibe: Número entero (MP)
  tasa_refresco_cel: number;        // Recibe: Número entero (Hz)
  mas_info_celular: string;         // Recibe: Texto largo
}

// ============================================================================
// 2. MODELO - EL IDIOMA DEL FRONTEND
// ============================================================================
// ¿QUÉ ES? Es la "plantilla" que usa tu interfaz visual (el archivo .tsx) para
// mostrar los datos en pantalla.
// ¿PARA QUÉ SIRVE? Para que los nombres de las variables sean más cortos y amigables
// (ej. "marca" en lugar de "marca_celular") y para convertir los tipos de datos
// (ej. convertir el 1/0 de MySQL a true/false de JavaScript).
// ¿RECIBE/ENVÍA? Se usa INTERNAMENTE en el frontend para manejar el estado.

export interface SGProductoVerModel {
  id: string;                       // Usamos string para manejar el ID en el HTML
  marca: string;                    // Nombre amigable (antes: marca_celular)
  modelo: string;                   // Nombre amigable (antes: modelo_celular)
  precio: number;                   // Nombre amigable (antes: precio_celular)
  estado: boolean;                  // true o false (antes: 1 o 0)
  procesador: string;
  almacenamiento: number;
  ram: number;
  bateria: number;
  puntuacionAntutu: number;         // Nombre amigable (antes: puntuacion_celular)
  pantalla: string;
  camaraPrincipal: number;          // Nombre amigable (antes: cam_principal_cel)
  certificacionIp: boolean;         // true o false (antes: 1 o 0)
  cargaRapida: number;
  camaraFrontal: number;
  tasaRefresco: number;
  masInformacion: string;
  imagenUrl: string;                // Nombre amigable (antes: url_imagen)
}

// ============================================================================
// 3. EL MAPEADOR (Backend -> Frontend) - EL TRADUCTOR
// ============================================================================
//  ESTA ES LA PARTE QUE TE DABA INTRIGA. AQUÍ ESTÁ LA EXPLICACIÓN DETALLADA:

// ¿QUÉ HACE? Es una función que recibe un objeto con los nombres de la base de datos
// (SGProductoVerDTO) y devuelve un objeto nuevo con los nombres que usa el frontend
// (SGProductoVerModel).
// ¿PARA QUÉ SIRVE? Para "traducir" los datos. Si no existiera esta función, tu .tsx
// tendría que escribir {producto.marca_celular} en lugar de {producto.marca}, lo cual
// es más feo y difícil de leer. Además, aquí convertimos tipos (1 -> true, "5" -> 5).
// ¿CUÁNDO SE USA? Justo después de hacer el fetch al backend, antes de guardar los
// datos en el estado de Solid.js.

export const mapBackendToFrontendProductoVer = (dto: SGProductoVerDTO): SGProductoVerModel => {
  // RECIBE: dto (un objeto con los nombres exactos de la BD)
  // DEVUELVE: un objeto nuevo con los nombres amigables para el frontend
  return {
    // El ID viene como número de la BD, pero lo convertimos a String para el frontend.
    // String() convierte el número 1 a "1". Si viene null, pone un string vacío.
    id: String(dto.id_producto),

    // Para los textos, usamos el operador "?? ''". Esto significa:
    // "Si el valor es null o undefined, pon un string vacío. Si no, usa el valor".
    // Esto evita que la interfaz se rompa si algún campo viene nulo.
    marca: dto.marca_celular ?? '',
    modelo: dto.modelo_celular ?? '',
    procesador: dto.procesador_celular ?? '',
    pantalla: dto.pantalla_celular ?? '',
    masInformacion: dto.mas_info_celular ?? '',

    // Para los números, usamos "Number(...) || 0". Esto significa:
    // "Convierte el valor a número. Si el resultado es NaN (no es un número), pon 0".
    // Esto evita que la interfaz muestre "NaN" si algún campo viene mal.
    precio: Number(dto.precio_celular) || 0,
    almacenamiento: Number(dto.almacenamiento_celular) || 0,
    ram: Number(dto.ram_celular) || 0,
    bateria: Number(dto.bateria_celular) || 0,
    puntuacionAntutu: Number(dto.puntuacion_celular) || 0,
    camaraPrincipal: Number(dto.cam_principal_cel) || 0,
    cargaRapida: Number(dto.carga_rapida_cel) || 0,
    camaraFrontal: Number(dto.cam_frontal_cel) || 0,
    tasaRefresco: Number(dto.tasa_refresco_cel) || 0,

    // Para los booleanos, usamos "Boolean(...)". Esto significa:
    // "Convierte el valor a true o false". En MySQL, 1 es true y 0 es false.
    // Boolean(1) === true, Boolean(0) === false.
    estado: Boolean(dto.estado_celular),
    certificacionIp: Boolean(dto.certificacionip_celular),

    // Para la imagen, usamos "|| ''". Si viene null o undefined, pon un string vacío.
    // El .tsx luego usará un fallback (imagen por defecto) si el string está vacío.
    imagenUrl: dto.url_imagen || '',
  };
};

