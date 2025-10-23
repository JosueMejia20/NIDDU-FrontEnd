// components/RegisterPage.js
import React from 'react';
import '../styles/components/RegisterPage.css';

const RegisterPage = ({ navigateTo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario de registro enviado');
  };

  return (
    <section className="register-page">
      <div className="container">
        <div className="register-content">
          <div className="register-header">
            <h1>Únete a NIDDU</h1>
            <p>Comienza a cuidar de tu mascota como se merece</p>
          </div>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Tu nombre completo" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo electrónico *</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="tu@email.com" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="+1 234 567 890" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="pet-type">Tipo de mascota *</label>
                <select id="pet-type" required>
                  <option value="">Selecciona una opción</option>
                  <option value="dog">Perro</option>
                  <option value="cat">Gato</option>
                  <option value="both">Ambos</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Mínimo 8 caracteres" 
                required 
                minLength="8"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar contraseña *</label>
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Repite tu contraseña" 
                required 
              />
            </div>
            
            <div className="form-group checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a>
              </label>
            </div>
            
            <button type="submit" className="btn btn-primary btn-full">
              Crear Cuenta
            </button>
          </form>
          
          <div className="login-link">
            <p>¿Ya tienes cuenta? 
              <a 
                href="#login" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('login');
                }}
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Asegúrate de que esta línea esté al final
export default RegisterPage;