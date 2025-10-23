// components/SuccessModal.js
import React, { useEffect } from 'react';
import '../styles/components/SuccessModal.css';

const SuccessModal = ({ config, onClose }) => {
  const { title, message, type = 'success' } = config;

  useEffect(() => {
    // Cerrar modal al presionar Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getIcon = () => {
    switch(type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-info-circle';
    }
  };

  const getIconColor = () => {
    switch(type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className={`modal-icon ${getIconColor()}`}>
            <i className={getIcon()}></i>
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-body">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
        
        <div className="modal-footer">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <p className="redirect-message">Redirigiendo al dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;