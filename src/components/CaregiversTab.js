import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const CaregiversTab = () => {
  const { navigate } = useOutletContext();
  const [cuidadores, setCuidadores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos de cuidadores (los que tenías en App.js)
  const cuidadoresData = [
    {
      id: 1,
      nombre: "Ana García",
      calificacion: 4.9,
      reseñas: 42,
      experiencia: "3 años",
      disponible: true,
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      servicios: [
        {
          nombre: "Day Care",
          imagen:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&w=200&q=80",
        },
        {
          nombre: "Paseos",
          imagen:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80",
        },
        {
          nombre: "Entrenamiento",
          imagen:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&w=200&q=80",
        },
        {
          nombre: "Peluquería",
          imagen:
            "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/08/45.jpg",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simular carga de datos (para luego reemplazar con API)
    setLoading(true);
    const timer = setTimeout(() => {
      setCuidadores(cuidadoresData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="tab-content">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando cuidadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Cuidadores</h2>
      </div>

      <div className="caregivers-detailed-grid">
        {cuidadores.length > 0 ? (
          cuidadores.map((cuidador) => (
            <div key={cuidador.id} className="caregiver-detailed-card">
              <div className="caregiver-header-dashboard">
                <div className="caregiver-avatar-large">
                  <img src={cuidador.foto} alt={cuidador.nombre} />
                </div>
                <div className="caregiver-main-info">
                  <h3>{cuidador.nombre}</h3>
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
                  </div>

                  <div className="caregiver-services-detailed">
                    <h4>Servicios que ofrece:</h4>
                    <div className="services-grid-mini">
                      {cuidador.servicios.map((servicio, index) => (
                        <div key={index} className="service-item">
                          <img src={servicio.imagen} alt={servicio.nombre} />
                          <div className="service-info-mini">
                            <strong>{servicio.nombre}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="caregiver-actions">
                <button
                  type="button"
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
};

export default CaregiversTab;
