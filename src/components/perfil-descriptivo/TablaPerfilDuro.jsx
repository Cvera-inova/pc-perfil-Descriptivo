import React, { useEffect, useState } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';
import { fetchVersionById } from '@src/services/examenesyValoracionesMedicas.dao';

const UnifiedTable = ({id_generado}) => {
  const [perfilDuro, setPerfilDuro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transformedFormacion, setTransformedFormacion]=useState([])

  // Función para obtener el perfil duro por ID
  const obtenerPerfilDuroPorId = async ({id}) => {
    try {
      const result = await fetchVersionById(id_generado); // Consumir el servicio con ID 1
      console.log('Datos obtenidos perfil:', result.perfiles_detalle[0].perfilDuro); // Para verificar la estructura
      return result.perfiles_detalle[0].perfilDuro;
    } catch (error) {
      console.error('Error en obtenerPerfilDuroPorId:', error);
      throw error;
    }
  };

  // Efecto para cargar el perfil duro al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = id_generado; // Cambia esto por el ID que necesites
        const data = await obtenerPerfilDuroPorId(id);
        if (data) {
          setPerfilDuro(data);
          console.log('Perfil duro final: ',data)
        } else {
          setError('No se encontró el perfil detallado.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  
  }, []);

  useEffect(() => {
    if (perfilDuro){
      setTransformedFormacion(transformFormacion(perfilDuro.formacion));
    }
  }, [perfilDuro]);


  const transformFormacion = (formacionArray) => {
    return formacionArray?.map((section) => {
      if (Array.isArray(section)) {
        return section.map((item) => {
          const keys = Object.keys(item);
          const formacionKey = keys.find((key) => !key.includes('tiempo'));
          const tiempoKey = keys.find((key) => key.includes('tiempo'));
  
          return {
            formacion: formacionKey,
            especialidad: item[formacionKey],
            tiempo: item[tiempoKey],
          };
        });
      } else {
        const keys = Object.keys(section);
        const formacionKey = keys.find((key) => !key.includes('tiempo'));
        const tiempoKey = keys.find((key) => key.includes('tiempo'));
  
        return {
          formacion: formacionKey,
          especialidad: section[formacionKey],
          tiempo: section[tiempoKey],
        };
      }
    }).flat();
  };
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!perfilDuro) return <div>No se encontró el perfil detallado.</div>;

  return (
    <div style={{ padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Sección de Perfil Duro */}
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '0px' }}>
      </div>
      {perfilDuro?.formacion && perfilDuro?.formacion?.length > 0 ? (
        <div style={{ width: '80%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0px' }}>
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
                    Perfil Duro
                  </span>
                  {/* Botón */}
                  <EditProfileButton editRoute="/ruta/para/CompleteTable" />
                </div>
              </th>
            </tr>
              <tr>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Formación</th>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Área de Especialidad</th>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {transformedFormacion.map((item, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{item.formacion}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{item.especialidad}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{item.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay formaciones disponibles.</div>
      )}

      {/* Sección de Otros Requerimientos */}
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '0px' }}>
      </div>
      {perfilDuro ? (
      <div style={{ width: '80%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0px' }}>
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
                    Otros Requerimientos del cargo
                  </span>
                  {/* Botón */}
                  <EditProfileButton editRoute="/ruta/para/CompleteTable" />
                </div>
              </th>
            </tr>
            {/* Disponibilidad de viajar */}
            <tr>
              <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                Disponibilidad para viajar:
              </td>
              <td
                style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}
                colSpan={perfilDuro.disponibilidadViajar === 'No' ? 2 : 1} // Span two columns if no travel
              >
                {perfilDuro.disponibilidadViajar || 'No especificado'}
              </td>
              {perfilDuro.disponibilidadViajar !== 'No' && (
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                  Lugares para viajar: {perfilDuro.lugaresViajar || 'No especificado'}
                </td>
              )}
            </tr>

              {/* Conocimientos */}
              {perfilDuro.conocimientos && perfilDuro.conocimientos.length > 0 && (
                perfilDuro.conocimientos.map((conocimiento, index) => (
                  <tr key={index}>
                    <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
                      Conocimiento:
                    </td>
                    <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                      {conocimiento.conocimiento || 'No especificado'}
                    </td>
                    <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
                      Descripción: {conocimiento.descripcionConocimiento || 'No especificado'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay información disponible.</div>
      )}

     
      {perfilDuro ? (
        <div style={{ width: '80%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                    Condiciones Del Cargo
                  </span>
                  {/* Botón */}
                  <EditProfileButton editRoute="/ruta/para/CompleteTable" />
                </div>
              </th>
            </tr>
              {/* Exigencias */}
              <tr>
                <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                  Exigencias:
                </td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '70%' }}>
                  {perfilDuro.exigencias || 'No especificado'}
                </td>
              </tr>
              {/* Herramientas */}
              <tr>
                <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                  Herramientas:
                </td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '70%' }}>
                  {perfilDuro.herramientas || 'No especificado'}
                </td>
              </tr>
              {/* Horarios */}
              <tr>
                <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                  Horario de Almuerzo:
                </td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '70%' }}>
                  {perfilDuro.horarioAlmuerzo || 'No especificado'}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                  Horario de Entrada:
                </td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '70%' }}>
                  {perfilDuro.horarioEntrada || 'No especificado'}
                </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                  Horario de Salida:
                </td>
                <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '70%' }}>
                  {perfilDuro.horarioSalida || 'No especificado'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay información disponible.</div>
      )}
    </div>
  );
};

export default UnifiedTable;