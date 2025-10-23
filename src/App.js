// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import SuccessModal from './components/SuccessModal';
import './styles/globals.css';
import NewBooking from './components/NewBooking';
import AddPet from './components/AddPet';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [dashboardActiveTab, setDashboardActiveTab] = useState('overview');
  const [mascotas, setMascotas] = useState([
    { 
      id: 1, 
      nombre: 'Max', 
      tipo: 'Perro', 
      raza: 'Golden Retriever', 
      edad: 3,
      peso: '25 kg',
      alergias: 'Ninguna',
      foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      vacunasAlDia: true,
      ultimaVisita: '15 Oct 2023',
      veterinario: 'Dr. Martínez'
    },
    { 
      id: 2, 
      nombre: 'Luna', 
      tipo: 'Gato', 
      raza: 'Siamés', 
      edad: 2,
      peso: '4 kg',
      alergias: 'Polen',
      foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      vacunasAlDia: true,
      ultimaVisita: '20 Sep 2023',
      veterinario: 'Dra. Rodríguez'
    }
  ]);

  // Efecto para cargar la sesión al iniciar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('niddu_user');
    const savedSession = localStorage.getItem('niddu_session');
    
    if (savedUser && savedSession === 'active') {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      setCurrentPage('dashboard'); // Redirigir al dashboard automáticamente
    }
  }, []);

  const navigateTo = (page, tab = 'overview') => {
    console.log('Navegando a:', page, 'con tab:', tab);
    setCurrentPage(page);
    if (page === 'dashboard') {
      setDashboardActiveTab(tab);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    // Guardar en localStorage
    localStorage.setItem('niddu_user', JSON.stringify(userData));
    localStorage.setItem('niddu_session', 'active');
    
    setModalConfig({
      title: '¡Acceso Exitoso!',
      message: 'Has iniciado sesión correctamente en NIDDU',
      type: 'success'
    });
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      navigateTo('dashboard', 'overview');
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Limpiar localStorage
    localStorage.removeItem('niddu_user');
    localStorage.removeItem('niddu_session');
    
    navigateTo('home');
  };

  const handleRegister = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    
    // Guardar en localStorage
    localStorage.setItem('niddu_user', JSON.stringify(userData));
    localStorage.setItem('niddu_session', 'active');
    
    setModalConfig({
      title: '¡Registro Exitoso!',
      message: 'Tu cuenta ha sido creada correctamente',
      type: 'success'
    });
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      navigateTo('dashboard', 'overview');
    }, 2000);
  };

  const handlePetAdded = (nuevaMascota) => {
    setMascotas(prev => [...prev, nuevaMascota]);
    setModalConfig({
      title: '¡Mascota Agregada!',
      message: `${nuevaMascota.nombre} ha sido agregado a tu perfil`,
      type: 'success'
    });
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      navigateTo('dashboard', 'pets');
    }, 2000);
  };

  const handleDashboardTabChange = (tab) => {
    setDashboardActiveTab(tab);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const renderPage = () => {
    console.log('Renderizando página:', currentPage);
    
    switch(currentPage) {
      case 'register':
        return <RegisterPage navigateTo={navigateTo} onRegister={handleRegister} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            navigateTo={navigateTo}
            mascotas={mascotas}
            activeTab={dashboardActiveTab}
            onTabChange={handleDashboardTabChange}
          />
        );
      case 'new-booking':
        return <NewBooking navigateTo={navigateTo} mascotas={mascotas} />;
      case 'add-pet':
        return <AddPet user={user} navigateTo={navigateTo} onPetAdded={handlePetAdded} />;
      case 'home':
      default:
        // Si está logueado y trata de ir al home, redirigir al dashboard
        if (isLoggedIn && currentPage === 'home') {
          // Usar timeout para evitar el loop de renderizado
          setTimeout(() => navigateTo('dashboard'), 0);
          return <div>Cargando...</div>;
        }
        return (
          <>
            <Hero navigateTo={navigateTo} />
            <Services />
            <HowItWorks />
            <Testimonials />
            <CTA navigateTo={navigateTo} />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
      
      {showSuccessModal && (
        <SuccessModal 
          config={modalConfig}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;