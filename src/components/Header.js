import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/Header.css";

const Header = ({ isLoggedIn, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Para saber en qué ruta estamos

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    setIsUserMenuOpen(false);
    closeMobileMenu();
  };

  // Nueva función de navegación usando React Router
  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
    setIsUserMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Para scroll interno (solo funciona desde la ruta "/")
  const handleSectionNavigation = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/"); // Ir al home primero
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario?.persona?.nombres, usuario?.correo, usuario?.fotoPerfil);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`} id="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <a
            href="#"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
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
            </div>
          </a>

          <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            {isLoggedIn ? (
              <>
                <li>
                  <a
                    href="#buscar"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/dashboard");
                    }}
                  >
                    <i className="fas fa-search"></i> Buscar
                  </a>
                </li>
                <li>
                  <a href="#ayuda" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-question-circle"></i> Ayuda
                  </a>
                </li>
                <li>
                  <a href="#ser-cuidador" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-paw"></i> Ser Cuidador
                  </a>
                </li>

                {/* Menú de usuario */}
                <li className="nav-user">
                  <div className="user-menu-trigger" onClick={toggleUserMenu}>
                    <div className="user-avatar">
                      <img
                        src={usuario?.fotoPerfil || "/default-avatar.png"}
                        alt={usuario?.persona?.nombres || "Usuario"}
                      />
                    </div>
                    <span className="user-name">
                      {usuario?.persona?.nombres ||
                        usuario?.nombre ||
                        "Usuario"}
                    </span>
                    <i
                      className={`fas fa-chevron-${
                        isUserMenuOpen ? "up" : "down"
                      }`}
                    ></i>
                  </div>

                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <div className="user-avatar">
                          <img
                            src={usuario?.fotoPerfil || "/default-avatar.png"}
                            alt={
                              usuario?.persona?.nombres ||
                              usuario?.nombre ||
                              "Usuario"
                            }
                          />
                        </div>
                        <div className="user-details">
                          <strong>
                            {usuario?.persona?.nombres ||
                              usuario?.nombre ||
                              "Usuario"}
                          </strong>
                          <span>{usuario?.correo || "usuario@email.com"}</span>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/dashboard/profile")}
                      >
                        <i className="fas fa-user"></i> Mi Perfil
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/dashboard/pets")}
                      >
                        <i className="fas fa-paw"></i> Mis Mascotas
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleNavigation("/dashboard/bookings")}
                      >
                        <i className="fas fa-calendar"></i> Mis Reservas
                      </button>
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
              <>
                <li>
                  <a
                    href="#inicio"
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/");
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
                      handleSectionNavigation("servicios");
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
                      handleSectionNavigation("como-funciona");
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
                      handleSectionNavigation("testimonios");
                    }}
                  >
                    Testimonios
                  </a>
                </li>
                <li className="nav-auth">
                  <a
                    href="#login"
                    className="nav-login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/login");
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
                      handleNavigation("/register");
                    }}
                  >
                    Registrarse
                  </a>
                </li>
              </>
            )}
          </ul>

          <div className="mobile-menu" onClick={toggleMobileMenu}>
            <i
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
