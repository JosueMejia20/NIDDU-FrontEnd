// components/Header.js
import React, { useState, useEffect } from 'react';
import '../styles/components/Header.css';

const Header = ({ currentPage, navigateTo, isLoggedIn, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavigation = (page) => {
    navigateTo(page);
    closeMobileMenu();
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  const handleSectionNavigation = (sectionId) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMobileMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo que redirige al home */}
          <a 
            href="#" 
            className="logo" 
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home');
            }}
          >
            <div className="logo-container">
              <div className="logo-image">
                 <img src="/logo2.jpg" alt="NIDDU" />

                  <div className="logo-circle circle-green">N</div>
                  <div className="logo-circle circle-blue">I</div>
                  <div className="logo-circle circle-brown">D</div>
                  <div className="logo-circle circle-green">D</div>
                  <div className="logo-circle circle-blue">U</div>
              </div>
              <div className="logo-text"></div>
            </div>
          </a>
          
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {isLoggedIn ? (
              // Menú para usuarios logueados
              <>
                <li>
                  <a 
                    href="#buscar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('dashboard');
                    }}
                  >
                    <i className="fas fa-search"></i> Buscar
                  </a>
                </li>
                <li>
                  <a 
                    href="#ayuda"
                    onClick={(e) => {
                      e.preventDefault();
                      // Aquí puedes redirigir a una página de ayuda
                    }}
                  >
                    <i className="fas fa-question-circle"></i> Ayuda
                  </a>
                </li>
                <li>
                  <a 
                    href="#ser-cuidador"
                    onClick={(e) => {
                      e.preventDefault();
                      // Aquí puedes redirigir a ser cuidador
                    }}
                  >
                    <i className="fas fa-paw"></i> Ser Cuidador
                  </a>
                </li>
                
                {/* Menú de usuario */}
                <li className="nav-user">
                  <div 
                    className="user-menu-trigger"
                    onClick={toggleUserMenu}
                  >
                    <div className="user-avatar">
                      <img 
                        src={user?.avatar || "/default-avatar.png"} 
                        alt={user?.name || "Usuario"} 
                      />
                    </div>
                    <span className="user-name">{user?.name || "Usuario"}</span>
                    <i className={`fas fa-chevron-${isUserMenuOpen ? 'up' : 'down'}`}></i>
                  </div>
                  
                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <div className="user-avatar">
                          <img 
                            src={user?.avatar || "/default-avatar.png"} 
                            alt={user?.name || "Usuario"} 
                          />
                        </div>
                        <div className="user-details">
                          <strong>{user?.name || "Usuario"}</strong>
                          <span>{user?.email || "usuario@email.com"}</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <a href="#perfil" className="dropdown-item">
                        <i className="fas fa-user"></i> Mi Perfil
                      </a>
                      <a href="#mascotas" className="dropdown-item">
                        <i className="fas fa-paw"></i> Mis Mascotas
                      </a>
                      <a href="#reservas" className="dropdown-item">
                        <i className="fas fa-calendar"></i> Mis Reservas
                      </a>
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              // Menú para usuarios no logueados
              <>
                <li>
                  <a 
                    href="#inicio" 
                    className={currentPage === 'home' ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('home');
                    }}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a 
                    href="#servicios"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionNavigation('servicios');
                    }}
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a 
                    href="#como-funciona"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionNavigation('como-funciona');
                    }}
                  >
                    Cómo Funciona
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonios"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionNavigation('testimonios');
                    }}
                  >
                    Testimonios
                  </a>
                </li>
                
                {/* Botones de autenticación */}
                <li className="nav-auth">
                  <a 
                    href="#login" 
                    className="nav-login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('login');
                    }}
                  >
                    Iniciar Sesión
                  </a>
                </li>
                
                <li className="nav-cta">
                  <a 
                    href="#registro" 
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation('register');
                    }}
                  >
                    Registrarse
                  </a>
                </li>
              </>
            )}
          </ul>
          
          <div className="mobile-menu" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;