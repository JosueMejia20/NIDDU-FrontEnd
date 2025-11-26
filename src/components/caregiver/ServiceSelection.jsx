import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caregiver/ServiceSelection.css";

const ServiceSelection = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  // Servicios predefinidos con precios fijos
  const predefinedServices = [
    {
      id: 1,
      name: "Day Care Diario",
      description:
        "Cuidado durante el día en instalaciones seguras y supervisadas",
      price: "$25",
      icon: "fa-home",
    },
    {
      id: 2,
      name: "Paseos Personalizados",
      description: "Paseos adaptados a las necesidades y energía de tu mascota",
      price: "$15",
      icon: "fa-walking",
    },
    {
      id: 3,
      name: "Peluquería Canina",
      description: "Servicio completo de belleza, baño y corte de pelo",
      price: "$35",
      icon: "fa-cut",
    },
    {
      id: 4,
      name: "Entrenamiento Básico",
      description:
        "Sesiones de entrenamiento para obediencia básica y comandos",
      price: "$40",
      icon: "fa-graduation-cap",
    },
  ];

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSaveServices = () => {
    console.log("Servicios seleccionados:", selectedServices);
    // Aquí irá la lógica para guardar en la API
    // navigate("/caregiver"); // Redirigir después de guardar
  };

  return (
    <section className="service-selection">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/caregiver")}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Seleccionar Servicios</h1>
          <p>Elige los servicios que ofrecerás a los clientes</p>
        </div>

        <div className="services-selection-grid">
          {predefinedServices.map((service) => (
            <div
              key={service.id}
              className={`service-selection-card ${
                selectedServices.includes(service.id) ? "selected" : ""
              }`}
              onClick={() => toggleService(service.id)}
            >
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>

              <div className="service-content">
                <h3>{service.name}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-details">
                  <div className="service-price">{service.price}/hora</div>
                </div>

                <div className="selection-indicator">
                  {selectedServices.includes(service.id) ? (
                    <i className="fas fa-check-circle selected"></i>
                  ) : (
                    <i className="far fa-circle"></i>
                  )}
                  <span>
                    {selectedServices.includes(service.id)
                      ? "Seleccionado"
                      : "Seleccionar"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="selection-actions">
          <div className="selection-summary">
            <p>
              <strong>{selectedServices.length}</strong> servicio(s)
              seleccionado(s)
            </p>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/caregiver")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveServices}
              disabled={selectedServices.length === 0}
            >
              <i className="fas fa-save"></i> Guardar Servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
