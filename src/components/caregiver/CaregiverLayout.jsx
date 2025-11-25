import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CaregiverHeader from "./CaregiverHeader";

const CaregiverLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para determinar la sección actual basada en la ruta
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes("/servicios")) return "servicios";
    if (path.includes("/reservas")) return "reservas";
    if (path.includes("/reportes")) return "reportes";
    if (path.includes("/configuracion")) return "configuracion";
    return "dashboard";
  };

  // Función handleSectionChange con navigate
  const handleSectionChange = (section) => {
    const routeMap = {
      dashboard: "/caregiver",
      servicios: "/caregiver/servicios",
      reservas: "/caregiver/reservas",
      reportes: "/caregiver/reportes",
      configuracion: "/caregiver/configuracion",
    };

    const route = routeMap[section] || "/caregiver";
    navigate(route);
  };

  return (
    <div className="caregiver-layout">
      <CaregiverHeader
        currentSection={getCurrentSection()}
        onSectionChange={handleSectionChange}
      />

      <main className="caregiver-content">
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </main>
    </div>
  );
};

export default CaregiverLayout;
