import React, { useState, useEffect } from "react";
import "../../styles/caregiver/ReportsSection.css";
import { useNavigate } from "react-router-dom";
import { obtenerReservasPorCuidador } from "../../api/cuidador/cuidadoresApi";

const ReportsSection = ({ user }) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const mapServiceName = (serviceName) => {
    const serviceMap = {
      "Day Care Diario": "Day Care",
      "Paseos Moderados": "Paseos",
      "Peluquería Canina": "Peluquería",
      "Entrenamiento Básico": "Entrenamiento",
    };
    return serviceMap[serviceName] || serviceName;
  };

  useEffect(() => {
    const fetchAndCalculateReports = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.idCuidador) {
          console.log("No hay ID de cuidador disponible");
          setReports(getDefaultReports());
          return;
        }

        console.log("Obteniendo reservas para cuidador:", user.idCuidador);
        const reservasData = await obtenerReservasPorCuidador(user.idCuidador);
        console.log("Reservas obtenidas para reportes:", reservasData);

        if (!Array.isArray(reservasData)) {
          throw new Error("Formato de datos inválido");
        }

        //  Calcular Ingresos Totales (solo reservas Completadas)
        const reservasCompletadas = reservasData.filter(
          (reserva) => reserva.estado === "Completado"
        );
        const ingresosTotales = reservasCompletadas.reduce(
          (sum, reserva) => sum + (reserva.total || 0),
          0
        );

        // Calcular Reservas por Servicio (solo Completadas)
        const serviciosCompletados = {};
        reservasCompletadas.forEach((reserva) => {
          const servicio = mapServiceName(reserva.nombreServicio);
          serviciosCompletados[servicio] =
            (serviciosCompletados[servicio] || 0) + 1;
        });

        // Calcular porcentajes
        const totalServiciosCompletados = reservasCompletadas.length;
        const statsPorServicio = Object.entries(serviciosCompletados).map(
          ([servicio, cantidad]) => {
            const porcentaje =
              totalServiciosCompletados > 0
                ? Math.round((cantidad / totalServiciosCompletados) * 100)
                : 0;
            return {
              value: `${porcentaje}%`,
              label: servicio,
            };
          }
        );

        // Ordenar por porcentaje descendente
        statsPorServicio.sort((a, b) => {
          const porcentajeA = parseInt(a.value);
          const porcentajeB = parseInt(b.value);
          return porcentajeB - porcentajeA;
        });

        // Calcular Clientes Atendidos
        const reservasPendientes = reservasData.filter(
          (reserva) => reserva.estado === "Pendiente"
        ).length;

        const reservasConfirmadas = reservasData.filter(
          (reserva) => reserva.estado === "Confirmado"
        ).length;

        // Crear el array de reports actualizado
        const updatedReports = [
          {
            title: "Ingresos Totales",
            icon: "chart-bar",
            color: "blue",
            stats: [
              {
                value: formatCurrency(ingresosTotales),
                label: "Ingresos totales",
              },
            ],
          },
          {
            title: "Reservas por Servicio",
            icon: "chart-pie",
            color: "green",
            stats:
              statsPorServicio.length > 0
                ? statsPorServicio
                : [{ value: "0%", label: "Sin datos" }],
          },
          {
            title: "Clientes Atendidos",
            icon: "chart-line",
            color: "brown",
            stats: [
              {
                value: reservasPendientes.toString(),
                label: "Reservas por confirmar",
              },
              {
                value: reservasConfirmadas.toString(),
                label: "Reservas confirmadas",
              },
              {
                value: totalServiciosCompletados.toString(),
                label: "Reservas completadas",
              },
            ],
          },
          {
            title: "Calificaciones",
            icon: "star",
            color: "yellow",
            stats: [
              { value: "5", label: "Calificación Promedio" },
              { value: "0", label: "Reseñas Totales" },
            ],
          },
        ];

        setReports(updatedReports);
      } catch (error) {
        console.error("Error obteniendo reportes:", error);
        setError(
          "Error al cargar los reportes. Por favor, intenta nuevamente."
        );
        setReports(getDefaultReports());
      } finally {
        setLoading(false);
      }
    };

    const getDefaultReports = () => {
      return [
        {
          title: "Ingresos Totales",
          icon: "chart-bar",
          color: "blue",
          stats: [{ value: "$0", label: "Ingresos totales" }],
        },
        {
          title: "Reservas por Servicio",
          icon: "chart-pie",
          color: "green",
          stats: [{ value: "0%", label: "Sin datos" }],
        },
        {
          title: "Clientes Atendidos",
          icon: "chart-line",
          color: "brown",
          stats: [
            { value: "0", label: "Reservas por confirmar" },
            { value: "0", label: "Reservas confirmadas" },
          ],
        },
        {
          title: "Calificaciones",
          icon: "star",
          color: "yellow",
          stats: [
            { value: "5", label: "Calificación Promedio" },
            { value: "0", label: "Reseñas Totales" },
          ],
        },
      ];
    };

    fetchAndCalculateReports();
  }, [user?.idCuidador]);

  if (loading) {
    return (
      <section className="reports-section">
        <div className="container">
          <div className="page-header">
            <button className="btn-back" onClick={() => navigate("/caregiver")}>
              <i className="fas fa-arrow-left"></i> Volver al Dashboard
            </button>
            <h1>Reportes y Estadísticas</h1>
            <p>Analiza tu desempeño y crecimiento</p>
          </div>
          <div className="loading-container">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando reportes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reports-section">
        <div className="container">
          <div className="page-header">
            <button className="btn-back" onClick={() => navigate("/caregiver")}>
              <i className="fas fa-arrow-left"></i> Volver al Dashboard
            </button>
            <h1>Reportes y Estadísticas</h1>
            <p>Analiza tu desempeño y crecimiento</p>
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
    <section className="reports-section">
      <div className="container">
        <div className="page-header">
          <button className="btn-back" onClick={() => navigate("/caregiver")}>
            <i className="fas fa-arrow-left"></i> Volver al Dashboard
          </button>
          <h1>Reportes y Estadísticas</h1>
          <p>Analiza tu desempeño y crecimiento</p>
        </div>

        <div className="reports-grid">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <h3>{report.title}</h3>
              <div className="chart-placeholder">
                <i
                  className={`fas fa-${report.icon}`}
                  style={{
                    fontSize: "48px",
                    color: `var(--primary-${report.color})`,
                  }}
                ></i>
              </div>
              <div className="report-stats">
                {report.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="report-stat">
                    <h4>{stat.value}</h4>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportsSection;
