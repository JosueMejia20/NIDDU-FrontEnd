import axios from "axios";

const API_URL = "http://localhost:8080/cuidadores";

// Registrar Usuario
export const registrarUsuarioCuidadores = async (usuarioData) => {
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
