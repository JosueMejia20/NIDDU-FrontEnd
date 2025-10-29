// OverviewTab.js
import React from "react";
import { useNavigate } from "react-router-dom";

const OverviewTab = ({ mascotas, reservas, cuidadores, userStats }) => {
  const navigate = useNavigate();

  const handleTabNavigate = (tab) => {
    navigate(`/dashboard?tab=${tab}`);
  };

  const handleReserve = (mascotaId) => {
    navigate("/new-booking", { state: { mascotaId } });
  };

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
            <p>Reservas Activas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-heart"></i>
          </div>
          <div className="stat-info">
            <h3>{userStats.cuidadoresFavoritos}</h3>
            <p>Cuidadores Favoritos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-info">
            <h3>{userStats.puntos}</h3>
            <p>Puntos NIDDU</p>
          </div>
        </div>
      </div>

      {/* Sección Mascotas */}
      <div className="section-card">
        <div className="section-header">
          <h3>Mis Mascotas</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => handleTabNavigate("pets")}
          >
            Ver Todas
          </button>
        </div>
        <div className="pets-grid">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="pet-card">
              <div className="pet-avatar">
                <img src={mascota.foto} alt={mascota.nombre} />
              </div>
              <div className="pet-info">
                <h4>{mascota.nombre}</h4>
                <p>
                  {mascota.raza} • {mascota.edad} años
                </p>
                <span className="pet-detail">{mascota.peso}</span>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleReserve(mascota.id)}
              >
                Ver / Reservar
              </button>
            </div>
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
            <div key={reserva.id} className="booking-item">
              <div className="booking-info">
                <h4>{reserva.servicio}</h4>
                <p>Con {reserva.cuidador}</p>
                <span className="booking-date">
                  {reserva.fecha} - {reserva.hora}
                </span>
              </div>
              <div className="booking-details">
                <span className="booking-price">{reserva.precio}</span>
                <div
                  className={`booking-status ${reserva.estado.toLowerCase()}`}
                >
                  {reserva.estado}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Cuidadores */}
      <div className="section-card">
        <div className="section-header">
          <h3>Cuidadores Favoritos</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => handleTabNavigate("caregivers")}
          >
            Ver Todos
          </button>
        </div>
        <div className="caregivers-grid">
          {cuidadores.slice(0, 2).map((cuidador) => (
            <div key={cuidador.id} className="caregiver-card">
              <div className="caregiver-avatar">
                <img src={cuidador.foto} alt={cuidador.nombre} />
                <div
                  className={`availability-dot ${
                    cuidador.disponible ? "available" : "busy"
                  }`}
                ></div>
              </div>
              <div className="caregiver-info">
                <h4>{cuidador.nombre}</h4>
                <p>{cuidador.especialidad}</p>
                <div className="caregiver-rating">
                  <i className="fas fa-star"></i>
                  <span>{cuidador.calificacion}</span>
                  <span>({cuidador.reseñas})</span>
                </div>
                <div className="caregiver-services">
                  {cuidador.servicios.slice(0, 2).map((servicio, index) => (
                    <div key={index} className="service-badge">
                      <img src={servicio.imagen} alt={servicio.nombre} />
                      <span>{servicio.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleReserve(cuidador.id)}
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
