// Detectar en qué página estamos
const paginaActual = window.location.pathname.split("/").pop();

// 🔧 NUEVO: Definir la URL base del backend dentro de Docker
const API_URL = "http://backend:5000/api/usuarios";

// --- 1. Validar Gmail ---
if (paginaActual === "reseteoContrasenaAdmin.html") {
  document.getElementById("btnContinuar").addEventListener("click", async () => {
    const correo_gmail = document.getElementById("correoRecuperacion").value;

    try {
      // 🔧 CAMBIO: URL y nombre del campo
      const respuesta = await fetch(`${API_URL}/validar-gmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_gmail })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        window.location.href = "ingresaCodigoGmailAdmin.html";
      } else {
        alert(data.error || "El correo no está registrado en la base de datos.");
      }
    } catch (error) {
      console.error("Error validando Gmail:", error);
      alert("Hubo un problema al validar el correo.");
    }
  });
}

// --- 2. Validar Código ---
if (paginaActual === "ingresaCodigoGmailAdmin.html") {
  document.getElementById("btnContinuar").addEventListener("click", async () => {
    const codigo_reseteo = document.getElementById("codigoReseteo").value;

    try {
      // 🔧 CAMBIO: URL y nombre del campo
      const respuesta = await fetch(`${API_URL}/validar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo_reseteo })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        window.location.href = "nuevaContrasenaAdmin.html";
      } else {
        alert(data.error || "El código ingresado no es válido.");
      }
    } catch (error) {
      console.error("Error validando código:", error);
      alert("Hubo un problema al validar el código.");
    }
  });
}

// --- 3. Establecer Nueva Contraseña ---
if (paginaActual === "nuevaContrasenaAdmin.html") {
  document.getElementById("btnContinuar").addEventListener("click", async () => {
    const correo_gmail = localStorage.getItem("correo_gmail"); // 🔧 NUEVO: recuperar correo si lo guardaste antes
    const nueva_contrasena = document.getElementById("nuevaContrasena").value;
    const confirmar_contrasena = document.getElementById("confirmarContrasena").value;

    if (nueva_contrasena !== confirmar_contrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      // 🔧 CAMBIO: URL y campos
      const respuesta = await fetch(`${API_URL}/nueva-contrasena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_gmail, nueva_contrasena, confirmar_contrasena })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("Contraseña actualizada correctamente.");
        window.location.href = "loginAdmin.html";
      } else {
        alert(data.error || "No se pudo actualizar la contraseña.");
      }
    } catch (error) {
      console.error("Error estableciendo contraseña:", error);
      alert("Hubo un problema al actualizar la contraseña.");
    }
  });
}
