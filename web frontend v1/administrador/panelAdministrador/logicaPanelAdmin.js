// Cerrar sesión (sin alerta)
document.getElementById("cerrarSesionBtn").addEventListener("click", () => {
  window.location.href = "../loginAdmin.html";
});

// Agregar Gmail
document.getElementById("agregarGmailBtn").addEventListener("click", () => {
  const lista = document.getElementById("listaGmails");
  const nuevoInput = document.createElement("input");
  nuevoInput.type = "email";
  nuevoInput.placeholder = "Nuevo Gmail";
  lista.appendChild(nuevoInput);
});

// Confirmar cambios
document.getElementById("confirmarCambiosBtn").addEventListener("click", () => {
  const lista = document.getElementById("listaGmails");
  const inputs = lista.querySelectorAll("input");

  inputs.forEach((input, index) => {
    if (index === 0) return; // El primer Gmail no se modifica
    if (input.value.trim() === "") {
      lista.removeChild(input); // Elimina campos vacíos
    }
  });

  console.log("Cambios confirmados y guardados en la base de datos.");
});

// Popup Crear nuevo administrador
const popup = document.getElementById("popupAdmin");
const crearBtn = document.getElementById("crearAdminBtn");
const cancelarBtn = document.getElementById("cancelarPopup");

crearBtn.addEventListener("click", () => {
  popup.style.display = "block";
});

cancelarBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Enviar formulario nuevo admin
document.getElementById("formNuevoAdmin").addEventListener("submit", (e) => {
  e.preventDefault();
  popup.style.display = "none";
  console.log("Administrador creado con éxito.");
});

// Cambiar contraseña
document.getElementById("cambiarPassBtn").addEventListener("click", () => {
  window.location.href = "panelAdmin.html";
});
