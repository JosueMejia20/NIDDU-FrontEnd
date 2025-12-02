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

export const crearReserva = async (reservaData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, reservaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear reserva:", error);
    throw error;
  }
};

export const removerTipoServicioDeCuidador = async (
  idCuidador,
  idTipoServicio
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/RemoverTipoServicio/${idCuidador}/${idTipoServicio}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al remover tipo de servicio:", error);
    throw error;
  }
};
