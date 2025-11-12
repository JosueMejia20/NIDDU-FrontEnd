// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { validarCredenciales } from "../api/usuarios/usuariosApi";
import { useNavigate } from "react-router-dom";
import "../styles/components/LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData; // extraemos los valores correctamente

    if (!email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const usuario = await validarCredenciales(email, password);
      
      if (!usuario) {
        alert("Correo o contraseña incorrectos");
        return;
      }

      console.log("Usuario validado:", usuario);

      // Guardamos el usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Ejecutamos callback de login (si necesitas actualizar estado global)
      if (onLogin) onLogin(usuario);

      // Redirigimos al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al validar credenciales:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
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
            <p>
              ¿No tienes cuenta?{" "}
              <a href="#registro" onClick={goToRegister}>
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
                <i className="fab fa-google"></i> Google
              </button>
              <button type="button" className="btn-social btn-facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
