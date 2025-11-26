import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { obtenerTiposServicios } from "../api/tiposServicios/tiposServiciosApi";

const ServicesTab = () => {
  const { navigate } = useOutletContext();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener imagen por tipo de servicio
  const getServiceImage = (idTipoServicio) => {
    const serviceImages = {
      1: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Day Care
      2: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Paseos
      3: "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/08/45.jpg", // Peluquería
      4: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Entrenamiento
    };

    return (
      serviceImages[idTipoServicio] ||
      "https://placehold.co/600x400?text=Servicio"
    );
  };

  // Función para formatear precio
  const formatPrice = (precio) => {
    return `$${precio}/hora`;
  };

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        setError(null);

        // Llamar a la API real
        const serviciosData = await obtenerTiposServicios();
        console.log("Datos de servicios desde API:", serviciosData);

        // Mapear los datos de la API al formato que necesita el componente
        const serviciosFormateados = serviciosData.map((servicio) => ({
          id: servicio.idTipoServicio,
          nombre: servicio.nombreServicio,
          descripcion: servicio.descripcion || "Descripción no disponible",
          precio: formatPrice(servicio.precioHora || "0"),
          imagen: getServiceImage(servicio.idTipoServicio),
        }));

        setServicios(serviciosFormateados);
      } catch (error) {
        console.error("Error obteniendo servicios:", error);
        setError("Error al cargar los servicios");

        // Datos de fallback por si la API falla
        const serviciosFallback = [
          {
            id: 1,
            nombre: "Day Care Diario",
            descripcion:
              "Cuidado durante el día en instalaciones seguras y supervisadas",
            precio: "$25/hora",
            imagen:
              "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          },
          {
            id: 2,
            nombre: "Paseos Personalizados",
            descripcion:
              "Paseos adaptados a las necesidades y energía de tu mascota",
            precio: "$15/hora",
            imagen:
              "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          },
        ];
        setServicios(serviciosFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
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
        <h2>Servicios Disponibles</h2>
        <p>Elige el servicio perfecto para tu mascota</p>
      </div>

      <div className="services-grid-detailed">
        {servicios.length > 0 ? (
          servicios.map((servicio) => (
            <div key={servicio.id} className="service-card-detailed">
              <div className="service-image-detailed">
                <img src={servicio.imagen} alt={servicio.nombre} />
              </div>
              <div className="service-info-detailed">
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>
                <div className="service-details-detailed">
                  <span className="price">{servicio.precio}</span>
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
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-concierge-bell"></i>
            <h3>No hay servicios disponibles</h3>
            <p>No se encontraron servicios en este momento</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesTab;
