import React, { useEffect, useState } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';

const UnifiedTable = ({id_generado}) => {
  const [perfilDuro, setPerfilDuro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el perfil duro por ID
  const obtenerPerfilDuroPorId = async ({id}) => {
    try {
      const response = await fetch(`http://51.222.110.107:5011/perfil/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener el perfil con ID ${id}`);
      }
      const data = await response.json();
      console.log('Datos obtenidos:', data); // Para verificar la estructura
      return data;
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
        if (data && data.perfiles_detalle && data.perfiles_detalle.length > 0) {
          setPerfilDuro(data.perfiles_detalle[0]);
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!perfilDuro) return <div>No se encontró el perfil detallado.</div>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Sección de Perfil Duro */}
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#21498E', margin: 0, padding: '10px' }}>Perfil Duro</h2>
      </div>
      {perfilDuro?.perfilDuro?.formaciones && perfilDuro.perfilDuro.formaciones.length > 0 ? (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Formación</th>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Área de Especialidad</th>
                <th style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {perfilDuro.perfilDuro.formaciones.map((formacion, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{formacion.formacion}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{formacion.especialidad}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{formacion.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay formaciones disponibles.</div>
      )}

      {/* Sección de Otros Requerimientos */}
      <div style={{ backgroundColor: '#EEE', width: '80%', textAlign: 'center', borderRadius: '8px', marginBottom: '10px' }}>
        <h2 style={{ color: '#21498E', margin: 0, padding: '10px' }}>Otros requerimientos del cargo</h2>
        <EditProfileButton editRoute="/ruta/para/CompleteTable" />
      </div>
      {perfilDuro?.otrosRequerimientos && perfilDuro.otrosRequerimientos.length > 0 ? (
        <div style={{ width: '80%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <tbody>
              {perfilDuro.otrosRequerimientos.map((req, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black', width: '30%' }}>
                    {req.requerimiento}:
                  </td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{req.respuesta || 'No especificado'}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{req.detalles || 'No especificado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay otros requerimientos disponibles.</div>
      )}

      {/* Sección de Condiciones del Cargo */}
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ color: '#21498E', margin: 0, padding: '10px' }}>Condiciones del cargo</h2>
      </div>
      {perfilDuro?.condicionesCargo && perfilDuro.condicionesCargo.length > 0 ? (
        <div style={{ width: '80%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {perfilDuro.condicionesCargo.map((cond, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>{cond.condicion}</td>
                  <td style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>{cond.detalle || 'No especificado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay condiciones del cargo disponibles.</div>
      )}
    </div>
  );
};

export default UnifiedTable;