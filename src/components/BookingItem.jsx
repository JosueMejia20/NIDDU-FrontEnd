import React from "react";

function BookingItem({ reserva }) {
  return (
    <div className="booking-item">
      <div className="booking-info">
        <h4>{reserva.servicio}</h4>
        <p>Con {reserva.cuidador}</p>
        <span className="booking-date">{reserva.fecha}</span>
      </div>
      <div className="booking-details">
        <span className="booking-price">{reserva.precio}</span>
        <div className={`booking-status ${reserva.estado.toLowerCase()}`}>
          {reserva.estado}
        </div>
      </div>
    </div>
  );
}

export default BookingItem;
