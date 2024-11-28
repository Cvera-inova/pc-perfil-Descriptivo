import React, { useEffect, useState } from 'react';
import { obtenerTodosDatos } from '@src/services/datosCargo.Dao';
import styled from 'styled-components';

const AdminPanel = () => {
  const [datosCargos, setDatosCargos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Obteniendo datos de perfiles de cargo...');
        const data = await obtenerTodosDatos();
        console.log('Datos obtenidos:', data);

        const datos = data[0];
        const perfiles = datos.map((dato) => {
          const infoCargo = dato.datos_e_identificacion_del_cargo && dato.datos_e_identificacion_del_cargo[0];
          return {
            id: dato._id,
            nombreDelCargo: infoCargo ? infoCargo.nombre_del_cargo : 'No disponible',
            departamento: infoCargo ? infoCargo.departamento : 'No disponible',
            misionDelCargo: infoCargo ? infoCargo.mision_del_cargo : 'No disponible',
          };
        });

        setDatosCargos(perfiles);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el perfil con ID: ${id}?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://51.222.110.107:5011/perfil/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '7zXnBjF5PBl7EzG/WhATQw==' 
          },
        });
  
        if (response.ok) {
          setDatosCargos((prevDatos) => prevDatos.filter((perfil) => perfil.id !== id));
          alert('Perfil eliminado con éxito');
        } else {
          alert('Error al eliminar el perfil');
        }
      } catch (error) {
        console.error('Error al realizar la eliminación:', error);
        alert('Hubo un problema al eliminar el perfil');
      }
    }
  };

  // Función para redirigir al perfil con ID
  const handleGoToProfile = (id) => {
    window.location.href = `/servicios/atencion-colaborador/admin/admin-tabla/${id}`; // Redirige a la página del perfil
  };

  if (datosCargos.length === 0) {
    return <div>Cargando perfiles...</div>;
  }

  return (
    <AdminContainer>
      <Title>Administración de Perfiles de Cargo</Title>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Cargo</th>
            <th>Departamento</th>
            <th>Misión del Cargo</th>
            <th>Acciones</th>
            <th>Ver Perfil</th>
          </tr>
        </thead>
        <tbody>
          {datosCargos.map((perfil, index) => (
            <tr key={index}>
              <td>{perfil.id}</td>
              <td>{perfil.nombreDelCargo}</td>
              <td>{perfil.departamento}</td>
              <td>{perfil.misionDelCargo}</td>
              <td>
                <DeleteButton onClick={() => handleDelete(perfil.id)}>Eliminar</DeleteButton>
              </td>
              <td>
                <ViewButton onClick={() => handleGoToProfile(perfil.id)}>Ver Perfil</ViewButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default AdminPanel;

// Styled-components para el diseño
const AdminContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #21498E;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 90%;
  max-width: 1200px;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #21498E;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: #ff4c4c;
  color: white;

  &:hover {
    background-color: #e03e3e;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ViewButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;
