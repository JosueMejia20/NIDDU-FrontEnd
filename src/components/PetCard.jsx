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
    </div>
  );
}

export default PetCard;
