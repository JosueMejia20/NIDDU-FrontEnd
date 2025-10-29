const CaregiversTab = ({
  cuidadores,
  filtro,
  busqueda,
  onFiltroChange,
  onBusquedaChange,
  navigate,
}) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Cuidadores</h2>
      <div className="search-box large">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Buscar cuidadores..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>
    </div>

    <div className="caregivers-filters">
      <div className="filter-tags">
        <span
          className={`filter-tag ${filtro === "todos" ? "active" : ""}`}
          onClick={() => onFiltroChange("todos")}
        >
          Todos
        </span>
        <span
          className={`filter-tag ${filtro === "disponibles" ? "active" : ""}`}
          onClick={() => onFiltroChange("disponibles")}
        >
          Disponibles
        </span>
        <span
          className={`filter-tag ${filtro === "day care" ? "active" : ""}`}
          onClick={() => onFiltroChange("day care")}
        >
          Day Care
        </span>
        <span
          className={`filter-tag ${filtro === "paseos" ? "active" : ""}`}
          onClick={() => onFiltroChange("paseos")}
        >
          Paseos
        </span>
      </div>
    </div>

    <div className="caregivers-detailed-grid">
      {cuidadores.length > 0 ? (
        cuidadores.map((cuidador) => (
          <div key={cuidador.id} className="caregiver-detailed-card">
            <div className="caregiver-header">
              <div className="caregiver-avatar-large">
                <img src={cuidador.foto} alt={cuidador.nombre} />
                <div
                  className={`availability-badge ${
                    cuidador.disponible ? "available" : "busy"
                  }`}
                >
                  {cuidador.disponible ? "Disponible" : "No disponible"}
                </div>
              </div>
              <div className="caregiver-main-info">
                <h3>{cuidador.nombre}</h3>
                <p className="specialty">{cuidador.especialidad}</p>
                <div className="caregiver-stats">
                  <div className="stat">
                    <i className="fas fa-star"></i>
                    <span>
                      <strong>{cuidador.calificacion}</strong> (
                      {cuidador.reseñas} reseñas)
                    </span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-clock"></i>
                    <span>{cuidador.experiencia} de experiencia</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-dollar-sign"></i>
                    <span>{cuidador.precioHora}/hora</span>
                  </div>
                </div>

                <div className="caregiver-services-detailed">
                  <h4>Servicios que ofrece:</h4>
                  <div className="services-grid-mini">
                    {cuidador.servicios.map((servicio, index) => (
                      <div key={index} className="service-item">
                        <img src={servicio.imagen} alt={servicio.nombre} />
                        <div className="service-info-mini">
                          <strong>{servicio.nombre}</strong>
                          <span>{servicio.descripcion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="caregiver-actions">
              <button type="button" className="btn btn-outline">
                {" "}
                {/* ✅ AGREGADO */}
                <i className="fas fa-heart"></i> Favorito
              </button>
              <button
                type="button" // ✅ AGREGADO
                className="btn btn-primary"
                disabled={!cuidador.disponible}
                onClick={() => navigate("/new-booking")}
              >
                <i className="fas fa-calendar-plus"></i> Reservar
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <i className="fas fa-users-slash"></i>
          <h3>No se encontraron cuidadores</h3>
          <p>Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  </div>
);

export default CaregiversTab;
