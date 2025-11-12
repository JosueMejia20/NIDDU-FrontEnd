import React, { useEffect, useState } from "react";


  

 
 //const usuario = JSON.parse(localStorage.getItem("usuario"));

const ProfileTab = ({ user }) => {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cada vez que cambie localStorage (por login/logout) se actualiza
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      setUsuario(null);
    }
  }, []); // 👈 Esto se ejecuta solo al montar

  // 💡 Pero queremos detectar también los cambios:
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("usuario");
      setUsuario(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mi Perfil</h2>
      <button type="button" className="btn btn-outline">
        {" "}
        {/* AGREGADO */}
        <i className="fas fa-edit"></i> Editar Perfil
      </button>
    </div>

    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              }
              alt={user?.name}
            />
            <button type="button" className="edit-avatar-btn">
              {" "}
              {/* AGREGADO */}
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-info">
            <h3>{usuario?.persona?.nombres || usuario?.nombre || "Carlos Rodríguez"}</h3>
            <p>{usuario?.correo || "carlos@email.com"}</p>
            <div className="member-since">
              <i className="fas fa-calendar"></i>
              Miembro desde {usuario?.fechaCreacion}
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h4>Información Personal</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Nombre completo</label>
                <span>{usuario?.persona?.nombres || usuario?.nombre  || "Carlos Rodríguez"}</span>
              </div>
              <div className="detail-item">
                <label>Correo electrónico</label>
                <span>{usuario?.correo || "carlos@email.com"}</span>
              </div>
              <div className="detail-item">
                <label>Teléfono</label>
                <span>{usuario?.persona?.telefono || usuario?.telefono || "+57 300 123 4567"}</span>
              </div>
              <div className="detail-item">
                <label>Dirección</label>
                <span>{ `${usuario?.direcciones?.[0]?.ciudad || ""} ${usuario?.direcciones?.[0]?.colonia || ""}`.trim() || `${usuario?.direccion?.ciudad || ""} ${usuario?.direccion?.colonia || ""}`.trim() || "Calle 123 #45-67, Bogotá"}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Preferencias</h4>
            <div className="preferences-grid">
              <div className="preference-item">
                <label>Notificaciones por email</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="preference-item">
                <label>Recordatorios de reservas</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="preference-item">
                <label>Ofertas especiales</label>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  };
export default ProfileTab;
