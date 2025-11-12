import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/components/Dashboard.css";

const Dashboard = ({ user, mascotas }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Obtener la pestaña activa de la URL
  const currentTab = location.pathname.split("/").pop() || "overview";

  const handleTabChange = (tab) => {
    navigate(`/dashboard/${tab}`);
    setShowMobileMenu(false);
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const getTabTitle = () => {
    switch (currentTab) {
      case "overview":
        return "Resumen";
      case "pets":
        return "Mis Mascotas";
      case "bookings":
        return "Mis Reservas";
      case "caregivers":
        return "Cuidadores";
      case "services":
        return "Servicios";
      case "profile":
        return "Mi Perfil";
      default:
        return "Dashboard";
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>
              ¡Bienvenido, {usuario?.persona?.nombres || "Carlos Rodríguez"}!
            </h1>
            <p>Gestiona el cuidado de tus mascotas</p>
          </div>
        </div>

        <div className="mobile-tabs-header">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className="fas fa-bars"></i> Menú
          </button>
          <h2>{getTabTitle()}</h2>
        </div>

        <div className="dashboard-content">
          <div
            className={`content-sidebar ${showMobileMenu ? "mobile-open" : ""}`}
          >
            <nav className="sidebar-nav">
              <button
                type="button"
                className={`nav-item ${
                  currentTab === "overview" ? "active" : ""
                }`}
                onClick={() => handleTabChange("overview")}
              >
                <i className="fas fa-home"></i> Resumen
              </button>
              <button
                type="button"
                className={`nav-item ${currentTab === "pets" ? "active" : ""}`}
                onClick={() => handleTabChange("pets")}
              >
                <i className="fas fa-paw"></i> Mis Mascotas
              </button>
              <button
                type="button"
                className={`nav-item ${
                  currentTab === "bookings" ? "active" : ""
                }`}
                onClick={() => handleTabChange("bookings")}
              >
                <i className="fas fa-calendar"></i> Mis Reservas
              </button>
              <button
                type="button"
                className={`nav-item ${
                  currentTab === "caregivers" ? "active" : ""
                }`}
                onClick={() => handleTabChange("caregivers")}
              >
                <i className="fas fa-users"></i> Cuidadores
              </button>
              <button
                type="button"
                className={`nav-item ${
                  currentTab === "services" ? "active" : ""
                }`}
                onClick={() => handleTabChange("services")}
              >
                <i className="fas fa-concierge-bell"></i> Servicios
              </button>
              <button
                type="button"
                className={`nav-item ${
                  currentTab === "profile" ? "active" : ""
                }`}
                onClick={() => handleTabChange("profile")}
              >
                <i className="fas fa-user"></i> Mi Perfil
              </button>
            </nav>
          </div>

          <div className="content-main">
            {/* Aquí se renderizan las rutas hijas */}
            <Outlet context={{ navigate }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
