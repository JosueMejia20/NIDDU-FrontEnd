import React from 'react';
import '../styles/components/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Regístrate',
      description: 'Crea tu cuenta en NIDDU y completa el perfil de tu mascota con sus necesidades y preferencias.'
    },
    {
      number: 2,
      title: 'Busca Servicios',
      description: 'Explora nuestra red de cuidadores verificados y filtra por ubicación, servicios y calificaciones.'
    },
    {
      number: 3,
      title: 'Reserva',
      description: 'Selecciona el servicio que necesitas, elige fecha y hora, y confirma tu reserva de forma segura.'
    },
    {
      number: 4,
      title: 'Disfruta',
      description: 'Recibe actualizaciones en tiempo real y disfruta de la tranquilidad de saber que tu mascota está en buenas manos.'
    }
  ];

  return (
    <section className="how-it-works" id="como-funciona">
      <div className="container">
        <div className="how-it-works-header">
          <h2>¿Cómo Funciona?</h2>
          <p>Encuentra el cuidador perfecto en solo 4 pasos</p>
        </div>
        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <div key={step.number} className="how-it-works-step">
              <div className="step-circle">
                <span className="step-number">{step.number}</span>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;