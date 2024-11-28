const BASE_URL = 'http://51.222.110.107:5011/perfil';

// Obtener todas las competencias requeridas
export const fetchCompetenciasRequeridas = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener competencias requeridas:', error);
    return [];
  }
};

// Obtener un perfil por ID
export const obtenerPerfilPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el perfil');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el perfil por ID:', error);
    return null;
  }
};

// Obtener competencias requeridas por ID
export const fetchCompetenciaRequeridaById = async (id) => {
  try {
    const perfil = await obtenerPerfilPorId(id);
    if (perfil && perfil.competencias_requeridas && perfil.competencias_requeridas.length > 0) {
      return perfil.competencias_requeridas[0].competencias;
    }
    return [];
  } catch (error) {
    console.error('Error al obtener competencias por ID:', error);
    return [];
  }
};

// Crear nueva competencia requerida
export const createCompetenciaRequerida = async (nuevaCompetencia) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(nuevaCompetencia),
    });
    if (!response.ok) {
      throw new Error('Error al crear la competencia requerida');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la competencia requerida:', error);
    return null;
  }
};

// Actualizar un perfil existente
export const actualizarPerfil = async (id, perfilActualizado) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT', // Usamos PUT para reemplazar el recurso completo
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(perfilActualizado),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return null;
  }
};

// Eliminar competencia requerida
export const deleteCompetenciaRequerida = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la competencia requerida');
    }
    return true; // Retornar true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error al eliminar la competencia requerida:', error);
    return false; // Retornar false si hubo un error
  }
};
