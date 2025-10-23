// components/Services.js - Versión con 4 servicios
import React from 'react';
import '../styles/components/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: 'fas fa-paw',
      title: 'Day-Care Diario',
      description: 'Guardería diurna con espacios seguros y supervisión constante para tu mascota mientras trabajas.',
      color: 'green'
    },
    {
      id: 2,
      icon: 'fas fa-dog',
      title: 'Paseos Personalizados',
      description: 'Paseadores verificados con rutas adaptadas a las necesidades y energía de tu mascota.',
      color: 'blue'
    },
    {
      id: 3,
      icon: 'fas fa-graduation-cap',
      title: 'Entrenamiento Canino',
      description: 'Programas de entrenamiento profesional usando métodos positivos para mejores resultados.',
      color: 'brown'
    },
    {
      id: 4,
      icon: 'fas fa-bath',
      title: 'Peluqueria',
      description: 'Servicios completos de peluquería y estética a domicilio con productos naturales y seguros.',
      color: 'green'
    }
  ];

  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-title">
          <h2>Nuestros Servicios</h2>
          <p>Todo lo que tu mascota necesita para una vida feliz y saludable</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="service-card animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
              <div className={`service-icon icon-${service.color}`}>
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;