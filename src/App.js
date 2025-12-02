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
import ScrollToTop from "./components/ScrollToTop";
import { userService } from "./api/services/userService";
import RegisterCaregiverPage from "./pages/RegisterCaregiverPage";
import OverviewTab from "./components/OverviewTab";
import PetsTab from "./components/PetsTab";
import BookingsTab from "./components/BookingsTab";
import CaregiversTab from "./components/CaregiversTab";
import ServicesTab from "./components/ServicesTab";
import ProfileTab from "./components/ProfileTab";
import CaregiverDashboard from "./components/caregiver/CaregiverDashboard";
import ServiceCreation from "./components/caregiver/ServiceCreation";
import CaregiverBookings from "./components/caregiver/CaregiverBooking";
import ReportsSection from "./components/caregiver/ReportsSection";
import SettingsSection from "./components/caregiver/SettingsSection";
import CaregiverLayout from "./components/caregiver/CaregiverLayout";
import LoginPageCaregiver from "./pages/LoginPageCaregiver";
import { obtenerMascotasPorUsuario } from "./api/mascotas/mascotasApi";
import ServiceSelection from "./components/caregiver/ServiceSelection";

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
  const [mascotas, setMascotas] = useState([]);

  // Navigate
  const navigate = useNavigate();

  // PRIMERO: Restaurar sesion
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

  // SEGUNDO: Obtener mascotas cuando user este disponible
  useEffect(() => {
    if (!user?.id) return; // Mas especifico - necesita user.id

    obtenerMascotasPorUsuario(user.id)
      .then((data) =>
        setMascotas(
          data.map((m) => ({
            id: m.idMascota,
            nombre: m.nombre,
            tipo: m.tipo,
            raza: m.raza,
            edad: m.edad,
            peso: `${m.peso} kg`,
            alergias: m.alergias ?? "Ninguna",
            foto: m.foto ?? "https://placehold.co/600x400?text=Mascota",
            vacunasAlDia: m.vacunasAlDia,
            ultimaVisita: m.ultimaVisita ?? "Sin registro",
            veterinario: m.veterinarioPreferencia ?? "No asignado",
          }))
        )
      )
      .catch(console.error);
  }, [user?.id]); // Dependencia mas especifica

  // Funciones de autenticacion
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

  const handleLoginCaregiver = (userData) => {
    console.log("El usuario es: " + userData);
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
      navigate("/caregiver");
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("niddu_user");
    localStorage.removeItem("usuario");
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

  //Solamente este funcion es para el cuidador, personalizada
  const handleRegisterCaregiver = (userData) => {
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
      navigate("/caregiver");
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
      navigate("/dashboard"); // Actualizado
    }, 2000);
  };

  const handleDashboardTabChange = (tab) => setDashboardActiveTab(tab);
  const closeModal = () => setShowSuccessModal(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

      {/* Rutas */}
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

        <Route
          path="/registerCaregiver"
          element={
            <RegisterCaregiverPage onRegister={handleRegisterCaregiver} />
          }
        />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/loginCaregiver"
          element={<LoginPageCaregiver onLogin={handleLoginCaregiver} />}
        />

        {/* Dashboard con rutas anidadas */}
        <Route
          path="/dashboard"
          element={<Dashboard user={user} mascotas={mascotas} />}
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route
            path="overview"
            element={<OverviewTab mascotas={mascotas} user={user} />}
          />
          <Route path="pets" element={<PetsTab mascotas={mascotas} />} />
          <Route path="bookings" element={<BookingsTab user={user} />} />
          <Route path="caregivers" element={<CaregiversTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route path="profile" element={<ProfileTab user={user} />} />
        </Route>

        {/* Rutas del Caregiver con Layout */}
        <Route
          path="/caregiver"
          element={<CaregiverLayout handleLogout={handleLogout} user={user} />}
        >
          <Route index element={<CaregiverDashboard user={user} />} />
          <Route path="reservas" element={<CaregiverBookings user={user} />} />
          {/* <Route
            path="reservas/:id"
            element={
              <AGREGARAQUI /> // Componente para detalles de reserva individual
            }
          /> */}
          <Route path="servicios" element={<ServiceSelection user={user} />} />
          <Route path="reportes" element={<ReportsSection user={user} />} />
          <Route
            path="configuracion"
            element={<SettingsSection user={user} />}
          />
        </Route>

        {/* Rutas sin /dashboard */}
        <Route
          path="/new-booking"
          element={<NewBooking mascotas={mascotas} user={user} />}
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

export default function RootApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
