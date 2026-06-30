const API_URL = "http://localhost:5000/api/crud/productos";
const contenedor = document.getElementById("contenedorProductos");
const btnNuevo = document.getElementById("btnNuevo");

btnNuevo.addEventListener("click", () => crearTarjeta());

function crearTarjeta(producto = {}) {
  const card = document.createElement("div");
  card.className = "card";

  // ✅ Incluimos mas_info para coincidir con la tabla ProductosCelular
  const campos = ["marca","modelo","precio","procesador","almacenamiento","ram","bateria","mas_info"];
  const inputs = {};

  campos.forEach(campo => {
    const input = document.createElement("input");
    input.placeholder = campo;
    input.value = producto[campo] || "";
    inputs[campo] = input;
    card.appendChild(input);
  });

  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar";
  btnGuardar.onclick = async () => {
    const datos = {};
    campos.forEach(c => datos[c] = inputs[c].value);

    if (producto.id) {
      await fetch(`${API_URL}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(datos)
      });
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(datos)
      });
      const nuevo = await res.json();
      producto.id = nuevo.id;
    }
    cargarProductos();
  };

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.onclick = async () => {
    if (producto.id) {
      await fetch(`${API_URL}/${producto.id}`, { method: "DELETE" });
    }
    card.remove();
  };

  card.appendChild(btnGuardar);
  card.appendChild(btnEliminar);

  if (producto.id) {
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => {
      Object.keys(inputs).forEach(c => inputs[c].disabled = false);
    };
    card.appendChild(btnEditar);
    Object.keys(inputs).forEach(c => inputs[c].disabled = true);
  }

  contenedor.appendChild(card);
}

async function cargarProductos() {
  contenedor.innerHTML = "";
  const res = await fetch(API_URL);
  const productos = await res.json();

  // ✅ Protección: si backend devuelve error, no se rompe el forEach
  if (Array.isArray(productos)) {
    productos.forEach(p => crearTarjeta(p));
  } else {
    console.error("Respuesta inesperada del backend:", productos);
  }
}

cargarProductos();
