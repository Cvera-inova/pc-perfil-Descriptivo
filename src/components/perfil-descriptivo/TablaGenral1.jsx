import { obtenerDatoPorId } from '@src/services/datosCargo.Dao';
import React, { useEffect, useState } from 'react';
import EditProfileButton from '../buttons/edit-profile-button';

const LargeTable = ({id_generado}) => {
  const [datoCargo, setDatoCargo] = useState(null); // Estado para almacenar los datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatoPorId(id_generado); // Reemplaza "2" por el ID que necesites
        setDatoCargo(data); // Almacena los datos en el estado
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); // Llama a la función para obtener datos
  }, []); // Se ejecuta solo una vez al montar el componente

  // Verifica si los datos están disponibles
  if (!datoCargo) {
    return <div>Cargando...</div>;
  }

  // Verifica que 'datos_e_identificacion_del_cargo' exista y tenga al menos un elemento
  if (!datoCargo.datos_e_identificacion_del_cargo || datoCargo.datos_e_identificacion_del_cargo.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  // Accede al primer elemento de 'datos_e_identificacion_del_cargo'
  const datosCargo = datoCargo.datos_e_identificacion_del_cargo[0];

  return (
    <div style={{ padding: '0px', display: 'flex', justifyContent: 'center' }}>
      <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
        <tr>
          <th
            colSpan="2"
            style={{
              backgroundColor: '#EEE',
              padding: '10px',
              color: '#21498E',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Texto centrado */}
              <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                Datos de Identificación del Cargo
              </span>
              {/* Botón */}
              <EditProfileButton editRoute={`/servicios/atencion-colaborador/perfil-cargo/${id_generado}`} />
            </div>
          </th>
        </tr>
          <tr>
            <th colSpan="2" style={{ backgroundColor: '#21498E', padding: '10px', color: 'white', textAlign: 'center' }}>
              Misión del Cargo
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" style={{ backgroundColor: 'white', padding: '10px', textAlign: 'left' }}>
              {datosCargo.mision_del_cargo}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Nombre del Cargo:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.nombre_del_cargo}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Departamento:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.departamento}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Reporta a:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.reporta_a}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Supervisa a:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.supervisa_a}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Ciudad:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.ciudad}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Dirección:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.direccion}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: '#21498E', color: 'white', padding: '10px', border: '1px solid black' }}>
              Teletrabajo:
            </td>
            <td style={{ backgroundColor: 'white', color: 'black', padding: '10px', border: '1px solid black' }}>
              {datosCargo.teletrabajo}
            </td>
          </tr>
          {/* Puedes agregar más campos aquí si los hay */}
          <tr>
          <th
            colSpan="2"
            style={{
              backgroundColor: '#EEE',
              padding: '10px',
              color: '#21498E',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Texto centrado */}
              <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                Actividades
              </span>
              {/* Botón */}
              <EditProfileButton editRoute={`/servicios/atencion-colaborador/actividades/${id_generado}`} />
            </div>
          </th>
        </tr>
          {/* Aquí puedes agregar la sección de actividades si es necesario */}
        </tbody>
      </table>
    </div>
  );
};

export default LargeTable;