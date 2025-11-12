import React, { useState } from "react";

const DepartamentosSelect = ({ value, onDepartamentoChange }) => {
  // Lista fija según tu tabla de la base de datos
  const departamentos = [
    { id: 1, nombre: "Atlántida" },
    { id: 2, nombre: "Choluteca" },
    { id: 3, nombre: "Colón" },
    { id: 4, nombre: "Comayagua" },
    { id: 5, nombre: "Copán" },
    { id: 6, nombre: "Cortés" },
    { id: 7, nombre: "El Paraíso" },
    { id: 8, nombre: "Francisco Morazán" },
    { id: 9, nombre: "Gracias a Dios" },
    { id: 10, nombre: "Intibucá" },
    { id: 11, nombre: "Islas de la Bahía" },
    { id: 12, nombre: "La Paz" },
    { id: 13, nombre: "Lempira" },
    { id: 14, nombre: "Ocotepeque" },
    { id: 15, nombre: "Olancho" },
    { id: 16, nombre: "Santa Bárbara" },
    { id: 17, nombre: "Valle" },
    { id: 18, nombre: "Yoro" },
  ];

  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(value || "");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setDepartamentoSeleccionado(selectedValue);
    onDepartamentoChange(selectedValue); // <-- envia el ID al padre
  };

  return (
    <div className="form-group">
      <label htmlFor="departamento">Departamento</label>
      <select
        id="departamento"
        name="departamento"
        value={departamentoSeleccionado}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      >
        <option value="">Selecciona un departamento</option>
        {departamentos.map((dep) => (
          <option key={dep.id} value={dep.id}>
            {dep.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartamentosSelect;
