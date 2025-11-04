import React, { useState } from "react";

const DepartamentosSelect = () => {
  const departamentos = {
    AT: "Atlántida",
    CH: "Choluteca",
    CL: "Colón",
    CM: "Comayagua",
    CP: "Copán",
    CR: "Cortés",
    EP: "El Paraíso",
    FM: "Francisco Morazán",
    GD: "Gracias a Dios",
    IN: "Intibucá",
    IB: "Islas de la Bahía",
    LP: "La Paz",
    LE: "Lempira",
    OC: "Ocotepeque",
    OL: "Olancho",
    SB: "Santa Bárbara",
    VA: "Valle",
    YO: "Yoro",
  };

  const [departamento, setDepartamento] = useState("");

  const handleChange = (e) => {
    setDepartamento(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="departamento">Departamento</label>
      <select
        id="departamento"
        name="departamento"
        value={departamento}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      >
        <option value="">Selecciona un departamento</option>
        {Object.entries(departamentos).map(([codigo, nombre]) => (
          <option key={codigo} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartamentosSelect;
