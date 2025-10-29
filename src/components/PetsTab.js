const PetsTab = ({ mascotas, navigate }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mis Mascotas</h2>
      <button
        type="button" // AGREGADO
        className="btn btn-secondary"
        onClick={() => navigate("/add-pet")}
      >
        <i className="fas fa-paw"></i> Agregar Mascota
      </button>
    </div>

    <div className="pets-detail-grid">
      {mascotas.map((mascota) => (
        <div key={mascota.id} className="pet-detail-card">
          <div className="pet-header">
            <div className="pet-main-info">
              <div className="pet-avatar large">
                <img src={mascota.foto} alt={mascota.nombre} />
              </div>
              <div className="pet-details">
                <h3>{mascota.nombre}</h3>
                <p>
                  {mascota.raza} • {mascota.edad} años
                </p>
                <div className="pet-stats">
                  <span>
                    <i className="fas fa-weight"></i> {mascota.peso}
                  </span>
                  <span>
                    <i className="fas fa-allergies"></i> {mascota.alergias}
                  </span>
                </div>
              </div>
            </div>
            <div className="pet-actions">
              <button type="button" className="btn btn-outline btn-sm">
                {" "}
                {/* AGREGADO */}
                <i className="fas fa-edit"></i> Editar
              </button>
              <button
                type="button" // AGREGADO
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/new-booking")}
              >
                <i className="fas fa-calendar-plus"></i> Reservar
              </button>
            </div>
          </div>

          <div className="pet-medical-info">
            <h4>Información Médica</h4>
            <div className="medical-grid">
              <div className="medical-item">
                <label>Vacunas al día:</label>
                <span className="status yes">Sí</span>
              </div>
              <div className="medical-item">
                <label>Última visita:</label>
                <span>{mascota.ultimaVisita}</span>
              </div>
              <div className="medical-item">
                <label>Veterinario:</label>
                <span>{mascota.veterinario}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PetsTab;
