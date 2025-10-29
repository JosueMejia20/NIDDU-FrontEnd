// components/CTA.js
import React from "react";
import "../styles/components/CTA.css";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta" id="contacto">
      <div className="container">
        <div className="cta-content">
          <h2 className="animate-fadeInUp">Únete a la Familia NIDDU</h2>
          <p className="animate-fadeInUp">
            Descubre por qué miles de dueños de mascotas confían en nosotros
            para el cuidado de sus mejores amigos.
          </p>
          <div className="cta-buttons animate-fadeInUp">
            <a
              href="https://play.google.com/store/apps"
              className="btn btn-primary animate-pulse"
            >
              Descargar la App
            </a>
            {/* Botón que redirige a registro */}
            <Link to="/register" className="btn btn-secondary">
              Registrarse Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
