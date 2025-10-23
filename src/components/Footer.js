import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>NIDDU</h3>
            <p>Plataforma integral de cuidado para mascotas. Conectamos dueños con una red confiable de cuidadores y servicios especializados.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Servicios</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-paw"></i> Day-Care</a></li>
              <li><a href="#"><i className="fas fa-dog"></i> Paseadores</a></li>
              <li><a href="#"><i className="fas fa-graduation-cap"></i> Entrenamiento</a></li>
              <li><a href="#"><i className="fas fa-bath"></i> Peluquería</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><a href="#inicio"><i className="fas fa-chevron-right"></i> Inicio</a></li>
              <li><a href="#servicios"><i className="fas fa-chevron-right"></i> Servicios</a></li>
              <li><a href="#como-funciona"><i className="fas fa-chevron-right"></i> Cómo Funciona</a></li>
              <li><a href="#testimonios"><i className="fas fa-chevron-right"></i> Testimonios</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Preguntas Frecuentes</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Política de Privacidad</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-map-marker-alt"></i> Av. Principal 123, Ciudad</a></li>
              <li><a href="#"><i className="fas fa-phone"></i> +1 234 567 890</a></li>
              <li><a href="#"><i className="fas fa-envelope"></i> hola@niddu.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} NIDDU. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;