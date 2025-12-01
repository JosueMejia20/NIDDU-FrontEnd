import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caregiver/ServiceSelection.css";
import { obtenerTiposServicios } from "../../api/tiposServicios/tiposServiciosApi";
import { getServicesByCaregiverId } from "../../api/cuidador/cuidadoresApi";

const ServiceSelection = ({ user }) => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [serviciosDelCuidador, setServiciosDelCuidador] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getServiceIcon = (idTipoServicio) => {
    const serviceIcons = {
      1: "fa-home", // Day Care
      2: "fa-walking", // Paseos
      3: "fa-cut", // Peluqueria
      4: "fa-graduation-cap", // Entrenamiento
    };
    return serviceIcons[idTipoServicio] || "fa-paw";
  };

  const formatPrice = (precio) => {
    return `$${precio}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar todos los servicios disponibles
        const serviciosData = await obtenerTiposServicios();

        console.log("Servicios:", serviciosData);

        // Cargar servicios que ya tiene el cuidador
        const cuidadorData = await getServicesByCaregiverId(user?.idCuidador);
        const serviciosCuidador = cuidadorData.tipoServicios || [];

        console.log("Servicios del cuidador:", serviciosCuidador);

        // Obtener IDs de servicios que ya tiene el cuidador
        const serviciosCuidadorIds = serviciosCuidador.map(
          (servicio) => servicio.idTipoServicio
        );

        // Formatear servicios disponibles
        const serviciosFormateados = serviciosData.map((servicio) => ({
          id: servicio.idTipoServicio,
          name: servicio.nombreServicio,
          description: servicio.descripcion,
          price: formatPrice(servicio.precioHora),
          icon: getServiceIcon(servicio.idTipoServicio),
          // Agregar propiedad para saber si ya lo tiene el cuidador
          yaOfrecido: serviciosCuidadorIds.includes(servicio.idTipoServicio),
        }));

        setServicios(serviciosFormateados);
        setServiciosDelCuidador(serviciosCuidador);

        // NO pre-seleccionar automaticamente - dejar selectedServices vacio inicialmente
        setSelectedServices([]);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError(
          "Error al cargar los servicios. Por favor, intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.idCuidador) {
      fetchData();
    }
  }, [user?.idCuidador]);

  const toggleService = (serviceId, yaOfrecido) => {
    // Si ya esta ofrecido (bloqueado), no hacer nada
    if (yaOfrecido) return;

    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSaveServices = () => {
    console.log("Servicios seleccionados para agregar:", selectedServices);
    // Aqui ira la logica para guardar SOLO los nuevos servicios en la API
    // navigate("/caregiver"); // Redirigir despues de guardar
  };

  // Calcular si hay cambios reales (servicios nuevos seleccionados)
  const hayCambios = selectedServices.length > 0;

  if (loading) {
    return (
      <section className="service-selection-section">
        <div className="container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando servicios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && servicios.length === 0) {
    return (
      <section className="service-selection-section">
        <div className="container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>{error}</h3>
            <button
              className="btn-service-selection btn-primary-service-selection"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="service-selection-section">
      <div className="container">
        <div className="page-header-service-selection">
          <button
            className="btn-back-service-selection"
            onClick={() => navigate("/caregiver")}
          >
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Seleccionar Servicios</h1>
          <p>Elige servicios adicionales que quieras ofrecer</p>
        </div>

        <div className="services-selection-grid-service-selection">
          {servicios.map((service) => {
            const estaBloqueado = service.yaOfrecido;
            const estaSeleccionado = selectedServices.includes(service.id);

            return (
              <div
                key={service.id}
                className={`service-selection-card-service-selection ${
                  estaSeleccionado ? "selected-service-selection" : ""
                } ${estaBloqueado ? "blocked-service-selection" : ""}`}
                onClick={() => toggleService(service.id, estaBloqueado)}
              >
                <div className="service-icon-service-selection">
                  <i className={`fas ${service.icon}`}></i>
                </div>

                <div className="service-content-service-selection">
                  <h3>{service.name}</h3>
                  <p className="service-description-service-selection">
                    {service.description}
                  </p>

                  <div className="service-details-service-selection">
                    <div className="service-price-service-selection">
                      {service.price}/hora
                    </div>
                  </div>

                  <div className="selection-indicator-service-selection">
                    {estaBloqueado ? (
                      <>
                        <i className="fas fa-check-circle offered-icon"></i>
                        <span>Ya Ofrecido</span>
                      </>
                    ) : estaSeleccionado ? (
                      <>
                        <i className="fas fa-check-circle selected-service-selection"></i>
                        <span>Agregar</span>
                      </>
                    ) : (
                      <>
                        <i className="far fa-circle"></i>
                        <span>Seleccionar</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="selection-actions-service-selection">
          <div className="selection-summary-service-selection">
            <p>
              <strong>{selectedServices.length}</strong> servicio(s) nuevo(s)
              para agregar
            </p>
            {serviciosDelCuidador.length > 0 && (
              <p className="servicios-actuales">
                <small>
                  <i className="fas fa-info-circle"></i>
                  Actualmente ofreces {serviciosDelCuidador.length} servicio(s)
                </small>
              </p>
            )}
          </div>

          <div className="action-buttons-service-selection">
            <button
              type="button"
              className="btn-service-selection btn-outline-service-selection"
              onClick={() => navigate("/caregiver")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn-service-selection btn-primary-service-selection"
              onClick={handleSaveServices}
              disabled={!hayCambios} // Solo habilitado si hay servicios nuevos
            >
              <i className="fas fa-save"></i> Guardar Servicios Nuevos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
