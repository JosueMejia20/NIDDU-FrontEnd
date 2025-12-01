import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { obtenerHistorialReservas } from "../api/usuarios/usuariosApi";

const BookingsTab = ({ user }) => {
  const { navigate } = useOutletContext();
  const [filtro, setFiltro] = useState("todas");
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Mapear estado de la API al tipo para filtros
  const mapEstadoToTipo = (estado) => {
    const estadoMap = {
      Pagado: "activa",
      Pendiente: "activa",
      Completado: "completada",
    };
    return estadoMap[estado] || "activa";
  };

  // Lógica de filtrado
  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtro === "todas") return true;
    return mapEstadoToTipo(reserva.estado) === filtro;
  });

  // Función para cambiar filtro
  const handleFiltroChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  // Cargar reservas desde la API
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Obteniendo reservas para usuario ID:", user?.id);

        const reservasData = await obtenerHistorialReservas(user?.id);
        console.log("Reservas desde API:", reservasData);

        // Agregar propiedad 'tipo' para compatibilidad con filtros
        const reservasConTipo = reservasData.map((reserva) => ({
          ...reserva,
          tipo: mapEstadoToTipo(reserva.estado),
        }));

        setReservas(reservasConTipo);
      } catch (error) {
        console.error("Error cargando reservas:", error);
        setError(
          "Error al cargar las reservas. Por favor, intenta nuevamente."
        );

        // Datos de fallback
        const reservasFallback = [
          {
            nombreCuidador: "Lucía",
            apellidoCuidador: "González",
            nombreMascota: "Firulais",
            nombreServicio: "Paseos Moderados",
            fecha: "2025-11-10",
            subtotal: 150.0,
            impuesto: 22.5,
            total: 172.5,
            estado: "Completado",
            tipo: "completada",
          },
        ];
        setReservas(reservasFallback);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchReservas();
    }
  }, [user?.id]);

  // Debug para ver el user object
  useEffect(() => {
    console.log("User object en BookingsTab:", user);
  }, [user]);

  if (loading) {
    return (
      <div className="tab-content">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando reservas...</p>
        </div>
      </div>
    );
  }

  if (error && reservas.length === 0) {
    return (
      <div className="tab-content">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>{error}</h3>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Mis Reservas</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/new-booking")}
        >
          <i className="fas fa-plus"></i> Nueva Reserva
        </button>
      </div>

      <div className="bookings-filters">
        <div className="filter-buttons">
          <button
            type="button"
            className={`filter-btn ${filtro === "todas" ? "active" : ""}`}
            onClick={() => handleFiltroChange("todas")}
          >
            Todas
          </button>
          <button
            type="button"
            className={`filter-btn ${filtro === "activa" ? "active" : ""}`}
            onClick={() => handleFiltroChange("activa")}
          >
            Activas
          </button>
          <button
            type="button"
            className={`filter-btn ${filtro === "completada" ? "active" : ""}`}
            onClick={() => handleFiltroChange("completada")}
          >
            Completadas
          </button>
        </div>
      </div>

      <div className="bookings-detailed-list">
        {reservasFiltradas.length > 0 ? (
          reservasFiltradas.map((reserva, index) => (
            <div key={index} className="booking-detailed-card">
              <div className="booking-main">
                <div className="service-icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="booking-info-detailed">
                  <h4>{reserva.nombreServicio}</h4>
                  <p>
                    <strong>Cuidador:</strong> {reserva.nombreCuidador}{" "}
                    {reserva.apellidoCuidador}
                  </p>
                  <p>
                    <strong>Mascota:</strong> {reserva.nombreMascota}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {formatDate(reserva.fecha)}
                  </p>
                </div>
              </div>
              <div className="booking-side">
                <div className="booking-price-main">
                  {formatPrice(reserva.total)}
                </div>
                <div
                  className={`booking-status-large ${reserva.estado.toLowerCase()}`}
                >
                  {reserva.estado}
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
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/new-booking")}
            >
              Crear Mi Primera Reserva
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsTab;
