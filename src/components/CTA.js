// components/CTA.js
import React from 'react';
import '../styles/components/CTA.css';

const CTA = ({ setCurrentPage }) => {
  const handleRegisterClick = () => {
    if (setCurrentPage) {
      setCurrentPage('register');
    }
  };

  return (
    <section className="cta" id="contacto">
      <div className="container">
        <div className="cta-content">
          <h2 className="animate-fadeInUp">Únete a la Familia NIDDU</h2>
          <p className="animate-fadeInUp">Descubre por qué miles de dueños de mascotas confían en nosotros para el cuidado de sus mejores amigos.</p>
          <div className="cta-buttons animate-fadeInUp">
            <a href="#" className="btn btn-primary animate-pulse">Descargar la App</a>
            {/* Botón que redirige a registro */}
            <button 
              className="btn btn-secondary"
              onClick={handleRegisterClick}
            >
              Registrarse Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;