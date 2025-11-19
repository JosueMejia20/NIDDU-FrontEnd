import React from "react";

function PetCard({ mascota, onReserve }) {
  return (
    <div className="pet-card" style={{ display: "flex", alignItems: "center" }}>
      <div className="pet-avatar">
        <img src={mascota.foto} alt={mascota.nombre} />
      </div>

      <div className="pet-info" style={{ marginLeft: "15px" }}>
        <h4>{mascota.nombre}</h4>
        <p>
          {mascota.raza} • {mascota.edad} años
        </p>
        <span className="pet-detail">{mascota.peso}</span>
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        style={{ marginLeft: "auto" }}
        onClick={() => onReserve(mascota.id)}
      >
        Ver / Reservar
      </button>
    </div>
  );
}

export default PetCard;
