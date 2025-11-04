import React from 'react';
import '../../styles/caregiver/CaregiverHeader.css';

const CaregiverHeader = ({ currentSection, onSectionChange }) => {
  return (
    <header className="caregiver-header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => onSectionChange('dashboard')}>
            <span className="logo-icon">🐾</span>
            <span className="logo-text">NIDDU CUIDADORES</span>
          </div>
          <nav className="caregiver-nav">
            <button 
              className={`nav-link ${currentSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => onSectionChange('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-link ${currentSection === 'servicios' ? 'active' : ''}`}
              onClick={() => onSectionChange('servicios')}
            >
              Mis Servicios
            </button>
            <button 
              className={`nav-link ${currentSection === 'reservas' ? 'active' : ''}`}
              onClick={() => onSectionChange('reservas')}
            >
              Reservas
            </button>
            <button 
              className={`nav-link ${currentSection === 'reportes' ? 'active' : ''}`}
              onClick={() => onSectionChange('reportes')}
            >
              Reportes
            </button>
            <button 
              className={`nav-link ${currentSection === 'configuracion' ? 'active' : ''}`}
              onClick={() => onSectionChange('configuracion')}
            >
              Configuración
            </button>
            <div className="user-menu">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Ana García" />
              </div>
              <span>Ana García</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CaregiverHeader;