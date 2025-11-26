import React, { useState } from "react";
import "../../styles/caregiver/SettingsSection.css";
import { useNavigate } from "react-router-dom";

//TODO: Este utiliza la funcion onSectionChange, cambiar su uso con navigate
const SettingsSection = ({ user }) => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingReminders: true,
    autoAvailability: false,
    clientMessages: true,
    profile: {
      fullName: "Ana García",
      email: "ana.garcia@niddu.com",
      phone: "+57 300 123 4567",
      location: "Bogotá, Colombia",
      bio: "Soy cuidadora profesional con 3 años de experiencia. Me encantan los animales y me especializo en cuidado diurno y paseos personalizados.",
    },
  });

  const handleToggleChange = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleProfileChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleSaveProfile = () => {
    alert("¡Cambios guardados exitosamente!");
  };

  const handleExportData = () => {
    alert("Iniciando descarga de datos...");
  };

  const handleDeactivateAccount = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres desactivar tu cuenta temporalmente?"
      )
    ) {
      alert("Cuenta desactivada temporalmente");
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "¿ESTÁS SEGURO? Esta acción no se puede deshacer. Se eliminarán todos tus datos permanentemente."
      )
    ) {
      alert("Cuenta programada para eliminación");
    }
  };

  return (
    <section className="settings-section">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/caregiver")}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Configuración</h1>
          <p>Personaliza tu cuenta y preferencias</p>
        </div>

        <div className="settings-grid">
          {/* Perfil Público */}
          <div className="settings-card">
            <h3>Perfil Público</h3>
            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                  alt="Ana García"
                />
                <div className="change-avatar">
                  <i className="fas fa-camera"></i>
                </div>
              </div>
              <div className="profile-info">
                <h4>
                  {user?.persona?.nombres} {user?.persona?.apellidos}
                </h4>
                <p>⭐ 4.9 (42 reseñas)</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Nombre Completo</label>
                <input
                  type="text"
                  id="fullName"
                  value={`${user?.persona?.nombres || ""} ${
                    user?.persona?.apellidos || ""
                  }`}
                  onChange={(e) =>
                    handleProfileChange("fullName", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={user?.correo}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  value={user?.persona?.telefono}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  value={user?.direcciones?.[0]?.ciudad}
                  onChange={(e) =>
                    handleProfileChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            {/* <div className="form-group full-width">
              <label htmlFor="bio">Biografía</label>
              <textarea
                id="bio"
                rows="4"
                value={settings.profile.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
              />
            </div> */}

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: "20px" }}
              onClick={handleSaveProfile}
            >
              <i className="fas fa-save"></i> Guardar Cambios
            </button>
          </div>

          {/* Preferencias y Zona Peligrosa */}
          <div className="settings-card">
            <h3>Preferencias</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Notificaciones por Email</h4>
                  <p>Recibir notificaciones de nuevas reservas</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggleChange("emailNotifications")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Recordatorios de Reservas</h4>
                  <p>Recordatorios automáticos 24h antes</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.bookingReminders}
                    onChange={() => handleToggleChange("bookingReminders")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Disponibilidad Automática</h4>
                  <p>Actualizar automáticamente mi disponibilidad</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoAvailability}
                    onChange={() => handleToggleChange("autoAvailability")}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Mensajes de Clientes</h4>
                  <p>Permitir que los clientes me envíen mensajes</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.clientMessages}
                    onChange={() => handleToggleChange("clientMessages")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <h3 style={{ marginTop: "30px" }}>Zona Peligrosa</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Exportar Datos</h4>
                  <p>Descargar toda mi información de NIDDU</p>
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleExportData}
                >
                  <i className="fas fa-download"></i> Exportar
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Desactivar Cuenta</h4>
                  <p>Pausar temporalmente tu perfil</p>
                </div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={handleDeactivateAccount}
                >
                  <i className="fas fa-pause"></i> Desactivar
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Eliminar Cuenta</h4>
                  <p>Borrar permanentemente tu cuenta</p>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteAccount}
                >
                  <i className="fas fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;
