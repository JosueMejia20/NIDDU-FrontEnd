import React, { useState } from "react";
import "../../styles/caregiver/ServiceSelection.css";
import { removerTipoServicioDeCuidador } from "../../api/servicios/serviciosApi";

const ServiceDeletion = ({ serviciosDelCuidador, user }) => {
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [deleting, setDeleting] = useState(false);

  // Mapeo de iconos para los servicios
  const getServiceIcon = (idTipoServicio) => {
    const serviceIcons = {
      1: "fa-home", // Day Care
      2: "fa-walking", // Paseos
      3: "fa-cut", // Peluqueria
      4: "fa-graduation-cap", // Entrenamiento
    };
    return serviceIcons[idTipoServicio] || "fa-paw";
  };

  const formatPrice = (precio) => {
    return `$${precio}`;
  };

  const toggleServiceDeletion = (serviceId) => {
    setSelectedForDeletion((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleDeleteServices = async () => {
    if (selectedForDeletion.length === 0) {
      alert("No hay servicios seleccionados para eliminar");
      return;
    }

    if (!user?.idCuidador) {
      alert("Error: No se encontró el ID del cuidador");
      return;
    }

    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar ${selectedForDeletion.length} servicio(s)?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      console.log("Iniciando eliminación de servicios...");
      console.log("Servicios a eliminar:", selectedForDeletion);
      console.log("Para cuidador:", user.idCuidador);

      // Crear un array de promesas para eliminar todos los servicios seleccionados
      const deletePromises = selectedForDeletion.map((idTipoServicio) => {
        console.log(
          `Eliminando servicio ${idTipoServicio} del cuidador ${user.idCuidador}`
        );
        return removerTipoServicioDeCuidador(user.idCuidador, idTipoServicio);
      });

      // Ejecutar todas las llamadas a la API en paralelo
      const results = await Promise.allSettled(deletePromises);

      const successfulDeletions = results.filter(
        (result) => result.status === "fulfilled"
      );
      const failedDeletions = results.filter(
        (result) => result.status === "rejected"
      );

      console.log(`Eliminaciones exitosas: ${successfulDeletions.length}`);
      console.log(`Eliminaciones fallidas: ${failedDeletions.length}`);

      if (failedDeletions.length > 0) {
        console.error("Errores en algunas eliminaciones:", failedDeletions);

        if (successfulDeletions.length === 0) {
          throw new Error(
            "No se pudo eliminar ninguno de los servicios seleccionados"
          );
        } else {
          alert(
            `Se eliminaron ${successfulDeletions.length} de ${selectedForDeletion.length} servicio(s). Algunos no pudieron ser eliminados.`
          );
        }
      } else {
        alert(
          `¡Éxito! Se eliminaron ${successfulDeletions.length} servicio(s) correctamente.`
        );
      }

      setSelectedForDeletion([]);

      // Por ahora, recargamos la página para ver los cambios
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error eliminando servicios:", error);

      if (error.response) {
        // Error de la API
        console.error("Detalles del error:", error.response.data);
        alert(
          `Error del servidor: ${
            error.response.data?.message ||
            "No se pudieron eliminar los servicios"
          }`
        );
      } else if (error.request) {
        // Error de red
        alert(
          "Error de conexión. Verifica tu conexión a internet e intenta nuevamente."
        );
      } else {
        // Otros errores
        alert(
          error.message ||
            "Error al eliminar los servicios. Por favor, intenta nuevamente."
        );
      }
    } finally {
      setDeleting(false);
    }
  };

  // Si no hay servicios del cuidador, no mostrar nada
  if (!serviciosDelCuidador || serviciosDelCuidador.length === 0) {
    return null;
  }

  return (
    <div className="service-deletion-section">
      <div className="deletion-header">
        <h2>Servicios Actualmente Ofrecidos</h2>
        <p>
          Selecciona los servicios que deseas dejar de ofrecer temporalmente
        </p>
      </div>

      <div className="services-deletion-grid">
        {serviciosDelCuidador.map((servicio) => {
          const estaSeleccionado = selectedForDeletion.includes(
            servicio.idTipoServicio
          );

          return (
            <div
              key={servicio.idTipoServicio}
              className={`service-deletion-card ${
                estaSeleccionado ? "selected-for-deletion" : ""
              }`}
              onClick={() => toggleServiceDeletion(servicio.idTipoServicio)}
            >
              <div className="service-icon-deletion">
                <i
                  className={`fas ${getServiceIcon(servicio.idTipoServicio)}`}
                ></i>
              </div>

              <div className="service-content-deletion">
                <h3>{servicio.nombreServicio || "Servicio"}</h3>
                <p className="service-description-deletion">
                  {servicio.descripcion || "Sin descripción disponible"}
                </p>

                <div className="service-details-deletion">
                  <div className="service-price-deletion">
                    {formatPrice(servicio.precioHora || 0)}/hora
                  </div>
                </div>

                <div className="deletion-indicator">
                  {estaSeleccionado ? (
                    <>
                      <i className="fas fa-times-circle deletion-icon"></i>
                      <span>Eliminar</span>
                    </>
                  ) : (
                    <>
                      <i className="far fa-circle"></i>
                      <span>Seleccionar para eliminar</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="deletion-actions">
        <div className="deletion-summary">
          <p>
            <strong>{selectedForDeletion.length}</strong> servicio(s)
            seleccionado(s) para eliminar
          </p>
          <p className="warning-text">
            <small>
              <i className="fas fa-exclamation-triangle"></i>
              Los servicios eliminados dejarán de estar disponibles para nuevas
              reservas
            </small>
          </p>
        </div>

        <div className="deletion-buttons">
          <button
            type="button"
            className="btn-deletion btn-outline-deletion"
            onClick={() => setSelectedForDeletion([])}
            disabled={deleting || selectedForDeletion.length === 0}
          >
            Limpiar Selección
          </button>
          <button
            type="button"
            className="btn-deletion btn-danger-deletion"
            onClick={handleDeleteServices}
            disabled={selectedForDeletion.length === 0 || deleting}
          >
            {deleting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Eliminando...
              </>
            ) : (
              <>
                <i className="fas fa-trash-alt"></i> Eliminar Servicios
                Seleccionados
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDeletion;
