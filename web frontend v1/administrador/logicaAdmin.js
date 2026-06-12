document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  // Simulación de validación (el backend hará la verificación real)
  if (usuario && password) {
    // Redirigir al panel de administración
    window.location.href = "panelAdministrador/panelAdmin.html";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
