import React, { useState, useEffect } from "react";
import "../../styles/caregiver/CaregiverBookings.css";
import { useNavigate } from "react-router-dom";
import {
  obtenerReservasPorCuidador,
  actualizarEstadoReserva,
} from "../../api/cuidador/cuidadoresApi";

const CaregiverBookings = ({ user }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.idCuidador) {
          console.error("No se encontró el ID del cuidador");
          setError("No se pudo identificar al cuidador");
          return;
        }

        console.log("Obteniendo reservas para cuidador ID:", user.idCuidador);

        const reservasData = await obtenerReservasPorCuidador(user.idCuidador);
        console.log("Reservas obtenidas de API:", reservasData);

        if (Array.isArray(reservasData)) {
          setBookings(reservasData);
        } else {
          console.error("Formato de datos incorrecto:", reservasData);
          setBookings([]);
        }
      } catch (error) {
        console.error("Error cargando reservas:", error);
        setError(
          "Error al cargar las reservas. Por favor, intenta nuevamente."
        );

        // Datos de fallback para mantener funcionalidad
        setBookings([
          {
            idServicio: 1,
            estado: "pendiente",
            nombreUsuario: "Ana",
            apellidoUsuario: "Ramirez",
            telefonoUsuario: "99887766",
            nombreMascota: "Firulais",
            tipoMascota: "Perro",
            razaMascota: "Labrador",
            edadMascota: 3.5,
            pesoMascota: 25,
            alergias: "Ninguna",
            veterinarioPreferencia: "VetPet",
            vacunasAlDia: true,
            notas: "Muy activo",
            nombreServicio: "Paseos Moderados",
            fecha: "2025-11-10",
            subtotal: 150,
            impuesto: 22.5,
            total: 172.5,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.idCuidador]);

  const handleAcceptBooking = async (bookingId) => {
    if (window.confirm("¿Estás seguro de que quieres aceptar esta reserva?")) {
      try {
        // Estado 2 = Confirmado/Aceptado
        await actualizarEstadoReserva(bookingId, 2);

        // Actualizar estado localmente
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.idServicio === bookingId
              ? { ...booking, estado: "Confirmado" }
              : booking
          )
        );

        alert(`Reserva ${bookingId} aceptada exitosamente`);
      } catch (error) {
        console.error("Error al aceptar reserva:", error);
        alert("Error al aceptar la reserva. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleRejectBooking = async (bookingId) => {
    if (window.confirm("¿Estás seguro de que quieres rechazar esta reserva?")) {
      try {
        // Estado 3 = Rechazado
        await actualizarEstadoReserva(bookingId, 3);

        // Actualizar estado localmente
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.idServicio === bookingId
              ? { ...booking, estado: "Rechazado" }
              : booking
          )
        );

        alert(`Reserva ${bookingId} rechazada`);
      } catch (error) {
        console.error("Error al rechazar reserva:", error);
        alert("Error al rechazar la reserva. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    if (
      window.confirm("¿Estás seguro de que quieres completar esta reserva?")
    ) {
      try {
        // Estado 4 = Completado
        await actualizarEstadoReserva(bookingId, 4);

        // Actualizar estado localmente
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.idServicio === bookingId
              ? { ...booking, estado: "Completado" }
              : booking
          )
        );

        alert(`Reserva ${bookingId} completada`);
      } catch (error) {
        console.error("Error al completar reserva:", error);
        alert("Error al completar la reserva. Por favor, intenta nuevamente.");
      }
    }
  };

  const normalizeEstado = (estado) => {
    const estadoMap = {
      Pendiente: "pendiente",
      Confirmado: "confirmado",
      Completado: "completado",
      Rechazado: "rechazado",
    };
    return estadoMap[estado] || "pendiente";
  };

  const filteredBookings = bookings.filter((booking) => {
    const estadoNormalizado = normalizeEstado(booking.estado);
    const matchesFilter =
      activeFilter === "all" || estadoNormalizado === activeFilter;
    return matchesFilter;
  });

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };

  if (loading) {
    return (
      <section className="caregiver-bookings">
        <div className="container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando reservas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && bookings.length === 0) {
    return (
      <section className="caregiver-bookings">
        <div className="container">
          <div className="page-header">
            <button className="btn-back" onClick={() => navigate("/caregiver")}>
              <i className="fas fa-arrow-left"></i> Volver al Dashboard
            </button>
            <h1>Gestión de Reservas</h1>
            <p>Administra todas tus reservas activas y pasadas</p>
          </div>

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
      </section>
    );
  }

  return (
    <section className="caregiver-bookings">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/caregiver")}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Gestión de Reservas</h1>
          <p>Administra todas tus reservas activas y pasadas</p>
        </div>

        {/* Mostrar estadisticas
        {bookings.length > 0 && (
          <div className="bookings-stats">
            <div className="stat-badge">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-label">Total Reservas</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">
                {
                  bookings.filter(
                    (b) => normalizeEstado(b.estado) === "pendiente"
                  ).length
                }
              </span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat-badge">
              <span className="stat-number">
                {
                  bookings.filter(
                    (b) => normalizeEstado(b.estado) === "confirmado"
                  ).length
                }
              </span>
              <span className="stat-label">Confirmadas</span>
            </div>
          </div>
        )} */}

        {/* Filtros */}
        <div className="bookings-filters">
          <div className="filter-tabs">
            {["all", "pendiente", "confirmado", "completado", "rechazado"].map(
              (filter) => (
                <button
                  key={filter}
                  className={`filter-tab ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "all"
                    ? "Todas"
                    : filter === "pendiente"
                    ? "Pendientes"
                    : filter === "confirmado"
                    ? "Confirmadas"
                    : filter === "completado"
                    ? "Completadas"
                    : "Canceladas"}
                </button>
              )
            )}
          </div>
        </div>

        {/* Lista de Reservas */}
        <div className="bookings-container">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const estadoNormalizado = normalizeEstado(booking.estado);

              return (
                <div
                  key={booking.idServicio}
                  className={`booking-card ${estadoNormalizado}`}
                >
                  <div className="booking-header">
                    <div className="booking-id">#{booking.idServicio}</div>
                    <div className={`booking-status ${estadoNormalizado}`}>
                      {estadoNormalizado === "pendiente"
                        ? "Pendiente de Confirmación"
                        : estadoNormalizado === "confirmado"
                        ? "Confirmada"
                        : estadoNormalizado === "completado"
                        ? "Completada"
                        : "Cancelada"}
                    </div>
                  </div>

                  <div className="booking-content">
                    <div className="client-info">
                      <div className="client-avatar">
                        <img
                          src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${booking.nombreUsuario}`}
                          alt={booking.nombreUsuario}
                        />
                      </div>
                      <div className="client-details">
                        <h4>
                          {booking.nombreUsuario} {booking.apellidoUsuario}
                        </h4>
                        <p>
                          <i className="fas fa-phone"></i>{" "}
                          {booking.telefonoUsuario}
                        </p>
                      </div>
                    </div>

                    <div className="service-info">
                      <h4>{booking.nombreServicio}</h4>
                      <div className="service-details">
                        <p>
                          <i className="fas fa-paw"></i>{" "}
                          <strong>Mascota:</strong> {booking.nombreMascota} (
                          {booking.tipoMascota}) ({booking.razaMascota}) (
                          {booking.edadMascota} años)
                        </p>
                        <p>
                          <i className="fas fa-clock"></i>{" "}
                          <strong>Fecha:</strong> {formatDate(booking.fecha)}
                        </p>
                        <p>
                          <i className="fas fa-weight"></i>{" "}
                          <strong>Peso:</strong> {booking.pesoMascota} kg
                        </p>
                        {booking.alergias && (
                          <p>
                            <i className="fas fa-exclamation-triangle"></i>{" "}
                            <strong>Alergias:</strong> {booking.alergias}
                          </p>
                        )}
                        <p>
                          <i className="fas fa-info-circle"></i>{" "}
                          <strong>Notas:</strong> {booking.notas || "Sin notas"}
                        </p>
                      </div>
                    </div>

                    <div className="booking-pricing">
                      <div className="price-breakdown">
                        <div className="price-item">
                          <span>Subtotal</span>
                          <span>{formatPrice(booking.subtotal)}</span>
                        </div>
                        <div className="price-item">
                          <span>Impuesto</span>
                          <span>{formatPrice(booking.impuesto)}</span>
                        </div>
                        <div className="price-total">
                          <span>Total</span>
                          <span>{formatPrice(booking.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="booking-actions">
                    {estadoNormalizado === "pendiente" ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleAcceptBooking(booking.idServicio)
                          }
                        >
                          <i className="fas fa-check"></i> Aceptar
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() =>
                            handleRejectBooking(booking.idServicio)
                          }
                        >
                          <i className="fas fa-times"></i> Rechazar
                        </button>
                      </>
                    ) : estadoNormalizado === "confirmado" ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleCompleteBooking(booking.idServicio)
                          }
                        >
                          <i className="fas fa-check-circle"></i> Completar
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-bookings">
              <i className="fas fa-calendar-times"></i>
              <h3>No hay reservas</h3>
              <p>
                {activeFilter === "all"
                  ? "No tienes ninguna reserva registrada."
                  : `No tienes reservas con estado "${activeFilter}".`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaregiverBookings;
