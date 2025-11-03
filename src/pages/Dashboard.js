//Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Dashboard.css";
import OverviewTab from "../components/OverviewTab";
import ProfileTab from "../components/ProfileTab";
import ServicesTab from "../components/ServicesTab";
import CaregiversTab from "../components/CaregiversTab";
import BookingsTab from "../components/BookingsTab";
import PetsTab from "../components/PetsTab";

const Dashboard = ({ user, mascotas, activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || "overview"
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [filtroReservas, setFiltroReservas] = useState("todas");
  const [filtroCuidadores, setFiltroCuidadores] = useState("todos");
  const [busquedaCuidadores, setBusquedaCuidadores] = useState("");

  useEffect(() => {
    if (activeTab) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setInternalActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const userStats = {
    mascotas: mascotas.length,
    reservasActivas: 1,
    cuidadoresFavoritos: 3,
    puntos: 150,
  };

  const reservas = [
    {
      id: 1,
      servicio: "Day Care",
      cuidador: "Ana García",
      fecha: "15 Nov 2023",
      hora: "09:00 - 18:00",
      estado: "Activa",
      precio: "$25.000",
      direccion: "Calle 123 #45-67",
      tipo: "activa",
      duracion: "8 horas",
    },
    {
      id: 2,
      servicio: "Paseo",
      cuidador: "Carlos López",
      fecha: "10 Nov 2023",
      hora: "16:00 - 17:00",
      estado: "Completada",
      precio: "$15.000",
      direccion: "Carrera 89 #12-34",
      tipo: "completada",
      duracion: "1 hora",
    },
    {
      id: 3,
      servicio: "Peluquería",
      cuidador: "María Rodríguez",
      fecha: "20 Nov 2023",
      hora: "14:00 - 16:00",
      estado: "Confirmada",
      precio: "$35.000",
      direccion: "Avenida Siempre Viva 742",
      tipo: "confirmada",
      duracion: "2 horas",
    },
  ];

  const cuidadores = [
    {
      id: 1,
      nombre: "Ana García",
      especialidad: "Day Care, Paseos",
      calificacion: 4.9,
      reseñas: 42,
      experiencia: "3 años",
      precioHora: "$25.000",
      disponible: true,
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      servicios: [
        {
          nombre: "Day Care",
          imagen:
            "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Cuidado diurno en instalaciones seguras",
        },
        {
          nombre: "Paseos",
          imagen:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Paseos personalizados para tu mascota",
        },
      ],
    },
    {
      id: 2,
      nombre: "Carlos López",
      especialidad: "Paseos, Entrenamiento",
      calificacion: 4.8,
      reseñas: 35,
      experiencia: "2 años",
      precioHora: "$20.000",
      disponible: true,
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      servicios: [
        {
          nombre: "Paseos",
          imagen:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Paseos energéticos y divertidos",
        },
        {
          nombre: "Entrenamiento",
          imagen:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Entrenamiento básico y avanzado",
        },
      ],
    },
    {
      id: 3,
      nombre: "María Rodríguez",
      especialidad: "Peluquería, Cuidado Especial",
      calificacion: 5.0,
      reseñas: 28,
      experiencia: "4 años",
      precioHora: "$30.000",
      disponible: false,
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      servicios: [
        {
          nombre: "Peluquería",
          imagen:
            "https://images.unsplash.com/photo-1622279450236-4ffa2d5e0e82?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Servicios de belleza completos",
        },
        {
          nombre: "Cuidado Especial",
          imagen:
            "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&w=200&q=80",
          descripcion: "Atención para mascotas con necesidades especiales",
        },
      ],
    },
  ];

  const serviciosDisponibles = [
    {
      id: 1,
      nombre: "Day Care Diario",
      descripcion:
        "Cuidado durante el día en instalaciones seguras y supervisadas",
      precio: "$25.000/día",
      duracion: "8 horas",
      popular: true,
      imagen:
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      nombre: "Paseos Personalizados",
      descripcion: "Paseos adaptados a las necesidades y energía de tu mascota",
      precio: "$15.000/paseo",
      duracion: "1 hora",
      popular: true,
      imagen:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      nombre: "Peluquería Canina",
      descripcion: "Servicio completo de belleza, baño y corte de pelo",
      precio: "$35.000/sesión",
      duracion: "2 horas",
      popular: false,
      imagen:
        "https://images.unsplash.com/photo-1622279450236-4ffa2d5e0e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      nombre: "Entrenamiento Básico",
      descripcion:
        "Sesiones de entrenamiento para obediencia básica y comandos",
      precio: "$40.000/sesión",
      duracion: "1 hora",
      popular: true,
      imagen:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtroReservas === "todas") return true;
    return reserva.tipo === filtroReservas;
  });

  const cuidadoresFiltrados = cuidadores
    .filter((cuidador) => {
      if (filtroCuidadores === "todos") return true;
      if (filtroCuidadores === "disponibles") return cuidador.disponible;
      return cuidador.especialidad.toLowerCase().includes(filtroCuidadores);
    })
    .filter(
      (cuidador) =>
        cuidador.nombre
          .toLowerCase()
          .includes(busquedaCuidadores.toLowerCase()) ||
        cuidador.especialidad
          .toLowerCase()
          .includes(busquedaCuidadores.toLowerCase())
    );

  const renderTabContent = () => {
    switch (internalActiveTab) {
      case "overview":
        return (
          <OverviewTab
            mascotas={mascotas}
            reservas={reservas}
            cuidadores={cuidadores}
            userStats={userStats}
            navigate={navigate}
          />
        );
      case "pets":
        return <PetsTab mascotas={mascotas} navigate={navigate} />;
      case "bookings":
        return (
          <BookingsTab
            reservas={reservasFiltradas}
            filtro={filtroReservas}
            onFiltroChange={setFiltroReservas}
            navigate={navigate}
          />
        );
      case "caregivers":
        return (
          <CaregiversTab
            cuidadores={cuidadoresFiltrados}
            filtro={filtroCuidadores}
            busqueda={busquedaCuidadores}
            onFiltroChange={setFiltroCuidadores}
            onBusquedaChange={setBusquedaCuidadores}
            navigate={navigate}
          />
        );
      case "services":
        return (
          <ServicesTab servicios={serviciosDisponibles} navigate={navigate} />
        );
      case "profile":
        return <ProfileTab user={user} />;
      default:
        return (
          <OverviewTab
            mascotas={mascotas}
            reservas={reservas}
            cuidadores={cuidadores}
            userStats={userStats}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>¡Bienvenido, {user?.name || "Carlos Rodríguez"}!</h1>
            <p>Gestiona el cuidado de tus mascotas</p>
          </div>
        </div>

        <div className="mobile-tabs-header">
          <button
            type="button" // AGREGADO
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className="fas fa-bars"></i> Menú
          </button>
          <h2>
            {internalActiveTab === "overview" && "Resumen"}
            {internalActiveTab === "pets" && "Mis Mascotas"}
            {internalActiveTab === "bookings" && "Mis Reservas"}
            {internalActiveTab === "caregivers" && "Cuidadores"}
            {internalActiveTab === "services" && "Servicios"}
            {internalActiveTab === "profile" && "Mi Perfil"}
          </h2>
        </div>

        <div className="dashboard-content">
          <div
            className={`content-sidebar ${showMobileMenu ? "mobile-open" : ""}`}
          >
            <nav className="sidebar-nav">
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "overview" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("overview");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-home"></i> Resumen
              </button>
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "pets" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("pets");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-paw"></i> Mis Mascotas
              </button>
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "bookings" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("bookings");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-calendar"></i> Mis Reservas
              </button>
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "caregivers" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("caregivers");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-users"></i> Cuidadores
              </button>
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "services" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("services");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-concierge-bell"></i> Servicios
              </button>
              <button
                type="button" // AGREGADO
                className={`nav-item ${
                  internalActiveTab === "profile" ? "active" : ""
                }`}
                onClick={() => {
                  handleTabChange("profile");
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-user"></i> Mi Perfil
              </button>
            </nav>
          </div>

          <div className="content-main">{renderTabContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
