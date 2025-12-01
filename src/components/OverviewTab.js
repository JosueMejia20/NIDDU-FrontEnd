import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import BookingItem from "./BookingItem";
import CaregiverCard from "./CaregiverCard";
import { obtenerServiciosPorCuidadores } from "../api/cuidador/cuidadoresApi";

const OverviewTab = ({ mascotas }) => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [userStats, setUserStats] = useState({
    mascotas: 0,
    reservasActivas: 0,
    cuidadoresDisponibles: 0,
  });
  const [loading, setLoading] = useState(true);

  // Datos de reservas
  const reservasData = [
    {
      id: 1,
      servicio: "Day Care",
      cuidador: "Ana García",
      fecha: "15 Nov 2023",
      hora: "09:00 - 18:00",
      estado: "Activa",
      precio: "$25.000",
      direccion: "Calle 123 #45-67",
      tipo: "activa",
      duracion: "8 horas",
    },
    {
      id: 2,
      servicio: "Paseo",
      cuidador: "Carlos López",
      fecha: "10 Nov 2023",
      hora: "16:00 - 17:00",
      estado: "Completada",
      precio: "$15.000",
      direccion: "Carrera 89 #12-34",
      tipo: "completada",
      duracion: "1 hora",
    },
    {
      id: 3,
      servicio: "Peluquería",
      cuidador: "María Rodríguez",
      fecha: "20 Nov 2023",
      hora: "14:00 - 16:00",
      estado: "Confirmada",
      precio: "$35.000",
      direccion: "Avenida Siempre Viva 742",
      tipo: "confirmada",
      duracion: "2 horas",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cuidadoresData = await obtenerServiciosPorCuidadores();
        console.log("Cuidadores obtenidos:", cuidadoresData);

        const cantidadCuidadores = cuidadoresData.length;

        setReservas(reservasData);

        setUserStats({
          mascotas: mascotas.length,
          reservasActivas: reservasData.length,
          cuidadoresDisponibles: cantidadCuidadores,
        });
      } catch (error) {
        console.error("Error obteniendo cuidadores:", error);

        //Caso de error cambiar
        setReservas(reservasData);
        setUserStats({
          mascotas: mascotas.length,
          reservasActivas: reservasData.length,
          cuidadoresDisponibles: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mascotas]);

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

      {/* Sección Mascotas */}
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

      {/* Sección Reservas */}
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
          {reservas.slice(0, 2).map((reserva) => (
            <BookingItem key={reserva.id} reserva={reserva} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
