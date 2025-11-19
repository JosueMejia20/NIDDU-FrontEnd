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

/*muestuserService
  .obtainUser()
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });*/

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

  /**
   * TODO ESTO ES PARA LOS TABS, SE DEBE ELIMINAR LUEGO (DATADASHBOARD)
   */

  const [filtroReservas, setFiltroReservas] = useState("todas");
  const [filtroCuidadores, setFiltroCuidadores] = useState("todos");
  const [busquedaCuidadores, setBusquedaCuidadores] = useState("");

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

  const userStats = {
    mascotas: mascotas.length,
    reservasActivas: 1,
    cuidadoresFavoritos: 3,
    puntos: 150,
  };

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

  /**
   * AQUI TERMINA LA DATA (DATADASHBOARD)
   */

  const navigate = useNavigate();

  // Restaurar sesión al recargar
  //TODO: Estas funciones dependen mucho del /dashboard, hacer funciones independientes para el cuidador
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

  //Para obtener las mascotas
  useEffect(() => {
    if (!user) return; // espera a que el usuario esté disponible

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
  }, [user]);

  // Funciones de autenticación
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
            element={
              <OverviewTab
                mascotas={mascotas}
                reservas={reservas}
                cuidadores={cuidadores}
                userStats={userStats}
              />
            }
          />
          <Route path="pets" element={<PetsTab mascotas={mascotas} />} />
          <Route
            path="bookings"
            element={
              <BookingsTab
                reservas={reservasFiltradas}
                filtro={filtroReservas}
                onFiltroChange={setFiltroReservas}
              />
            }
          />
          <Route
            path="caregivers"
            element={
              <CaregiversTab
                cuidadores={cuidadoresFiltrados}
                filtro={filtroCuidadores}
                busqueda={busquedaCuidadores}
                onFiltroChange={setFiltroCuidadores}
                onBusquedaChange={setBusquedaCuidadores}
              />
            }
          />
          <Route
            path="services"
            element={<ServicesTab servicios={serviciosDisponibles} />}
          />
          <Route path="profile" element={<ProfileTab user={user} />} />
        </Route>

        {/* Rutas del Caregiver con Layout */}
        <Route path="/caregiver" element={<CaregiverLayout />}>
          <Route index element={<CaregiverDashboard />} />
          <Route path="reservas" element={<CaregiverBookings />} />
          {/* <Route
            path="reservas/:id"
            element={
              <AGREGARAQUI /> // Componente para detalles de reserva individual
            }
          /> */}
          <Route path="servicios" element={<ServiceCreation />} />
          <Route path="reportes" element={<ReportsSection />} />
          <Route path="configuracion" element={<SettingsSection />} />
        </Route>

        {/* Rutas sin /dashboard */}
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

// Envolvemos App en BrowserRouter
export default function RootApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}
