// components/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/RegisterPage.css";
import DepartamentosSelect from "../components/DepartamentosSelect";

const RegisterCaregiverPage = ({ onRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validar términos
    if (!formData.terms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    // Simular datos de usuario
    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      petType: formData.petType,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    };

    // Registrar usuario
    onRegister(userData);

    // Redirigir al dashboard tras el registro
    navigate("/dashboard");
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Apellido completo *</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu apellido completo"
                  required
                />
              </div>

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
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Pais</label>
                <select
                  id="country"
                  name="country"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                >
                  <option value="Honduras">Honduras</option>
                </select>
              </div>

              <DepartamentosSelect />

              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Ejemplo: Tegucigalpa"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="colony">Colonia</label>
                <input
                  type="text"
                  id="colony"
                  name="colony"
                  placeholder="Ejemplo: Colonia Kennedy"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="file">Foto de identidad</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
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
                placeholder="Mínimo 8 caracteres"
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">
                Acepto los <a href="#">términos y condiciones</a> y la{" "}
                <a href="#">política de privacidad</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Crear Cuenta
            </button>
          </form>

          <div className="login-link">
            <p>
              ¿Ya tienes cuenta?{" "}
              <a href="#login" onClick={goToLogin}>
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterCaregiverPage;
