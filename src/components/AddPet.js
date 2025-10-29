// components/AddPet.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../styles/components/AddPet.css";

const AddPet = ({ user, onPetAdded }) => {
  // Eliminar prop navigateTo
  const navigate = useNavigate(); // Inicializar navigate
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "Perro",
    raza: "",
    edad: "",
    peso: "",
    alergias: "Ninguna",
    vacunasAlDia: true,
    veterinario: "",
    notas: "",
  });

  const tiposMascota = ["Perro", "Gato", "Conejo", "Ave", "Otro"];
  const razasPerro = [
    "Golden Retriever",
    "Labrador",
    "Bulldog",
    "Poodle",
    "Chihuahua",
    "Pastor Alemán",
    "Mixta",
    "Otra",
  ];
  const razasGato = [
    "Siamés",
    "Persa",
    "Maine Coon",
    "Bengalí",
    "Sphynx",
    "Común Europeo",
    "Mixta",
    "Otra",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaMascota = {
      id: Date.now(),
      ...formData,
      foto:
        formData.tipo === "Perro"
          ? "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
          : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      ultimaVisita: "Nunca",
      veterinario: formData.veterinario || "No especificado",
    };

    if (onPetAdded) {
      onPetAdded(nuevaMascota);
    }

    // Navegar de vuelta al dashboard después de agregar
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Reemplazar navigateTo con navigate
  };

  const getRazasDisponibles = () => {
    return formData.tipo === "Perro"
      ? razasPerro
      : formData.tipo === "Gato"
      ? razasGato
      : ["Mixta", "Otra"];
  };

  return (
    <section className="add-pet">
      <div className="container">
        <div className="add-pet-header">
          <button className="btn btn-back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Agregar Nueva Mascota</h1>
          <p>Completa la información de tu mascota</p>
        </div>

        <div className="add-pet-content">
          <form onSubmit={handleSubmit} className="pet-form">
            <div className="form-section">
              <h3>Información Básica</h3>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre de la Mascota *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Max, Luna, etc."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipo">Tipo de Mascota *</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    {tiposMascota.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="raza">Raza *</label>
                  <select
                    id="raza"
                    name="raza"
                    value={formData.raza}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una raza</option>
                    {getRazasDisponibles().map((raza) => (
                      <option key={raza} value={raza}>
                        {raza}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edad">Edad (años) *</label>
                  <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    step="0.1"
                    required
                    placeholder="Ej: 2.5"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="peso">Peso (kg) *</label>
                  <input
                    type="number"
                    id="peso"
                    name="peso"
                    value={formData.peso}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    required
                    placeholder="Ej: 5.2"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Información Médica</h3>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="alergias">Alergias Conocidas</label>
                  <select
                    id="alergias"
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleChange}
                  >
                    <option value="Ninguna">Ninguna</option>
                    <option value="Polen">Polen</option>
                    <option value="Ciertos alimentos">Ciertos alimentos</option>
                    <option value="Medicamentos">Medicamentos</option>
                    <option value="Picaduras de insectos">
                      Picaduras de insectos
                    </option>
                    <option value="Otras">Otras</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="veterinario">
                    Veterinario de Preferencia
                  </label>
                  <input
                    type="text"
                    id="veterinario"
                    name="veterinario"
                    value={formData.veterinario}
                    onChange={handleChange}
                    placeholder="Ej: Dr. Martínez"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="vacunasAlDia"
                      checked={formData.vacunasAlDia}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    Vacunas al día
                  </label>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notas">Notas Adicionales</label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Información adicional importante sobre tu mascota..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-plus"></i> Agregar Mascota
              </button>
            </div>
          </form>

          <div className="form-preview">
            <h3>Vista Previa</h3>
            <div className="preview-card">
              <div className="preview-avatar">
                <img
                  src={
                    formData.tipo === "Perro"
                      ? "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      : formData.tipo === "Gato"
                      ? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                      : "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  }
                  alt="Preview"
                />
              </div>
              <div className="preview-info">
                <h4>{formData.nombre || "Nombre de la mascota"}</h4>
                <p>
                  {formData.raza || "Raza"} • {formData.edad || "0"} años
                </p>
                <span className="preview-detail">
                  {formData.peso || "0"} kg
                </span>
                <div className="preview-tags">
                  <span className="tag">{formData.tipo}</span>
                  <span
                    className={`tag ${
                      formData.vacunasAlDia ? "vaccinated" : "not-vaccinated"
                    }`}
                  >
                    {formData.vacunasAlDia ? "Vacunado" : "Pendiente vacunas"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPet;
