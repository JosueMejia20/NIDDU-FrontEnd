import React, { useState, useEffect } from 'react';
import '../styles/components/Dashboard.css';

const Dashboard = ({ user, navigateTo, mascotas: propMascotas, activeTab, onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || 'overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [filtroReservas, setFiltroReservas] = useState('todas');
  const [filtroCuidadores, setFiltroCuidadores] = useState('todos');
  const [busquedaCuidadores, setBusquedaCuidadores] = useState('');

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
    mascotas: propMascotas.length,
    reservasActivas: 1,
    cuidadoresFavoritos: 3,
    puntos: 150
  };

  const mascotas = propMascotas;

  const reservas = [
    { 
      id: 1, 
      servicio: 'Day Care', 
      cuidador: 'Ana García', 
      fecha: '15 Nov 2023', 
      hora: '09:00 - 18:00',
      estado: 'Activa',
      precio: '$25.000',
      direccion: 'Calle 123 #45-67',
      tipo: 'activa',
      duracion: '8 horas'
    },
    { 
      id: 2, 
      servicio: 'Paseo', 
      cuidador: 'Carlos López', 
      fecha: '10 Nov 2023', 
      hora: '16:00 - 17:00',
      estado: 'Completada',
      precio: '$15.000',
      direccion: 'Carrera 89 #12-34',
      tipo: 'completada',
      duracion: '1 hora'
    },
    { 
      id: 3, 
      servicio: 'Peluquería', 
      cuidador: 'María Rodríguez', 
      fecha: '20 Nov 2023', 
      hora: '14:00 - 16:00',
      estado: 'Confirmada',
      precio: '$35.000',
      direccion: 'Avenida Siempre Viva 742',
      tipo: 'confirmada',
      duracion: '2 horas'
    }
  ];

  const cuidadores = [
    {
      id: 1,
      nombre: 'Ana García',
      especialidad: 'Day Care, Paseos',
      calificacion: 4.9,
      reseñas: 42,
      experiencia: '3 años',
      precioHora: '$25.000',
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      servicios: [
        { 
          nombre: 'Day Care', 
          imagen: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Cuidado diurno en instalaciones seguras'
        },
        { 
          nombre: 'Paseos', 
          imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Paseos personalizados para tu mascota'
        }
      ]
    },
    {
      id: 2,
      nombre: 'Carlos López',
      especialidad: 'Paseos, Entrenamiento',
      calificacion: 4.8,
      reseñas: 35,
      experiencia: '2 años',
      precioHora: '$20.000',
      disponible: true,
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      servicios: [
        { 
          nombre: 'Paseos', 
          imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Paseos energéticos y divertidos'
        },
        { 
          nombre: 'Entrenamiento', 
          imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Entrenamiento básico y avanzado'
        }
      ]
    },
    {
      id: 3,
      nombre: 'María Rodríguez',
      especialidad: 'Peluquería, Cuidado Especial',
      calificacion: 5.0,
      reseñas: 28,
      experiencia: '4 años',
      precioHora: '$30.000',
      disponible: false,
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      servicios: [
        { 
          nombre: 'Peluquería', 
          imagen: 'https://images.unsplash.com/photo-1622279450236-4ffa2d5e0e82?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Servicios de belleza completos'
        },
        { 
          nombre: 'Cuidado Especial', 
          imagen: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&w=200&q=80',
          descripcion: 'Atención para mascotas con necesidades especiales'
        }
      ]
    }
  ];

  const serviciosDisponibles = [
    {
      id: 1,
      nombre: 'Day Care Diario',
      descripcion: 'Cuidado durante el día en instalaciones seguras y supervisadas',
      precio: '$25.000/día',
      duracion: '8 horas',
      popular: true,
      imagen: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      nombre: 'Paseos Personalizados',
      descripcion: 'Paseos adaptados a las necesidades y energía de tu mascota',
      precio: '$15.000/paseo',
      duracion: '1 hora',
      popular: true,
      imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      nombre: 'Peluquería Canina',
      descripcion: 'Servicio completo de belleza, baño y corte de pelo',
      precio: '$35.000/sesión',
      duracion: '2 horas',
      popular: false,
      imagen: 'https://images.unsplash.com/photo-1622279450236-4ffa2d5e0e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      nombre: 'Entrenamiento Básico',
      descripcion: 'Sesiones de entrenamiento para obediencia básica y comandos',
      precio: '$40.000/sesión',
      duracion: '1 hora',
      popular: true,
      imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const reservasFiltradas = reservas.filter(reserva => {
    if (filtroReservas === 'todas') return true;
    return reserva.tipo === filtroReservas;
  });

  const cuidadoresFiltrados = cuidadores.filter(cuidador => {
    if (filtroCuidadores === 'todos') return true;
    if (filtroCuidadores === 'disponibles') return cuidador.disponible;
    return cuidador.especialidad.toLowerCase().includes(filtroCuidadores);
  }).filter(cuidador => 
    cuidador.nombre.toLowerCase().includes(busquedaCuidadores.toLowerCase()) ||
    cuidador.especialidad.toLowerCase().includes(busquedaCuidadores.toLowerCase())
  );

  const renderTabContent = () => {
    switch(internalActiveTab) {
      case 'overview':
        return <OverviewTab 
          mascotas={mascotas} 
          reservas={reservas} 
          cuidadores={cuidadores}
          userStats={userStats}
          navigateTo={navigateTo}
        />;
      case 'pets':
        return <PetsTab 
          mascotas={mascotas} 
          navigateTo={navigateTo} 
        />;
      case 'bookings':
        return <BookingsTab 
          reservas={reservasFiltradas} 
          filtro={filtroReservas}
          onFiltroChange={setFiltroReservas}
          navigateTo={navigateTo}
        />;
      case 'caregivers':
        return <CaregiversTab 
          cuidadores={cuidadoresFiltrados}
          filtro={filtroCuidadores}
          busqueda={busquedaCuidadores}
          onFiltroChange={setFiltroCuidadores}
          onBusquedaChange={setBusquedaCuidadores}
          navigateTo={navigateTo}
        />;
      case 'services':
        return <ServicesTab 
          servicios={serviciosDisponibles}
          navigateTo={navigateTo}
        />;
      case 'profile':
        return <ProfileTab user={user} />;
      default:
        return <OverviewTab 
          mascotas={mascotas} 
          reservas={reservas} 
          cuidadores={cuidadores}
          userStats={userStats}
          navigateTo={navigateTo}
        />;
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>¡Bienvenido, {user?.name || 'Carlos Rodríguez'}!</h1>
            <p>Gestiona el cuidado de tus mascotas</p>
          </div>
        </div>

        <div className="mobile-tabs-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className="fas fa-bars"></i> Menú
          </button>
          <h2>
            {internalActiveTab === 'overview' && 'Resumen'}
            {internalActiveTab === 'pets' && 'Mis Mascotas'}
            {internalActiveTab === 'bookings' && 'Mis Reservas'}
            {internalActiveTab === 'caregivers' && 'Cuidadores'}
            {internalActiveTab === 'services' && 'Servicios'}
            {internalActiveTab === 'profile' && 'Mi Perfil'}
          </h2>
        </div>

        <div className="dashboard-content">
          <div className={`content-sidebar ${showMobileMenu ? 'mobile-open' : ''}`}>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${internalActiveTab === 'overview' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('overview');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-home"></i> Resumen
              </button>
              <button 
                className={`nav-item ${internalActiveTab === 'pets' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('pets');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-paw"></i> Mis Mascotas
              </button>
              <button 
                className={`nav-item ${internalActiveTab === 'bookings' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('bookings');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-calendar"></i> Mis Reservas
              </button>
              <button 
                className={`nav-item ${internalActiveTab === 'caregivers' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('caregivers');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-users"></i> Cuidadores
              </button>
              <button 
                className={`nav-item ${internalActiveTab === 'services' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('services');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-concierge-bell"></i> Servicios
              </button>
              <button 
                className={`nav-item ${internalActiveTab === 'profile' ? 'active' : ''}`}
                onClick={() => {
                  handleTabChange('profile');
                  setShowMobileMenu(false);
                }}
              >
                <i className="fas fa-user"></i> Mi Perfil
              </button>
            </nav>
          </div>

          <div className="content-main">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

const OverviewTab = ({ mascotas, reservas, cuidadores, userStats, navigateTo }) => (
  <div className="tab-content">
    <h2>Resumen General</h2>
    
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-paw"></i>
        </div>
        <div className="stat-info">
          <h3>{userStats.mascotas}</h3>
          <p>Mascotas</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-calendar-check"></i>
        </div>
        <div className="stat-info">
          <h3>{userStats.reservasActivas}</h3>
          <p>Reservas Activas</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-heart"></i>
        </div>
        <div className="stat-info">
          <h3>{userStats.cuidadoresFavoritos}</h3>
          <p>Cuidadores Favoritos</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-star"></i>
        </div>
        <div className="stat-info">
          <h3>{userStats.puntos}</h3>
          <p>Puntos NIDDU</p>
        </div>
      </div>
    </div>

    <div className="section-card">
      <div className="section-header">
        <h3>Mis Mascotas</h3>
        <button 
          className="btn btn-outline"
          onClick={() => navigateTo('dashboard', 'pets')}
        >
          Ver Todas
        </button>
      </div>
      <div className="pets-grid">
        {mascotas.map(mascota => (
          <div key={mascota.id} className="pet-card">
            <div className="pet-avatar">
              <img src={mascota.foto} alt={mascota.nombre} />
            </div>
            <div className="pet-info">
              <h4>{mascota.nombre}</h4>
              <p>{mascota.raza} • {mascota.edad} años</p>
              <span className="pet-detail">{mascota.peso}</span>
            </div>
            <button className="btn btn-outline btn-sm">Ver</button>
          </div>
        ))}
      </div>
    </div>

    <div className="section-card">
      <div className="section-header">
        <h3>Próximas Reservas</h3>
        <button 
          className="btn btn-outline"
          onClick={() => navigateTo('dashboard', 'bookings')}
        >
          Ver Todas
        </button>
      </div>
      <div className="bookings-list">
        {reservas.slice(0, 2).map(reserva => (
          <div key={reserva.id} className="booking-item">
            <div className="booking-info">
              <h4>{reserva.servicio}</h4>
              <p>Con {reserva.cuidador}</p>
              <span className="booking-date">{reserva.fecha} - {reserva.hora}</span>
            </div>
            <div className="booking-details">
              <span className="booking-price">{reserva.precio}</span>
              <div className={`booking-status ${reserva.estado.toLowerCase()}`}>
                {reserva.estado}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="section-card">
      <div className="section-header">
        <h3>Cuidadores Favoritos</h3>
        <button 
          className="btn btn-outline"
          onClick={() => navigateTo('dashboard', 'caregivers')}
        >
          Ver Todos
        </button>
      </div>
      <div className="caregivers-grid">
        {cuidadores.slice(0, 2).map(cuidador => (
          <div key={cuidador.id} className="caregiver-card">
            <div className="caregiver-avatar">
              <img src={cuidador.foto} alt={cuidador.nombre} />
              <div className={`availability-dot ${cuidador.disponible ? 'available' : 'busy'}`}></div>
            </div>
            <div className="caregiver-info">
              <h4>{cuidador.nombre}</h4>
              <p>{cuidador.especialidad}</p>
              <div className="caregiver-rating">
                <i className="fas fa-star"></i>
                <span>{cuidador.calificacion}</span>
                <span>({cuidador.reseñas})</span>
              </div>
              <div className="caregiver-services">
                {cuidador.servicios.slice(0, 2).map((servicio, index) => (
                  <div key={index} className="service-badge">
                    <img src={servicio.imagen} alt={servicio.nombre} />
                    <span>{servicio.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => navigateTo('new-booking')}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PetsTab = ({ mascotas, navigateTo }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mis Mascotas</h2>
      <button 
        className="btn btn-secondary"
        onClick={() => navigateTo('add-pet')}
      >
        <i className="fas fa-paw"></i> Agregar Mascota
      </button>
    </div>

    <div className="pets-detail-grid">
      {mascotas.map(mascota => (
        <div key={mascota.id} className="pet-detail-card">
          <div className="pet-header">
            <div className="pet-main-info">
              <div className="pet-avatar large">
                <img src={mascota.foto} alt={mascota.nombre} />
              </div>
              <div className="pet-details">
                <h3>{mascota.nombre}</h3>
                <p>{mascota.raza} • {mascota.edad} años</p>
                <div className="pet-stats">
                  <span><i className="fas fa-weight"></i> {mascota.peso}</span>
                  <span><i className="fas fa-allergies"></i> {mascota.alergias}</span>
                </div>
              </div>
            </div>
            <div className="pet-actions">
              <button className="btn btn-outline btn-sm">
                <i className="fas fa-edit"></i> Editar
              </button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => navigateTo('new-booking')}
              >
                <i className="fas fa-calendar-plus"></i> Reservar
              </button>
            </div>
          </div>
          
          <div className="pet-medical-info">
            <h4>Información Médica</h4>
            <div className="medical-grid">
              <div className="medical-item">
                <label>Vacunas al día:</label>
                <span className="status yes">Sí</span>
              </div>
              <div className="medical-item">
                <label>Última visita:</label>
                <span>{mascota.ultimaVisita}</span>
              </div>
              <div className="medical-item">
                <label>Veterinario:</label>
                <span>{mascota.veterinario}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookingsTab = ({ reservas, filtro, onFiltroChange, navigateTo }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mis Reservas</h2>
      <button 
        className="btn btn-primary"
        onClick={() => navigateTo('new-booking')}
      >
        <i className="fas fa-plus"></i> Nueva Reserva
      </button>
    </div>

    <div className="bookings-filters">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => onFiltroChange('todas')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filtro === 'activa' ? 'active' : ''}`}
          onClick={() => onFiltroChange('activa')}
        >
          Activas
        </button>
        <button 
          className={`filter-btn ${filtro === 'completada' ? 'active' : ''}`}
          onClick={() => onFiltroChange('completada')}
        >
          Completadas
        </button>
      </div>
    </div>

    <div className="bookings-detailed-list">
      {reservas.length > 0 ? (
        reservas.map(reserva => (
          <div key={reserva.id} className="booking-detailed-card">
            <div className="booking-main">
              <div className="service-icon">
                <i className="fas fa-calendar"></i>
              </div>
              <div className="booking-info-detailed">
                <h4>{reserva.servicio}</h4>
                <p><strong>Cuidador:</strong> {reserva.cuidador}</p>
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p><strong>Horario:</strong> {reserva.hora}</p>
                <p><strong>Duración:</strong> {reserva.duracion}</p>
                <p><strong>Dirección:</strong> {reserva.direccion}</p>
              </div>
            </div>
            <div className="booking-side">
              <div className="booking-price-main">
                {reserva.precio}
              </div>
              <div className={`booking-status-large ${reserva.estado.toLowerCase()}`}>
                {reserva.estado}
              </div>
              <div className="booking-actions">
                <button className="btn btn-outline btn-sm">Detalles</button>
                {reserva.estado === 'Activa' && (
                  <button className="btn btn-primary btn-sm">Modificar</button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <i className="fas fa-calendar-times"></i>
          <h3>No hay reservas</h3>
          <p>No se encontraron reservas con los filtros seleccionados</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('new-booking')}
          >
            Crear Mi Primera Reserva
          </button>
        </div>
      )}
    </div>
  </div>
);

const CaregiversTab = ({ cuidadores, filtro, busqueda, onFiltroChange, onBusquedaChange, navigateTo }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Cuidadores</h2>
      <div className="search-box large">
        <i className="fas fa-search"></i>
        <input 
          type="text" 
          placeholder="Buscar cuidadores..." 
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>
    </div>

    <div className="caregivers-filters">
      <div className="filter-tags">
        <span 
          className={`filter-tag ${filtro === 'todos' ? 'active' : ''}`}
          onClick={() => onFiltroChange('todos')}
        >
          Todos
        </span>
        <span 
          className={`filter-tag ${filtro === 'disponibles' ? 'active' : ''}`}
          onClick={() => onFiltroChange('disponibles')}
        >
          Disponibles
        </span>
        <span 
          className={`filter-tag ${filtro === 'day care' ? 'active' : ''}`}
          onClick={() => onFiltroChange('day care')}
        >
          Day Care
        </span>
        <span 
          className={`filter-tag ${filtro === 'paseos' ? 'active' : ''}`}
          onClick={() => onFiltroChange('paseos')}
        >
          Paseos
        </span>
      </div>
    </div>

    <div className="caregivers-detailed-grid">
      {cuidadores.length > 0 ? (
        cuidadores.map(cuidador => (
          <div key={cuidador.id} className="caregiver-detailed-card">
            <div className="caregiver-header">
              <div className="caregiver-avatar-large">
                <img src={cuidador.foto} alt={cuidador.nombre} />
                <div className={`availability-badge ${cuidador.disponible ? 'available' : 'busy'}`}>
                  {cuidador.disponible ? 'Disponible' : 'No disponible'}
                </div>
              </div>
              <div className="caregiver-main-info">
                <h3>{cuidador.nombre}</h3>
                <p className="specialty">{cuidador.especialidad}</p>
                <div className="caregiver-stats">
                  <div className="stat">
                    <i className="fas fa-star"></i>
                    <span><strong>{cuidador.calificacion}</strong> ({cuidador.reseñas} reseñas)</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-clock"></i>
                    <span>{cuidador.experiencia} de experiencia</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-dollar-sign"></i>
                    <span>{cuidador.precioHora}/hora</span>
                  </div>
                </div>
                
                <div className="caregiver-services-detailed">
                  <h4>Servicios que ofrece:</h4>
                  <div className="services-grid-mini">
                    {cuidador.servicios.map((servicio, index) => (
                      <div key={index} className="service-item">
                        <img src={servicio.imagen} alt={servicio.nombre} />
                        <div className="service-info-mini">
                          <strong>{servicio.nombre}</strong>
                          <span>{servicio.descripcion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="caregiver-actions">
              <button className="btn btn-outline">
                <i className="fas fa-heart"></i> Favorito
              </button>
              <button 
                className="btn btn-primary" 
                disabled={!cuidador.disponible}
                onClick={() => navigateTo('new-booking')}
              >
                <i className="fas fa-calendar-plus"></i> Reservar
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <i className="fas fa-users-slash"></i>
          <h3>No se encontraron cuidadores</h3>
          <p>Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  </div>
);

const ServicesTab = ({ servicios, navigateTo }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Servicios Disponibles</h2>
      <p>Elige el servicio perfecto para tu mascota</p>
    </div>

    <div className="services-grid-detailed">
      {servicios.map(servicio => (
        <div key={servicio.id} className="service-card-detailed">
          {servicio.popular && <div className="popular-badge">Más Popular</div>}
          <div className="service-image-detailed">
            <img src={servicio.imagen} alt={servicio.nombre} />
          </div>
          <div className="service-info-detailed">
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
            <div className="service-details-detailed">
              <span><i className="fas fa-clock"></i> {servicio.duracion}</span>
              <span className="price">{servicio.precio}</span>
            </div>
            <button 
              className="btn btn-primary btn-full"
              onClick={() => navigateTo('new-booking')}
            >
              <i className="fas fa-calendar-plus"></i> Reservar Ahora
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProfileTab = ({ user }) => (
  <div className="tab-content">
    <div className="tab-header">
      <h2>Mi Perfil</h2>
      <button className="btn btn-outline">
        <i className="fas fa-edit"></i> Editar Perfil
      </button>
    </div>

    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'} alt={user?.name} />
            <button className="edit-avatar-btn">
              <i className="fas fa-camera"></i>
            </button>
          </div>
          <div className="profile-info">
            <h3>{user?.name || 'Carlos Rodríguez'}</h3>
            <p>{user?.email || 'carlos@email.com'}</p>
            <div className="member-since">
              <i className="fas fa-calendar"></i>
              Miembro desde Enero 2023
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h4>Información Personal</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Nombre completo</label>
                <span>{user?.name || 'Carlos Rodríguez'}</span>
              </div>
              <div className="detail-item">
                <label>Correo electrónico</label>
                <span>{user?.email || 'carlos@email.com'}</span>
              </div>
              <div className="detail-item">
                <label>Teléfono</label>
                <span>+57 300 123 4567</span>
              </div>
              <div className="detail-item">
                <label>Dirección</label>
                <span>Calle 123 #45-67, Bogotá</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Preferencias</h4>
            <div className="preferences-grid">
              <div className="preference-item">
                <label>Notificaciones por email</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="preference-item">
                <label>Recordatorios de reservas</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="preference-item">
                <label>Ofertas especiales</label>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;