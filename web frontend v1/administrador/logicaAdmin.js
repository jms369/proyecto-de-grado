
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo_gmail = document.getElementById("usuario").value;
  const contrasena_admin = document.getElementById("password").value;

  if (!correo_gmail || !contrasena_admin) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // 🔹 Aquí definimos la URL base de la API.
    // Si estás probando en tu PC (localhost:3000), usará http://localhost:5000
    // Si estás dentro de Docker/EC2, usará http://backend:5000
    const API_URL = window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "http://backend:5000";

    // 🔹 Aquí reemplazamos la línea original del fetch
    // Antes: fetch("http://backend:5000/api/usuarios/login", { ... })
    // Ahora: usamos la variable API_URL para que funcione en ambos entornos
    const respuesta = await fetch(`${API_URL}/api/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_gmail, contrasena_admin })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "panelAdministrador/panelAdmin.html";
    } else {
      alert(data.error || "Error al iniciar sesión.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    alert("Hubo un problema al conectar con el servidor.");
  }
});


/*
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo_gmail = document.getElementById("usuario").value;
  const contrasena_admin = document.getElementById("password").value;

  if (!correo_gmail || !contrasena_admin) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const respuesta = await fetch("http://backend:5000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_gmail, contrasena_admin })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "panelAdministrador/panelAdmin.html";
    } else {
      alert(data.error || "Error al iniciar sesión.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    alert("Hubo un problema al conectar con el servidor.");
  }
});

*/