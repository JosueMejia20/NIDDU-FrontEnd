import React from "react";
import { Outlet } from "react-router-dom";
import CaregiverHeader from "./CaregiverHeader";
// import CaregiverSidebar from './CaregiverSidebar'; // Si tienes un sidebar

const CaregiverLayout = () => {
  return (
    <div className="caregiver-layout">
      <CaregiverHeader currentSection="dashboard" />

      <main className="caregiver-content">
        <Outlet /> {/* Aquí se renderizarán las rutas anidadas */}
      </main>
    </div>
  );
};

export default CaregiverLayout;
