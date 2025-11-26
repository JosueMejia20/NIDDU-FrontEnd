import React, { useState, useRef, useEffect } from "react";
import "../../styles/caregiver/CaregiverHeader.css";
import UserDropdownMenu from "./UserDropdownMenu";

const CaregiverHeader = ({
  currentSection,
  onSectionChange,
  handleLogout,
  user,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuNavigate = (section) => {
    onSectionChange(section);
  };

  return (
    <header className="caregiver-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">NIDDU CUIDADORES</span>
          </div>
          <nav className="caregiver-nav">
            <button
              className={`nav-link ${
                currentSection === "dashboard" ? "active" : ""
              }`}
              onClick={() => onSectionChange("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`nav-link ${
                currentSection === "servicios" ? "active" : ""
              }`}
              onClick={() => onSectionChange("servicios")}
            >
              Mis Servicios
            </button>
            <button
              className={`nav-link ${
                currentSection === "reservas" ? "active" : ""
              }`}
              onClick={() => onSectionChange("reservas")}
            >
              Reservas
            </button>
            <button
              className={`nav-link ${
                currentSection === "reportes" ? "active" : ""
              }`}
              onClick={() => onSectionChange("reportes")}
            >
              Reportes
            </button>
            <button
              className={`nav-link ${
                currentSection === "configuracion" ? "active" : ""
              }`}
              onClick={() => onSectionChange("configuracion")}
            >
              Configuración
            </button>

            {/* Menú de usuario */}
            <div className="user-menu-container" ref={menuRef}>
              <div className="user-menu" onClick={toggleMenu}>
                <div className="user-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                    alt="Avatar"
                  />
                </div>
                <span>
                  {user?.persona?.nombres} {user?.persona?.apellidos}
                </span>
                <i
                  className="fas fa-chevron-down"
                  style={{
                    transition: "transform 0.2s",
                    transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                ></i>
              </div>

              {isMenuOpen && (
                <div className="panel-dropdown">
                  <UserDropdownMenu
                    onClose={() => setIsMenuOpen(false)}
                    onNavigate={handleMenuNavigate}
                    handleLogout={handleLogout}
                    user={user}
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CaregiverHeader;
