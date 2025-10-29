const ProfileTab = ({ user }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mi Perfil</h2>
      <button type="button" className="btn btn-outline">
        {" "}
        {/* ✅ AGREGADO */}
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
              {/* ✅ AGREGADO */}
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-info">
            <h3>{user?.name || "Carlos Rodríguez"}</h3>
            <p>{user?.email || "carlos@email.com"}</p>
            <div className="member-since">
              <i className="fas fa-calendar"></i>
              Miembro desde Enero 2023
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h4>Información Personal</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Nombre completo</label>
                <span>{user?.name || "Carlos Rodríguez"}</span>
              </div>
              <div className="detail-item">
                <label>Correo electrónico</label>
                <span>{user?.email || "carlos@email.com"}</span>
              </div>
              <div className="detail-item">
                <label>Teléfono</label>
                <span>+57 300 123 4567</span>
              </div>
              <div className="detail-item">
                <label>Dirección</label>
                <span>Calle 123 #45-67, Bogotá</span>
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

export default ProfileTab;
