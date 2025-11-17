import React, { useState } from "react";
import "../../styles/caregiver/ServiceCreation.css";
import { useNavigate } from "react-router-dom";

//TODO: Este utiliza la funcion onSectionChange, cambiar su uso con navigate
const ServiceCreation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    servicePrice: "",
    serviceDuration: "1",
    serviceDescription: "",
    maxPets: "1",
    serviceLocation: "",
    experience: "",
    additionalServices: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        additionalServices: checked
          ? [...prev.additionalServices, value]
          : prev.additionalServices.filter((service) => service !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Servicio creado exitosamente!");
    navigate("/caregiver");
  };

  return (
    <section className="service-creation">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/caregiver")}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Crear Nuevo Servicio</h1>
          <p>Ofrece tus servicios de cuidado de mascotas</p>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Información del Servicio</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceName">Nombre del Servicio *</label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  placeholder="Ej: Paseo Personalizado, Day Care Premium..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceType">Tipo de Servicio *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="paseo">Paseo</option>
                  <option value="daycare">Day Care</option>
                  <option value="guarderia">Guardería Nocturna</option>
                  <option value="peluqueria">Peluquería</option>
                  <option value="entrenamiento">Entrenamiento</option>
                  <option value="visita">Visita a Domicilio</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="servicePrice">Precio por Hora (COP) *</label>
                <input
                  type="number"
                  id="servicePrice"
                  name="servicePrice"
                  value={formData.servicePrice}
                  onChange={handleInputChange}
                  placeholder="25000"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="serviceDuration">Duración Estimada *</label>
                <select
                  id="serviceDuration"
                  name="serviceDuration"
                  value={formData.serviceDuration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">1 hora</option>
                  <option value="2">2 horas</option>
                  <option value="4">4 horas</option>
                  <option value="8">8 horas (Día completo)</option>
                  <option value="12">12 horas (Noche)</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="serviceDescription">
                Descripción del Servicio *
              </label>
              <textarea
                id="serviceDescription"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe detalladamente tu servicio, qué incluye, cómo trabajas..."
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Especificaciones</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="maxPets">Máximo de Mascotas</label>
                <select
                  id="maxPets"
                  name="maxPets"
                  value={formData.maxPets}
                  onChange={handleInputChange}
                >
                  <option value="1">1 mascota</option>
                  <option value="2">2 mascotas</option>
                  <option value="3">3 mascotas</option>
                  <option value="5">5 mascotas</option>
                  <option value="10">10+ mascotas</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="serviceLocation">
                  Ubicación del Servicio *
                </label>
                <select
                  id="serviceLocation"
                  name="serviceLocation"
                  value={formData.serviceLocation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona ubicación</option>
                  <option value="domicilio">A Domicilio</option>
                  <option value="mi-casa">En Mi Casa</option>
                  <option value="ambos">Ambas Opciones</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience">Años de Experiencia *</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  placeholder="3"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Servicios Adicionales</label>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="additionalServices"
                    value="medicacion"
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Administración de medicación
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="additionalServices"
                    value="emergencias"
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Atención de emergencias
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="additionalServices"
                    value="reportes"
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Reportes diarios con fotos
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="additionalServices"
                    value="entrenamiento"
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Entrenamiento básico
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/caregiver")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-rocket"></i> Publicar Servicio
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ServiceCreation;
