import axios from "axios";

const API_URL =
  "https://niddu-backend-aqg9cngxbza8dxd4.eastus2-01.azurewebsites.net/tipoServicios";

export const obtenerTiposServicios = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerLosTiposServicios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};
