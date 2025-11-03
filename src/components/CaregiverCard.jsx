import React from "react";

function CaregiverCard({ cuidador, onReserve }) {
  return (
    <div className="caregiver-card">
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
        onClick={() => onReserve(cuidador.id)}
      >
        Reservar
      </button>
    </div>
  );
}

export default CaregiverCard;
