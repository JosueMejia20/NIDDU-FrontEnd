import React from "react";
import "../../styles/caregiver/UserDropdownMenu.css";

const UserDropdownMenu = ({ onClose, onNavigate }) => {
  const handleMenuClick = (action) => {
    switch (action) {
      case "crear-servicio":
        onNavigate("servicios");
        break;
      case "gestionar-reservas":
        onNavigate("reservas");
        break;
      case "ver-reportes":
        onNavigate("reportes");
        break;
      case "configuracion":
        onNavigate("configuracion");
        break;
      case "logout":
        console.log("Cerrando sesión...");
        // Aquí iría la lógica de logout
        break;
      default:
        break;
    }
    onClose();
  };

  // Prevenir que el click en el dropdown cierre el menú
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay para cerrar al hacer click fuera (solo móvil) */}
      <div className="dropdown-overlay" onClick={onClose} />

      <div className="user-dropdown" onClick={handleDropdownClick}>
        <div className="user-info">
          <div className="user-avatar">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
              alt="Ana García"
            />
          </div>
          <div className="user-details">
            <strong>Ana García</strong>
            <span>ana.garcia@email.com</span>
          </div>
        </div>

        <div className="dropdown-divider"></div>

        <button
          className="dropdown-item"
          onClick={() => handleMenuClick("crear-servicio")}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Crear Servicio</span>
        </button>

        <button
          className="dropdown-item"
          onClick={() => handleMenuClick("gestionar-reservas")}
        >
          <i className="fas fa-calendar-alt"></i>
          <span>Gestionar Reservas</span>
        </button>

        <button
          className="dropdown-item"
          onClick={() => handleMenuClick("ver-reportes")}
        >
          <i className="fas fa-chart-bar"></i>
          <span>Ver Reportes</span>
        </button>

        <button
          className="dropdown-item"
          onClick={() => handleMenuClick("configuracion")}
        >
          <i className="fas fa-cog"></i>
          <span>Configuración</span>
        </button>

        <div className="dropdown-divider"></div>

        <button
          className="dropdown-item logout-btn"
          onClick={() => handleMenuClick("logout")}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );
};

export default UserDropdownMenu;
