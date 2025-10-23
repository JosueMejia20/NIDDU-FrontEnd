import React from 'react';
import '../styles/components/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fadeInLeft">
            <h1>NIDDU</h1>
            <h2>Cuidado integral para tus mascotas</h2>
            <p>Conectamos a dueños de mascotas con una red confiable de cuidadores y servicios especializados. Bienestar, comodidad y seguridad en un solo lugar.</p>
            <div className="hero-buttons">
              <a href="#servicios" className="btn btn-primary">Comenzar Ahora</a>
              <a href="#como-funciona" className="btn btn-outline">Cómo Funciona</a>
            </div>
          </div>
          <div className="hero-image animate-fadeInRight">
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Mascotas felices" 
              className="animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;