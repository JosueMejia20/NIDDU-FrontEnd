import axios from "axios";

const API_URL =
  "https://niddu-backend-aqg9cngxbza8dxd4.eastus2-01.azurewebsites.net/cuidadores";

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

export const validarCredencialesCuidador = async (correo, password) => {
  try {
    const response = await axios.get(
      `${API_URL}/validarCredenciales/${encodeURIComponent(
        correo
      )}/${encodeURIComponent(password)}`
    );
    return response.data; // Esto devolverá un UserDto
  } catch (error) {
    console.error("Error al validar credenciales:", error);
    throw error;
  }
};

export const obtenerServiciosPorCuidadores = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/obtenerServiciosPorCuidadores`
    );
    return response.data; // Esto devolverá un UserDto
  } catch (error) {
    console.error("Error al validar credenciales:", error);
    throw error;
  }
};
