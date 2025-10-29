import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SuccessModal from "./components/SuccessModal";
import NewBooking from "./components/NewBooking";
import AddPet from "./components/AddPet";
import "./styles/globals.css";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [dashboardActiveTab, setDashboardActiveTab] = useState("overview");
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: "Max",
      tipo: "Perro",
      raza: "Golden Retriever",
      edad: 3,
      peso: "25 kg",
      alergias: "Ninguna",
      foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&q=80",
      vacunasAlDia: true,
      ultimaVisita: "15 Oct 2023",
      veterinario: "Dr. Martínez",
    },
    {
      id: 2,
      nombre: "Luna",
      tipo: "Gato",
      raza: "Siamés",
      edad: 2,
      peso: "4 kg",
      alergias: "Polen",
      foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&q=80",
      vacunasAlDia: true,
      ultimaVisita: "20 Sep 2023",
      veterinario: "Dra. Rodríguez",
    },
  ]);

  const navigate = useNavigate();

  // ✅ Restaurar sesión al recargar
  useEffect(() => {
    const savedUser = localStorage.getItem("niddu_user");
    const savedSession = localStorage.getItem("niddu_session");
    if (savedUser && savedSession === "active") {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      if (window.location.pathname === "/") {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  // 🔹 Funciones de autenticación
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("niddu_user", JSON.stringify(userData));
    localStorage.setItem("niddu_session", "active");

    setModalConfig({
      title: "¡Acceso Exitoso!",
      message: "Has iniciado sesión correctamente en NIDDU",
      type: "success",
    });
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("niddu_user");
    localStorage.removeItem("niddu_session");
    navigate("/");
  };

  const handleRegister = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("niddu_user", JSON.stringify(userData));
    localStorage.setItem("niddu_session", "active");

    setModalConfig({
      title: "¡Registro Exitoso!",
      message: "Tu cuenta ha sido creada correctamente",
      type: "success",
    });
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/dashboard");
    }, 2000);
  };

  const handlePetAdded = (nuevaMascota) => {
    setMascotas((prev) => [...prev, nuevaMascota]);
    setModalConfig({
      title: "¡Mascota Agregada!",
      message: `${nuevaMascota.nombre} ha sido agregada a tu perfil`,
      type: "success",
    });
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/dashboard?tab=pets"); // ✅ Actualizado
    }, 2000);
  };

  const handleDashboardTabChange = (tab) => setDashboardActiveTab(tab);
  const closeModal = () => setShowSuccessModal(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

      {/* 📍 Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <HowItWorks />
              <Testimonials />
              <CTA />
            </>
          }
        />

        <Route
          path="/register"
          element={<RegisterPage onRegister={handleRegister} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={user}
              mascotas={mascotas}
              activeTab={dashboardActiveTab}
              onTabChange={handleDashboardTabChange}
            />
          }
        />

        {/* ✅ Rutas sin /dashboard */}
        <Route
          path="/new-booking"
          element={<NewBooking mascotas={mascotas} />}
        />
        <Route
          path="/add-pet"
          element={<AddPet user={user} onPetAdded={handlePetAdded} />}
        />
      </Routes>

      <Footer />

      {showSuccessModal && (
        <SuccessModal config={modalConfig} onClose={closeModal} />
      )}
    </div>
  );
}

// 🔹 Envolvemos App en BrowserRouter
export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
