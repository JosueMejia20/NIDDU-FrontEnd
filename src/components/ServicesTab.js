import { useOutletContext } from "react-router-dom";

const ServicesTab = ({ servicios }) => {
  const { navigate } = useOutletContext();

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Servicios Disponibles</h2>
        <p>Elige el servicio perfecto para tu mascota</p>
      </div>

      <div className="services-grid-detailed">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="service-card-detailed">
            {servicio.popular && (
              <div className="popular-badge">Más Popular</div>
            )}
            <div className="service-image-detailed">
              <img src={servicio.imagen} alt={servicio.nombre} />
            </div>
            <div className="service-info-detailed">
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
              <div className="service-details-detailed">
                <span>
                  <i className="fas fa-clock"></i> {servicio.duracion}
                </span>
                <span className="price">{servicio.precio}</span>
              </div>
              <button
                type="button" // AGREGADO
                className="btn btn-primary btn-full"
                onClick={() => navigate("/new-booking")}
              >
                <i className="fas fa-calendar-plus"></i> Reservar Ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
