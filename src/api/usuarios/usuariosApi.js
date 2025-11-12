// src/api/usuarios/usuariosApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

// Registrar Usuario
export const registrarUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, usuarioData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Loguear Usuario
export const validarCredenciales = async (correo, password) => {
  try {
    const response = await axios.get(
      `${API_URL}/validarCredenciales/${encodeURIComponent(correo)}/${encodeURIComponent(password)}`
    );
    return response.data; // Esto devolverá un UserDto
  } catch (error) {
    console.error("Error al validar credenciales:", error);
    throw error;
  }
};