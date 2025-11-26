import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caregiver/CaregiverDashboard.css";

const CaregiverDashboard = ({ user }) => {
  const navigate = useNavigate();

  console.log(user);

  const stats = [
    {
      icon: "dollar-sign",
      value: "$1,250,000",
      label: "Ingresos del Mes",
      type: "income",
    },
    {
      icon: "calendar-check",
      value: "15",
      label: "Reservas Activas",
      type: "bookings",
    },
    { icon: "star", value: "4.9", label: "Calificación", type: "rating" },
    {
      icon: "users",
      value: "42",
      label: "Clientes Satisfechos",
      type: "clients",
    },
  ];

  const quickActions = [
    {
      icon: "plus-circle",
      title: "Crear Servicio",
      description: "Publica un nuevo servicio",
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

  const upcomingBookings = [
    {
      id: 1,
      petName: "Max",
      service: "Day Care - Max",
      client: "Carlos Rodríguez",
      time: "Hoy - 08:00 a 16:00",
      address: "Calle 123 #45-67",
      urgent: true,
      petImage:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      petName: "Luna",
      service: "Paseo - Luna",
      client: "María López",
      time: "Mañana - 16:00 a 17:00",
      address: "Carrera 89 #12-34",
      urgent: false,
      petImage:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const handleViewBookingDetails = (bookingId) => {
    navigate(`/caregiver/reservas/${bookingId}`);
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

        {/* Estadísticas Rápidas */}
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

        {/* Próximas Reservas */}
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

          <div className="bookings-list">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className={`booking-item ${booking.urgent ? "urgent" : ""}`}
              >
                <div className="booking-info">
                  <div className="pet-avatar">
                    <img src={booking.petImage} alt={booking.petName} />
                  </div>
                  <div className="booking-details">
                    <h4>{booking.service}</h4>
                    <p>
                      <i className="fas fa-user"></i> {booking.client}
                    </p>
                    <p>
                      <i className="fas fa-clock"></i> {booking.time}
                    </p>
                    <span className="booking-address">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {booking.address}
                    </span>
                  </div>
                </div>
                <div className="booking-actions">
                  <span
                    className={`status-badge ${booking.urgent ? "urgent" : ""}`}
                  >
                    {booking.urgent ? "Hoy" : "Mañana"}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewBookingDetails(booking.id)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
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
