// OverviewTab.js
import React from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import BookingItem from "./BookingItem";
import CaregiverCard from "./CaregiverCard";

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
          {/* <button
            type="button"
            className="btn btn-outline"
            onClick={() => handleTabNavigate("pets")}
          >
            Ver Todas
          </button> */}
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

      {/* Sección Cuidadores */}
      {/* <div className="section-card">
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
            <CaregiverCard
              key={cuidador.id}
              cuidador={cuidador}
              onReserve={handleReserve}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default OverviewTab;
