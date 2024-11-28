const API_URL = 'http://51.222.110.107:5011/perfil'; // Cambia esto a tu URL de API

// Definimos los encabezados comunes, incluyendo la autorización
const headers = {
  'Content-Type': 'application/json',
  'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
};

export const PerfilDuroService = {
  /**
   * Obtener todos los perfiles duros.
   * @returns {Promise<Array>} - Retorna una lista de perfiles duros.
   */
  obtenerPerfilesDuros: async () => {
    try {
      const response = await fetch(API_URL, { headers });
      if (!response.ok) {
        throw new Error('Error al obtener los perfiles duros');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPerfilesDuros:', error);
      throw error; // Lanza el error para manejarlo en el componente que llama a esta función
    }
  },

  /**
   * Obtener un perfil duro específico por ID.
   * @param {string} id - ID del perfil.
   * @returns {Promise<Object>} - Retorna el perfil duro con el ID proporcionado.
   */
  obtenerPerfilDuroPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { headers });
      if (!response.ok) {
        throw new Error(`Error al obtener el perfil duro con ID ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPerfilDuroPorId:', error);
      throw error;
    }
  },

  /**
   * Crear un nuevo perfil duro.
   * @param {Object} perfilDuro - Datos del perfil duro a crear.
   * @returns {Promise<Object>} - Retorna el perfil duro creado.
   */
  crearPerfilDuro: async (perfilDuro) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(perfilDuro),
      });
      if (!response.ok) {
        throw new Error('Error al crear el perfil duro');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearPerfilDuro:', error);
      throw error;
    }
  },

  /**
   * Actualizar un perfil duro existente por ID.
   * @param {string} id - ID del perfil a actualizar.
   * @param {Object} perfilDuro - Datos del perfil duro a actualizar.
   * @returns {Promise<Object>} - Retorna el perfil duro actualizado.
   */
  actualizarPerfilDuro: async (id, perfilDuro) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(perfilDuro),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el perfil duro con ID ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en actualizarPerfilDuro:', error);
      throw error;
    }
  },

  /**
   * Eliminar un perfil duro por ID.
   * @param {string} id - ID del perfil a eliminar.
   * @returns {Promise<Object>} - Retorna el objeto de la respuesta, puede incluir información sobre la eliminación.
   */
  eliminarPerfilDuro: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers, // Incluimos los encabezados con la autorización
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el perfil duro con ID ${id}`);
      }
      return await response.json(); // Retorna la respuesta del servidor, que puede indicar el éxito de la operación
    } catch (error) {
      console.error('Error en eliminarPerfilDuro:', error);
      throw error;
    }
  },
};
