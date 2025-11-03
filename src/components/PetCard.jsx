import React from "react";

function PetCard({ mascota, onReserve }) {
  return (
    <div className="pet-card">
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
        onClick={() => onReserve(mascota.id)}
      >
        Ver / Reservar
      </button>
    </div>
  );
}

export default PetCard;
