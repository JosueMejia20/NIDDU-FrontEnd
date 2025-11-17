import React from "react";
import "../../styles/caregiver/ReportsSection.css";
import { useNavigate } from "react-router-dom";

//TODO: Este utiliza la funcion onSectionChange, cambiar su uso con navigate
const ReportsSection = () => {
  const navigate = useNavigate();

  const reports = [
    {
      title: "Ingresos Mensuales",
      icon: "chart-bar",
      color: "blue",
      stats: [
        { value: "$1.25M", label: "Este Mes" },
        { value: "$850K", label: "Mes Anterior" },
      ],
    },
    {
      title: "Reservas por Servicio",
      icon: "chart-pie",
      color: "green",
      stats: [
        { value: "42%", label: "Day Care" },
        { value: "35%", label: "Paseos" },
      ],
    },
    {
      title: "Clientes Recurrentes",
      icon: "chart-line",
      color: "brown",
      stats: [
        { value: "68%", label: "Tasa de Retención" },
        { value: "15", label: "Clientes Activos" },
      ],
    },
    {
      title: "Calificaciones",
      icon: "star",
      color: "yellow",
      stats: [
        { value: "4.9", label: "Calificación Promedio" },
        { value: "42", label: "Reseñas Totales" },
      ],
    },
  ];

  const summaryStats = [
    { value: "156", label: "Reservas Totales" },
    { value: "98%", label: "Tasa de Finalización" },
    { value: "2.3%", label: "Tasa de Cancelación" },
    { value: "4.7", label: "Reservas/Semana" },
  ];

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

        <div className="dashboard-section">
          <h3>Resumen de Actividad</h3>
          <div
            className="report-stats"
            style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            {summaryStats.map((stat, index) => (
              <div key={index} className="report-stat">
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportsSection;
