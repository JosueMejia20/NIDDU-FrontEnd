import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ServicesTab = () => {
  const { navigate } = useOutletContext();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos de servicios (los que tenías en App.js)
  const serviciosDisponibles = [
    {
      id: 1,
      nombre: "Day Care Diario",
      descripcion:
        "Cuidado durante el día en instalaciones seguras y supervisadas",
      precio: "$25",
      imagen:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      nombre: "Paseos Personalizados",
      descripcion: "Paseos adaptados a las necesidades y energía de tu mascota",
      precio: "$15",
      imagen:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      nombre: "Peluquería Canina",
      descripcion: "Servicio completo de belleza, baño y corte de pelo",
      precio: "$35",
      imagen:
        "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/08/45.jpg",
    },
    {
      id: 4,
      nombre: "Entrenamiento Básico",
      descripcion:
        "Sesiones de entrenamiento para obediencia básica y comandos",
      precio: "$40",
      imagen:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  useEffect(() => {
    // Simular carga de datos (puedes reemplazar con llamada a API real)
    setLoading(true);
    const timer = setTimeout(() => {
      setServicios(serviciosDisponibles);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="tab-content">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Servicios Disponibles</h2>
        <p>Elige el servicio perfecto para tu mascota</p>
      </div>

      <div className="services-grid-detailed">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="service-card-detailed">
            <div className="service-image-detailed">
              <img src={servicio.imagen} alt={servicio.nombre} />
            </div>
            <div className="service-info-detailed">
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
              <div className="service-details-detailed">
                <span className="price">{servicio.precio}/hora</span>
              </div>
              <button
                type="button"
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
