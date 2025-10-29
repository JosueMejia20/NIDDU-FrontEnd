const BookingsTab = ({ reservas, filtro, onFiltroChange, navigate }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mis Reservas</h2>
      <button
        type="button" // ✅ AGREGADO
        className="btn btn-primary"
        onClick={() => navigate("/new-booking")}
      >
        <i className="fas fa-plus"></i> Nueva Reserva
      </button>
    </div>

    <div className="bookings-filters">
      <div className="filter-buttons">
        <button
          type="button" // ✅ AGREGADO
          className={`filter-btn ${filtro === "todas" ? "active" : ""}`}
          onClick={() => onFiltroChange("todas")}
        >
          Todas
        </button>
        <button
          type="button" // ✅ AGREGADO
          className={`filter-btn ${filtro === "activa" ? "active" : ""}`}
          onClick={() => onFiltroChange("activa")}
        >
          Activas
        </button>
        <button
          type="button" // ✅ AGREGADO
          className={`filter-btn ${filtro === "completada" ? "active" : ""}`}
          onClick={() => onFiltroChange("completada")}
        >
          Completadas
        </button>
      </div>
    </div>

    <div className="bookings-detailed-list">
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} className="booking-detailed-card">
            <div className="booking-main">
              <div className="service-icon">
                <i className="fas fa-calendar"></i>
              </div>
              <div className="booking-info-detailed">
                <h4>{reserva.servicio}</h4>
                <p>
                  <strong>Cuidador:</strong> {reserva.cuidador}
                </p>
                <p>
                  <strong>Fecha:</strong> {reserva.fecha}
                </p>
                <p>
                  <strong>Horario:</strong> {reserva.hora}
                </p>
                <p>
                  <strong>Duración:</strong> {reserva.duracion}
                </p>
                <p>
                  <strong>Dirección:</strong> {reserva.direccion}
                </p>
              </div>
            </div>
            <div className="booking-side">
              <div className="booking-price-main">{reserva.precio}</div>
              <div
                className={`booking-status-large ${reserva.estado.toLowerCase()}`}
              >
                {reserva.estado}
              </div>
              <div className="booking-actions">
                <button type="button" className="btn btn-outline btn-sm">
                  Detalles
                </button>{" "}
                {/* ✅ AGREGADO */}
                {reserva.estado === "Activa" && (
                  <button type="button" className="btn btn-primary btn-sm">
                    Modificar
                  </button> // ✅ AGREGADO
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <i className="fas fa-calendar-times"></i>
          <h3>No hay reservas</h3>
          <p>No se encontraron reservas con los filtros seleccionados</p>
          <button
            type="button" // ✅ AGREGADO
            className="btn btn-primary"
            onClick={() => navigate("/new-booking")}
          >
            Crear Mi Primera Reserva
          </button>
        </div>
      )}
    </div>
  </div>
);

export default BookingsTab;
