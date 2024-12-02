import React, { useState } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';

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
    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      <table style={{ width: '80%', borderCollapse: 'collapse' }}>
        <tbody>
        <tr>
              <th
                colSpan="14"
                style={{
                  backgroundColor: "#EEE",
                  padding: "10px",
                  color: "#21498E",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Texto centrado */}
                  <span
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                    }}
                  >
                              Equipos de protección individual para el puesto de trabajo

                  </span>
                  {/* Botón */}
                  <EditProfileButton editRoute="/ruta/para/CompleteTable" />
                </div>
              </th>
            </tr>
 
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