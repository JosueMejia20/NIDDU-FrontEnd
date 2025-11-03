import api from "../axiosConfig";

const id = 1;

export const userService = {
  obtainUser: () => api.get(`/users/obtenerUsuario/${id}`),
};
