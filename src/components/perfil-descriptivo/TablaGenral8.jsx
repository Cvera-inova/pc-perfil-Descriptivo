import React, { useState } from 'react';

const EquiposProteccionIndividual = ({id_generado}) => {
  // Estado para manejar el estado de los checkboxes
  const [checkedItems, setCheckedItems] = useState(Array(id_generado).fill(false));

  // Función para manejar el cambio en los checkboxes
  const handleCheckChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#21498E', margin: 0, padding: '10px' }}>
          Equipos de protección individual para el puesto de trabajo
        </h2>
      </div>
      <table style={{ width: '80%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <input
                type="checkbox"
                checked={checkedItems[0]}
                onChange={() => handleCheckChange(0)}
                style={{ marginRight: '5px' }}
              />
              Casco
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <input
                type="checkbox"
                checked={checkedItems[1]}
                onChange={() => handleCheckChange(1)}
                style={{ marginRight: '5px' }}
              />
              Guantes
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <input
                type="checkbox"
                checked={checkedItems[2]}
                onChange={() => handleCheckChange(2)}
                style={{ marginRight: '5px' }}
              />
              Mascarilla
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <input
                type="checkbox"
                checked={checkedItems[3]}
                onChange={() => handleCheckChange(3)}
                style={{ marginRight: '5px' }}
              />
              Gafas
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <img
                src="https://img.icons8.com/material-outlined/24/000000/helmet.png" // Icono del casco
                alt="Casco"
              />
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <img
                src="https://img.icons8.com/material-outlined/24/000000/gloves.png" // Icono de guantes
                alt="Guantes"
              />
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <img
                src="https://img.icons8.com/material-outlined/24/000000/mask.png" // Icono de mascarilla
                alt="Mascarilla"
              />
            </td>
            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '12.5%' }}>
              <img
                src="https://img.icons8.com/material-outlined/24/000000/safety-glasses.png" // Icono de gafas
                alt="Gafas de seguridad"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EquiposProteccionIndividual;