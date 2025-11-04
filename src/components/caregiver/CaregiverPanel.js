import React, { useState } from 'react';
import CaregiverHeader from './CaregiverHeader';
import CaregiverDashboard from './CaregiverDashboard';
import ServiceCreation from './ServiceCreation';
import CaregiverBookings from './CaregiverBooking';
import ReportsSection from './ReportsSection';
import SettingsSection from './SettingsSection';

const CaregiverPanel = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'servicios':
        return <ServiceCreation onSectionChange={setCurrentSection} />;
      case 'reservas':
        return <CaregiverBookings onSectionChange={setCurrentSection} />;
      case 'reportes':
        return <ReportsSection onSectionChange={setCurrentSection} />;
      case 'configuracion':
        return <SettingsSection onSectionChange={setCurrentSection} />;
      default:
        return <CaregiverDashboard onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="caregiver-panel">
      <CaregiverHeader 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      {renderSection()}
    </div>
  );
};

export default CaregiverPanel;