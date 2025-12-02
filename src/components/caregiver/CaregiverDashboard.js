import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caregiver/CaregiverDashboard.css";
import { obtenerReservasPorCuidador } from "../../api/cuidador/cuidadoresApi";

const CaregiverDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [allReservas, setAllReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      icon: "dollar-sign",
      value: "$0",
      label: "Ingresos Totales",
      type: "income",
    },
    {
      icon: "calendar-check",
      value: "0",
      label: "Reservas Activas",
      type: "bookings",
    },
    { icon: "star", value: "5", label: "Calificación", type: "rating" },
    {
      icon: "users",
      value: "0",
      label: "Clientes Atendidos",
      type: "clients",
    },
  ]);

  console.log(user);

  const quickActions = [
    {
      icon: "plus-circle",
      title: "Gestionar Servicios",
      description: "Gestiona los servicios que ofreces",
      path: "/caregiver/servicios",
    },
    {
      icon: "calendar-alt",
      title: "Gestionar Reservas",
      description: "Ver todas las reservas",
      path: "/caregiver/reservas",
    },
    {
      icon: "chart-line",
      title: "Ver Reportes",
      description: "Estadísticas de ingresos",
      path: "/caregiver/reportes",
    },
    {
      icon: "cog",
      title: "Configuración",
      description: "Editar perfil y preferencias",
      path: "/caregiver/configuracion",
    },
  ];

  // Funcion para calcular estadisticas basadas en las reservas
  const calculateStats = (reservasData) => {
    if (!Array.isArray(reservasData)) return;

    // 1. Ingresos Totales: Suma de todas las reservas con estado "Completado"
    const reservasCompletadas = reservasData.filter(
      (reserva) => reserva.estado === "Completado"
    );
    const ingresosTotales = reservasCompletadas.reduce(
      (sum, reserva) => sum + (reserva.total || 0),
      0
    );

    //Reservas Activas: Reservas con estado "Confirmado"
    const reservasActivas = reservasData.filter(
      (reserva) => reserva.estado === "Confirmado"
    );

    //Clientes Atendidos: Cantidad de reservas con estado "Completado"
    const clientesAtendidos = reservasCompletadas.length;

    // Formatear ingresos a moneda
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    setStats([
      {
        icon: "dollar-sign",
        value: formatCurrency(ingresosTotales),
        label: "Ingresos Totales",
        type: "income",
      },
      {
        icon: "calendar-check",
        value: reservasActivas.length.toString(),
        label: "Reservas Activas",
        type: "bookings",
      },
      { icon: "star", value: "5", label: "Calificación", type: "rating" },
      {
        icon: "users",
        value: clientesAtendidos.toString(),
        label: "Clientes Atendidos",
        type: "clients",
      },
    ]);
  };

  // Obtener reservas desde la API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        if (!user?.idCuidador) {
          console.log("No hay ID de cuidador disponible");
          setUpcomingBookings([]);
          setAllReservas([]);
          return;
        }

        console.log("Obteniendo reservas para cuidador:", user.idCuidador);
        const reservasData = await obtenerReservasPorCuidador(user.idCuidador);

        console.log("Reservas obtenidas:", reservasData);

        // Guardar todas las reservas para calculos
        setAllReservas(Array.isArray(reservasData) ? reservasData : []);

        // Calcular estadisticas con todas las reservas
        calculateStats(reservasData);

        // Filtrar solo reservas con estado "Pendiente" o "Confirmado" (exacto)
        const reservasFiltradas = Array.isArray(reservasData)
          ? reservasData.filter(
              (booking) =>
                booking.estado === "Pendiente" ||
                booking.estado === "Confirmado"
            )
          : [];

        console.log(
          "Reservas filtradas (Pendiente/Confirmado):",
          reservasFiltradas
        );

        // Tomar solo las primeras 3 reservas para el dashboard
        const reservasLimitadas = reservasFiltradas.slice(0, 3);

        setUpcomingBookings(reservasLimitadas);
      } catch (error) {
        console.error("Error obteniendo reservas:", error);
        // Mantener datos de ejemplo en caso de error
        const fallbackData = [
          {
            idServicio: 1,
            estado: "Pendiente",
            nombreUsuario: "Ana",
            apellidoUsuario: "Ramirez",
            telefonoUsuario: "99887766",
            nombreMascota: "Firulais",
            tipoMascota: "Perro",
            razaMascota: "Labrador",
            edadMascota: 3.5,
            pesoMascota: 25,
            alergias: "Ninguna",
            veterinarioPreferencia: "VetPet",
            vacunasAlDia: true,
            notas: "Muy activo",
            nombreServicio: "Paseos Moderados",
            fecha: "2025-11-10",
            subtotal: 150,
            impuesto: 22.5,
            total: 172.5,
          },
        ];

        setAllReservas(fallbackData);
        calculateStats(fallbackData);
        setUpcomingBookings(fallbackData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.idCuidador]); // Se ejecuta cuando cambia el idCuidador

  const handleViewBookingDetails = (bookingId) => {
    navigate(`/caregiver/reservas/${bookingId}`);
  };

  // Funcion para formatear fecha si es necesario
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <section className="caregiver-dashboard">
      <div className="container">
        <div className="dashboard-welcome">
          <h1>
            ¡Hola, {user?.persona?.nombres} {user?.persona?.apellidos}!{" "}
            <i className="fas fa-dog"></i>
          </h1>
          <p>Gestiona tus servicios y reservas desde aquí</p>
        </div>

        {/* Estadisticas Rapidas */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.type}`}>
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Proximas Reservas */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Próximas Reservas</h2>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/caregiver/reservas")}
            >
              Ver Todas
            </button>
          </div>

          {loading ? (
            <div className="loading-container">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Cargando reservas...</p>
            </div>
          ) : (
            <div className="bookings-list">
              {upcomingBookings.map((booking) => (
                <div key={booking.idServicio} className="booking-item">
                  <div className="booking-info">
                    <div className="pet-avatar">
                      <img
                        src={
                          booking.tipoMascota === "Perro"
                            ? "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        }
                        alt={booking.nombreMascota}
                      />
                    </div>
                    <div className="booking-details">
                      <h4>
                        {booking.nombreServicio} - {booking.nombreMascota}
                      </h4>
                      <p>
                        <i className="fas fa-user"></i> {booking.nombreUsuario}{" "}
                        {booking.apellidoUsuario}
                      </p>
                      <p>
                        <i className="fas fa-phone"></i>{" "}
                        {booking.telefonoUsuario}
                      </p>
                      <p>
                        <i
                          className={`fas fa-${
                            booking.tipoMascota === "Perro" ? "dog" : "cat"
                          }`}
                        ></i>{" "}
                        {booking.tipoMascota}
                      </p>
                      <p>
                        <i className="fas fa-paw"></i> {booking.razaMascota}
                      </p>
                      <p>
                        <i className="fas fa-clock"></i>{" "}
                        {formatDate(booking.fecha)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingBookings.length === 0 && !loading && (
                <div className="no-bookings">
                  <i className="fas fa-calendar-times"></i>
                  <p>No tienes reservas próximas (Pendientes o Confirmadas)</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acciones Rapidas */}
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="action-card"
              onClick={() => navigate(action.path)}
            >
              <div className="action-icon">
                <i className={`fas fa-${action.icon}`}></i>
              </div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaregiverDashboard;
