// src/api/mascotas/mascotasApi.js
import axios from "axios";

const API_URL =
  "https://niddu-backend-aqg9cngxbza8dxd4.eastus2-01.azurewebsites.net/servicios";

export const obtenerServiciosPorTipo = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/filtrarPorTipoServicio/${encodeURIComponent(id)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw error;
  }
};

// Registrar Usuario

// export const registrarMascota = async (mascotaData, idUsuario) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/agregarMascota/${idUsuario}`,
//       mascotaData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error al registrar mascota:", error);
//     throw error;
//   }
// };
