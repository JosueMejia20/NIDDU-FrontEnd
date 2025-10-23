// components/LoginPage.js
import React, { useState } from 'react';
import '../styles/components/LoginPage.css';

const LoginPage = ({ navigateTo, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular datos de usuario (en una app real esto vendría del backend)
    const userData = {
      id: 1,
      name: 'Carlos Rodríguez',
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    };
    
    // Llamar a la función de login del App.js
    onLogin(userData);
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
              <button type="button" className="btn-social btn-google">
                <i className="fab fa-google"></i>
                Google
              </button>
              <button type="button" className="btn-social btn-facebook">
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