const BASE_URL = 'http://51.222.110.107:5011/perfil/2';

// Obtener condiciones del cargo
export const fetchCargo = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    const data = await response.json();
    console.log(data); // Para verificar que data esté en el formato correcto

    const herramientas = data.herramientas?.map(item => item.nombre).join(', ') || 'No disponible';
    const exigencias = data.exigencias_funcionales?.join(', ') || 'No disponible';
    const horario = data.horario_trabajo || 'No disponible';

    return { herramientas, exigencias, horario };
  } catch (error) {
    console.error('Error al obtener el cargo:', error);
    return null;
  }
};

// Crear nuevo cargo
export const createCargo = async (nuevoCargo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(nuevoCargo),
    });

    if (!response.ok) {
      throw new Error('Error al crear el cargo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear el cargo:', error);
    return null;
  }
};

// Actualizar cargo existente
export const updateCargo = async (id, updatedCargo) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(updatedCargo),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el cargo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el cargo:', error);
    return null;
  }
};

// Eliminar un cargo
export const deleteCargo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el cargo');
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar el cargo:', error);
    return false;
  }
};
