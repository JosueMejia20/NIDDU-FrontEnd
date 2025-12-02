// components/RegisterPage.js
import React, { useState } from "react";
import { registrarUsuario } from "../api/usuarios/usuariosApi";

import { useNavigate } from "react-router-dom";
import "../styles/components/RegisterPage.css";
import DepartamentosSelect from "../components/DepartamentosSelect";
import { validarCredenciales } from "../api/usuarios/usuariosApi";

const RegisterPage = ({ onRegister }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!formData.terms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    // Estructura del JSON esperada por tu backend
    const usuarioData = {
      correo: formData.email,
      contrasena: formData.password,
      idTipoUsuario: 2, // Ajusta según el tipo de usuario
      idEstadoUsuario: 1,
      fotoPerfil: "default.jpg",
      persona: {
        nombres: formData.name,
        apellidos: formData.apellido,
        telefono: formData.phone,
      },
      direcciones: [
        {
          ciudad: formData.city,
          colonia: formData.colony,
          departamento: {
            idDepartamento: formData.departamentoId || 1,
          },
        },
      ],
    };

    console.log(" Enviando JSON al backend:", usuarioData);

    try {
      const response = await registrarUsuario(usuarioData);
      console.log(" Respuesta del backend:", response);
      alert("Usuario registrado correctamente ");
      // Registrar usuario

      const datosUsuario = await validarCredenciales(
        usuarioData.correo,
        usuarioData.contrasena
      );

      //console.log("PRUEBAAAAAAAAAAAAAAAAAA: ", datosUsuario);
      //AAAAAA
      onRegister(datosUsuario);

      // Guardar datos en memoria
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));

      // Redirigir al dashboard tras el registro
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error(" Error del servidor:", error.response.data);
        alert(`Error del servidor: ${error.response.data}`);
      } else if (error.request) {
        console.error(" Sin respuesta del servidor:", error.request);
        alert("No se pudo conectar con el servidor");
      } else {
        console.error(" Error al configurar la petición:", error.message);
        alert("Error en el envío del formulario");
      }
    }
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleDepartamentoChange = (idDepartamento) => {
    setFormData({
      ...formData,
      departamentoId: idDepartamento,
    });
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
                  value={formData.apellido}
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

              <DepartamentosSelect
                value={formData.departamentoId}
                onDepartamentoChange={handleDepartamentoChange}
              />

              <div className="form-group">
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
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
                  value={formData.colony || ""}
                  onChange={handleChange}
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
                Acepto los <a>términos y condiciones</a> y la{" "}
                <a>política de privacidad</a>
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

            <p style={{ marginTop: "20px" }}>
              ¿Quieres ser cuidador?{" "}
              <a
                href="/registerCaregiver"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/registerCaregiver");
                }}
              >
                Registrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
