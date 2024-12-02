import { fetchVersionById } from '@src/services/examenesyValoracionesMedicas.dao';
import React, { useEffect, useState } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';

const ExamenesValoracionesMedicasTable = ({id_generado}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest]=useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchVersionById(id_generado); // Consumir el servicio con ID 1
        console.log('Datos obtenidos:', result);
        if (result && result.versiones && result.versiones.length > 0) {
          console.log('setData value',result.versiones[0].examenes[0].examenes)
          setData(result.versiones[0].examenes[0].examenes);
          setTest(result.versiones[0].examenes[0].examenes)
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (data.length === 0) {
    return <div>No hay exámenes o valoraciones médicas disponibles.</div>;
  }

  return (
    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     
      <table style={{ width: '80%', borderCollapse: 'collapse' }}>
        <thead>
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
                    Exámenes y valoraciones médicas ocupacionales
                  </span>
                  {/* Botón */}
                  <EditProfileButton editRoute="/ruta/para/CompleteTable" />
                </div>
              </th>
            </tr>
 
          <tr>
            <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Tipo de Examen/Valoración</th>
            <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Detalles</th>
          </tr>
        </thead>
        
        <tbody>
          {test.map((examen) => (
            <tr key={examen.tipo}>
              <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
                {examen.tipo}
              </td>
              <td style={{ padding: '10px', border: '1px solid black' }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {examen.examenes && examen.examenes.length > 0 ? (
                    examen.examenes.map((detalle, index) => (
                      <li key={index} style={{ borderBottom: '1px solid black', padding: '5px 0' }}>{detalle}</li>
                    ))
                  ) : examen.opcionSeleccionada && examen.opcionSeleccionada.length > 0 ? (
                    examen.opcionSeleccionada.map((opcion, index) => (
                      <li key={index} style={{ borderBottom: '1px solid black', padding: '5px 0' }}>{opcion}</li>
                    ))
                  ) : (
                    <li>No hay detalles disponibles.</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamenesValoracionesMedicasTable;
