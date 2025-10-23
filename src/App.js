// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Función para cambiar de página
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'register':
        return <RegisterPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
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
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;