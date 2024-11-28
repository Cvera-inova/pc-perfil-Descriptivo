const BASE_URL = 'http://51.222.110.107:5011/perfil'; // Asegúrate de que esta URL sea correcta

// Definimos los encabezados comunes, incluyendo la autorización
const headers = {
  'Content-Type': 'application/json',
  'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
};

/**
 * Obtener un perfil específico por su ID.
 * @param {string} id - ID del perfil.
 * @returns {Promise<Object|null>} - Retorna el perfil o null si no se encuentra.
 */
export const obtenerPerfilPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { headers });
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

/**
 * Actualizar un perfil específico.
 * @param {string} id - ID del perfil a actualizar.
 * @param {Object} perfilActualizado - Objeto con los datos actualizados del perfil.
 * @returns {Promise<Object|null>} - Retorna el perfil actualizado o null si hubo un error.
 */
export const actualizarPerfil = async (id, perfilActualizado) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(perfilActualizado),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar el perfil');
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return null;
  }
};
