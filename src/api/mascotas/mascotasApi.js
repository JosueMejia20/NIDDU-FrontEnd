// src/api/mascotas/mascotasApi.js
import axios from "axios";

const API_URL =
  "https://niddu-backend-aqg9cngxbza8dxd4.eastus2-01.azurewebsites.net/mascotas";

export const obtenerMascotasPorUsuario = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/usuarioMascotas/${encodeURIComponent(id)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    throw error;
  }
};

// Registrar Usuario
export const registrarMascota = async (mascotaData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, mascotaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar mascota:", error);
    throw error;
  }
};
