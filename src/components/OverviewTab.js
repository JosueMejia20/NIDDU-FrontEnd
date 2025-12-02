import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import BookingItem from "./BookingItem";
import CaregiverCard from "./CaregiverCard";
import { obtenerServiciosPorCuidadores } from "../api/cuidador/cuidadoresApi";
import { obtenerHistorialReservas } from "../api/usuarios/usuariosApi";

const OverviewTab = ({ mascotas, user }) => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [userStats, setUserStats] = useState({
    mascotas: 0,
    reservasActivas: 0,
    cuidadoresDisponibles: 0,
  });
  const [loading, setLoading] = useState(true);

  // Funcion para mapear estado de API a estado para BookingItem
  const mapEstadoToReservaItem = (estado) => {
    const estadoMap = {
      Completado: "Completada",
      Pagado: "Activa",
      Pendiente: "Confirmada",
    };
    return estadoMap[estado] || "Activa";
  };

  // Funcion para formatear fecha para BookingItem
  const formatBookingDate = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Obtener cuidadores disponibles
        const cuidadoresData = await obtenerServiciosPorCuidadores();
        console.log("Cuidadores obtenidos:", cuidadoresData);

        const cantidadCuidadores = cuidadoresData.length;

        // 2. Obtener reservas del usuario desde la API
        let reservasReales = [];
        if (user?.id) {
          console.log("Obteniendo reservas para usuario ID:", user.id);
          const historialReservas = await obtenerHistorialReservas(user.id);
          console.log("Reservas obtenidas de API:", historialReservas);

          // Transformar datos de API al formato que necesita BookingItem
          reservasReales = historialReservas.map((reserva, index) => ({
            id: index + 1, // Usar indice como ID temporal
            servicio: reserva.nombreServicio,
            cuidador: `${reserva.nombreCuidador} ${reserva.apellidoCuidador}`,
            fecha: formatBookingDate(reserva.fecha),
            estado: mapEstadoToReservaItem(reserva.estado),
            precio: `$${reserva.total.toLocaleString("es-CO")}`,
            tipo: reserva.estado.toLowerCase(),
            mascota: reserva.nombreMascota,
          }));

          console.log("Reservas transformadas:", reservasReales);
        }

        // 3. Contar reservas activas (estado "Pagado" o "Pendiente")
        const reservasActivasCount = reservasReales.filter(
          (reserva) =>
            reserva.estado === "Activa" || reserva.estado === "Confirmada"
        ).length;

        // 4. Actualizar estado
        setReservas(reservasReales);
        setUserStats({
          mascotas: mascotas.length,
          reservasActivas: reservasActivasCount,
          cuidadoresDisponibles: cantidadCuidadores,
        });
      } catch (error) {
        console.error("Error obteniendo datos:", error);

        // Datos de fallback en caso de error
        const reservasFallback = [
          {
            id: 1,
            servicio: "Day Care",
            cuidador: "Ana García",
            fecha: "15 Nov 2023",
            estado: "Activa",
            precio: "$25.000",
            tipo: "activa",
            mascota: "Mascota",
          },
        ];

        setReservas(reservasFallback);
        setUserStats({
          mascotas: mascotas.length,
          reservasActivas: reservasFallback.length,
          cuidadoresDisponibles: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mascotas, user]);

  const handleTabNavigate = (tab) => {
    navigate(`/dashboard?tab=${tab}`);
  };

  const handleReserve = (mascotaId) => {
    navigate("/new-booking", { state: { mascotaId } });
  };

  if (loading) {
    return (
      <div className="tab-content">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <h2>Resumen General</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-paw"></i>
          </div>
          <div className="stat-info">
            <h3>{userStats.mascotas}</h3>
            <p>Mascotas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-info">
            <h3>{userStats.reservasActivas}</h3>
            <p>Reservas Realizadas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-heart"></i>
          </div>
          <div className="stat-info">
            <h3>{userStats.cuidadoresDisponibles}</h3>
            <p>Cuidadores Disponibles</p>
          </div>
        </div>
      </div>

      {/* Seccion Mascotas */}
      <div className="section-card">
        <div className="section-header">
          <h3>Mis Mascotas</h3>
        </div>
        <div className="pets-grid">
          {mascotas.map((mascota) => (
            <PetCard
              key={mascota.id}
              mascota={mascota}
              onReserve={handleReserve}
            />
          ))}
        </div>
      </div>

      {/* Seccion Reservas */}
      <div className="section-card">
        <div className="section-header">
          <h3>Próximas Reservas</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => handleTabNavigate("bookings")}
          >
            Ver Todas
          </button>
        </div>
        <div className="bookings-list">
          {reservas.length > 0 ? (
            reservas.slice(0, 5).map((reserva, index) => (
              <BookingItem
                key={reserva.id} // Usar el id generado
                reserva={reserva}
              />
            ))
          ) : (
            <div className="no-bookings-message">
              <i className="fas fa-calendar-times"></i>
              <p>No tienes reservas activas</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/new-booking")}
              >
                Haz tu primera reserva
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
