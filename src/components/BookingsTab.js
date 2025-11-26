import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const BookingsTab = () => {
  const { navigate } = useOutletContext();
  const [filtro, setFiltro] = useState("todas");
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos de reservas (los que tenías en App.js)
  const reservasData = [
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

  // Lógica de filtrado (la que tenías en App.js)
  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtro === "todas") return true;
    return reserva.tipo === filtro;
  });

  // Función para cambiar filtro
  const handleFiltroChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  // Cargar reservas al montar el componente
  useEffect(() => {
    // Simular carga de datos (puedes reemplazar con llamada a API real)
    setLoading(true);
    const timer = setTimeout(() => {
      setReservas(reservasData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
          reservasFiltradas.map((reserva) => (
            <div key={reserva.id} className="booking-detailed-card">
              <div className="booking-main">
                <div className="service-icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="booking-info-detailed">
                  <h4>{reserva.servicio}</h4>
                  <p>
                    <strong>Cuidador:</strong> {reserva.cuidador}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {reserva.fecha}
                  </p>
                  <p>
                    <strong>Horario:</strong> {reserva.hora}
                  </p>
                  <p>
                    <strong>Duración:</strong> {reserva.duracion}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {reserva.direccion}
                  </p>
                </div>
              </div>
              <div className="booking-side">
                <div className="booking-price-main">{reserva.precio}</div>
                <div
                  className={`booking-status-large ${reserva.estado.toLowerCase()}`}
                >
                  {reserva.estado}
                </div>
                <div className="booking-actions">
                  <button type="button" className="btn btn-outline btn-sm">
                    Detalles
                  </button>{" "}
                  {reserva.estado === "Activa" && (
                    <>
                      <button type="button" className="btn btn-primary btn-sm">
                        Modificar
                      </button>
                      <button type="button" className="btn btn-danger btn-sm">
                        Cancelar
                      </button>
                    </>
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
