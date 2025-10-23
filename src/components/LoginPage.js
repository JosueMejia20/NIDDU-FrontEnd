// components/LoginPage.js
import React from 'react';
import '../styles/components/LoginPage.css';

const LoginPage = ({ navigateTo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de login
    alert('Inicio de sesión exitoso');
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-content">
          <div className="login-header">
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido de vuelta a NIDDU</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="tu@email.com" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Tu contraseña" 
                required 
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordarme</label>
              </div>
              <a href="#forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            <button type="submit" className="btn btn-primary btn-full">
              Iniciar Sesión
            </button>
          </form>
          
          <div className="login-footer">
            <p>¿No tienes cuenta? 
              <a 
                href="#registro" 
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('register');
                }}
              >
                Regístrate aquí
              </a>
            </p>
          </div>
          
          <div className="social-login">
            <div className="divider">
              <span>O inicia sesión con</span>
            </div>
            <div className="social-buttons">
              <button className="btn-social btn-google">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button className="btn-social btn-facebook">
                <i className="fab fa-facebook-f"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;