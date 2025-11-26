import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { obtenerServiciosPorCuidadores } from "../api/cuidador/cuidadoresApi";

const CaregiversTab = () => {
  const { navigate } = useOutletContext();
  const [cuidadores, setCuidadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        setLoading(true);
        setError(null);

        const cuidadoresData = await obtenerServiciosPorCuidadores();
        console.log("Datos de la API:", cuidadoresData);

        setCuidadores(cuidadoresData);
      } catch (error) {
        console.error("Error obteniendo cuidadores:", error);
        setError("Error al cargar los cuidadores");
        // setCuidadores(cuidadoresDataFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchCuidadores();
  }, []);

  // Funcion para obtener imagen por tipo de servicio
  const getServiceImage = (idTipoServicio) => {
    const serviceImages = {
      1: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&w=200&q=80", // Day Care
      2: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80", // Paseos
      3: "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/08/45.jpg", // Peluqueria
      4: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&w=200&q=80", // Entrenamiento
    };

    return (
      serviceImages[idTipoServicio] ||
      "https://placehold.co/100x100?text=Servicio"
    );
  };

  // Datos de fallback
  const cuidadoresDataFallback = [
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
      ],
    },
  ];

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

  if (error) {
    return (
      <div className="tab-content">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>{error}</h3>
          <p>Por favor, intenta nuevamente más tarde</p>
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
            <div
              key={cuidador.cuidador?.idCuidador}
              className="caregiver-detailed-card"
            >
              <div className="caregiver-header-dashboard">
                <div className="caregiver-avatar-large">
                  <img
                    src={
                      cuidador.cuidador?.fotoPerfil ||
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                    }
                    alt={cuidador.cuidador?.persona?.nombres}
                  />
                </div>
                <div className="caregiver-main-info">
                  <h3>
                    {cuidador.cuidador?.persona?.nombres}{" "}
                    {cuidador.cuidador?.persona?.apellidos}
                  </h3>
                  <div className="caregiver-stats">
                    <div className="stat">
                      <i className="fas fa-star"></i>
                      <span>
                        {/* ESTA PARTE FALTA POR HACER */}
                        <strong>{cuidador.calificacion || "N/A"}</strong> (
                        {cuidador.reseñas || 0} reseñas)
                      </span>
                    </div>
                    <div className="stat">
                      <i className="fas fa-clock"></i>
                      <span>
                        {cuidador.cuidador?.experiencia || "Sin experiencia"}{" "}
                        años de experiencia
                      </span>
                    </div>
                  </div>

                  <div className="caregiver-services-detailed">
                    <h4>Servicios que ofrece:</h4>
                    <div className="services-grid-mini">
                      {(cuidador.tipoServicios || []).map((servicio, index) => (
                        <div key={index} className="service-item">
                          <img
                            src={getServiceImage(servicio.idTipoServicio)}
                            alt={servicio.nombreServicio}
                          />
                          <div className="service-info-mini">
                            <strong>{servicio.nombreServicio}</strong>
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
