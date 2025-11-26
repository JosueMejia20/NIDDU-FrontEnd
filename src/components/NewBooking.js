// components/NewBooking.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../styles/components/NewBooking.css";

const NewBooking = ({ mascotas }) => {
  // Eliminar prop navigateTo
  const navigate = useNavigate(); // Inicializar navigate
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    mascota: "",
    duracion: "1",
    notas: "",
  });

  const servicios = [
    {
      id: 1,
      nombre: "Day Care Diario",
      descripcion:
        "Cuidado durante el día en instalaciones seguras y supervisadas",
      precio: 25,
      imagen:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      nombre: "Paseo Personalizado",
      descripcion: "Paseos adaptados a las necesidades y energía de tu mascota",
      precio: 15,
      imagen:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      nombre: "Peluquería Canina",
      descripcion: "Servicio completo de belleza, baño y corte de pelo",
      precio: 35,
      imagen:
        "https://www.clinicaveterinariamh.com/wp-content/uploads/2023/08/45.jpg",
    },
    {
      id: 4,
      nombre: "Entrenamiento Canino",
      descripcion:
        "Programas de entrenamiento profesional usando métodos positivos para mejores resultados.",
      precio: 40,
      imagen:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const cuidadores = [
    {
      id: 1,
      nombre: "Ana García",
      especialidad: "Day Care, Paseos",
      calificacion: 4.9,
      reseñas: 42,
      experiencia: "3 años",
      precioHora: 25000,
      disponible: true,
      foto: "https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1",
      servicios: ["Day Care", "Paseos"],
    },
    {
      id: 2,
      nombre: "Carlos López",
      especialidad: "Paseos, Entrenamiento",
      calificacion: 4.8,
      reseñas: 35,
      experiencia: "2 años",
      precioHora: 20000,
      disponible: true,
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      servicios: ["Paseos", "Entrenamiento"],
    },
  ];

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleCaregiverSelect = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setStep(3);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la reserva
    alert("Reserva creada exitosamente");
    navigate("/new-booking"); // Navegar al dashboard en la pestaña de reservas
  };

  const calcularTotal = () => {
    if (!selectedService || !formData.duracion) return 0;
    return selectedService.precio * parseInt(formData.duracion);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };

  return (
    <section className="new-booking">
      <div className="container">
        <div className="booking-header">
          <button
            className="back-btn"
            onClick={
              () => (step > 1 ? setStep(step - 1) : navigate("/dashboard")) // Reemplazar navigateTo
            }
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Nueva Reserva</h1>
          <div className="step-indicator">
            <span className={`step ${step >= 1 ? "active" : ""}`}>1</span>
            <span className={`step ${step >= 2 ? "active" : ""}`}>2</span>
            <span className={`step ${step >= 3 ? "active" : ""}`}>3</span>
          </div>
        </div>

        {step === 1 && (
          <div className="booking-step">
            <h2>Selecciona un Servicio</h2>
            <div className="services-grid">
              {servicios.map((servicio) => (
                <div
                  key={servicio.id}
                  className="service-card"
                  onClick={() => handleServiceSelect(servicio)}
                >
                  <div className="service-image">
                    <img src={servicio.imagen} alt={servicio.nombre} />
                  </div>
                  <div className="service-info">
                    <h3>{servicio.nombre}</h3>
                    <p>{servicio.descripcion}</p>
                    <div className="service-details">
                      <span className="price">
                        {formatPrice(servicio.precio)}/hora
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step">
            <h2>Elige un Cuidador</h2>
            <p className="step-subtitle">Para: {selectedService?.nombre}</p>

            <div className="caregivers-list">
              {cuidadores.map((cuidador) => (
                <div
                  key={cuidador.id}
                  className="caregiver-card"
                  onClick={() => handleCaregiverSelect(cuidador)}
                >
                  <div className="caregiver-header-dashboard">
                    <div className="caregiver-avatar">
                      <img src={cuidador.foto} alt={cuidador.nombre} />
                      <div
                        className={`availability-dot ${
                          cuidador.disponible ? "available" : "busy"
                        }`}
                      ></div>
                    </div>
                    <div className="caregiver-info">
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
                          <span>{cuidador.experiencia} experiencia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="caregiver-price">
                    {formatPrice(cuidador.precioHora)}/hora
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step">
            <h2>Completa tu Reserva</h2>

            <div className="booking-summary">
              <div className="summary-card">
                <h3>Resumen de la Reserva</h3>
                <div className="summary-item">
                  <span>Servicio:</span>
                  <span>{selectedService?.nombre}</span>
                </div>
                <div className="summary-item">
                  <span>Cuidador:</span>
                  <span>{selectedCaregiver?.nombre}</span>
                </div>
                <div className="summary-item">
                  <span>Precio base:</span>
                  <span>{formatPrice(selectedService?.precio || 0)}</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>{formatPrice(calcularTotal())}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Fecha *</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="form-group">
                  <label>Hora *</label>
                  <select
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    {horarios.map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mascota *</label>
                  <select
                    name="mascota"
                    value={formData.mascota}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una mascota</option>
                    {mascotas.map((mascota) => (
                      <option key={mascota.id} value={mascota.id}>
                        {mascota.nombre} ({mascota.tipo})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Duración (horas) *</label>
                  <select
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">1 hora</option>
                    <option value="2">2 horas</option>
                    <option value="4">4 horas</option>
                    <option value="8">8 horas (Día completo)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Notas adicionales (opcional)</label>
                <textarea
                  name="notas"
                  value={formData.notas}
                  onChange={handleInputChange}
                  placeholder="Instrucciones especiales, alergias, comportamiento..."
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-calendar-check"></i>
                Confirmar Reserva - {formatPrice(calcularTotal())}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewBooking;
