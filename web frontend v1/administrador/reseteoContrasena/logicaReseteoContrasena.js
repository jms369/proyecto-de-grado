
const paginaActual = window.location.pathname.split("/").pop();


const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "http://backend:5000";

// --- 1. Validar Gmail ---
if (paginaActual === "reseteoContrasenaAdmin.html") {
  document.getElementById("btnContinuar").addEventListener("click", async () => {
    const correo_gmail = document.getElementById("correoRecuperacion").value;

    try {
      
      const respuesta = await fetch(`${API_URL}/api/usuarios/validar-gmail`, {
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
      
      const respuesta = await fetch(`${API_URL}/api/usuarios/validar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo_reseteo })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        
        localStorage.setItem("correo_gmail", data.correo_gmail);
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
    const correo_gmail = localStorage.getItem("correo_gmail"); 
    const nueva_contrasena = document.getElementById("nuevaContrasena").value;
    const confirmar_contrasena = document.getElementById("confirmarContrasena").value;

    if (nueva_contrasena !== confirmar_contrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      
      const respuesta = await fetch(`${API_URL}/api/usuarios/nueva-contrasena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_gmail, nueva_contrasena, confirmar_contrasena })
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert("Contraseña actualizada correctamente.");
        window.location.href = "../loginAdmin.html";
      } else {
        alert(data.error || "No se pudo actualizar la contraseña.");
      }
    } catch (error) {
      console.error("Error estableciendo contraseña:", error);
      alert("Hubo un problema al actualizar la contraseña.");
    }
  });
}

