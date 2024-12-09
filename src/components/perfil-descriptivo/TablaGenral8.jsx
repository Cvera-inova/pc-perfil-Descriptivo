import React, { useState, useEffect } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';
import { fetchRiesgoDelCargoById } from '@src/services/riesgos.dao';

const EquiposProteccionIndividual = ({ id_generado }) => {
  const [checkedItems, setCheckedItems] = useState({
    gafas: false,
    guante: false,
    mascarilla: false,
    vestimenta: false,
  });

  useEffect(() => {
    const obtenerRiesgos = async () => {
      try {
        const data = await fetchRiesgoDelCargoById(id_generado);
        if (data?.riesgosDelCargo?.length > 0) {
          const equipos = data.riesgosDelCargo[0].equipos;
          setCheckedItems(equipos);
        } else {
          console.error('No se encontraron riesgos del cargo.');
        }
      } catch (error) {
        console.error('Error al obtener los riesgos:', error);
      }
    };

    obtenerRiesgos();
  }, [id_generado]);

  return (
    <div
      style={{
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <table style={{ width: '80%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <th
              colSpan="14"
              style={{
                backgroundColor: '#EEE',
                padding: '10px',
                color: '#21498E',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5em',
                  }}
                >
                  Equipos de protección individual para el puesto de trabajo
                </span>
                <EditProfileButton editRoute={`/admin/analisis-puestos/perfiles/riesgosCargo/${id_generado}`} />
              </div>
            </th>
          </tr>

          <tr>
            <td style={cellStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="/images/equiposSeguridad/gafas.png"
                  alt="Gafas de seguridad"
                  style={{ width: '50px', marginBottom: '5px' }} // Adjust size/margin as needed
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.gafas}
                  />
                  <span>Gafas</span>
                </div>
              </div>
            </td>
            <td style={cellStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="/images/equiposSeguridad/guantes.png"
                  alt="Guantes de seguridad"
                  style={{ width: '50px', marginBottom: '5px' }} // Adjust size/margin as needed
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.guante}
                  />
                  <span>Guantes</span>
                </div>
              </div>
            </td>
            <td style={cellStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="/images/equiposSeguridad/mascarilla.png"
                  alt="Mascarilla de seguridad"
                  style={{ width: '50px', marginBottom: '5px' }} // Adjust size/margin as needed
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.mascarilla}
                  />
                  <span>Mascarilla</span>
                </div>
              </div>
            </td>
            <td style={cellStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src="/images/equiposSeguridad/vestimenta.png"
                  alt="Vestimenta de seguridad"
                  style={{ width: '50px', marginBottom: '5px' }} // Adjust size/margin as needed
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={checkedItems.vestimenta}
                  />
                  <span>Vestimenta</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
  width: '12.5%',
  flexDirection:'column',
};

export default EquiposProteccionIndividual;
