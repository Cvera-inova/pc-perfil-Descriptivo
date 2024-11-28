// src/services/examenesyValoracionesMedicas.js

const BASE_URL = 'http://51.222.110.107:5011/perfil';

/**
 * Obtener todos los perfiles con sus versiones de exámenes.
 * @returns {Promise<Array>} - Retorna un array con todos los perfiles y sus versiones.
 */
export const fetchVersiones = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener versiones:', error);
    return [];
  }
};

/**
 * Obtener un perfil específico por su ID.
 * @param {string} id - ID del perfil.
 * @returns {Promise<Object|null>} - Retorna el perfil o null si no se encuentra.
 */
export const fetchVersionById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener la versión');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la versión por ID:', error);
    return null;
  }
};

/**
 * Crear una nueva versión de exámenes para un perfil específico.
 * @param {string} perfilId - ID del perfil al que se añadirá la nueva versión.
 * @param {Object} nuevaVersion - Objeto que contiene la nueva versión de exámenes.
 * @returns {Promise<Object|null>} - Retorna el perfil actualizado o null si hubo un error.
 */
export const addVersionToPerfil = async (perfilId, nuevaVersion) => {
  try {
    // 1. Obtener el perfil existente.
    const perfilResponse = await fetch(`${BASE_URL}/${perfilId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!perfilResponse.ok) {
      throw new Error('Error al obtener el perfil.');
    }
    const perfil = await perfilResponse.json();

    // 2. Verificar si existe la sección `versiones`.
    if (!perfil.versiones || !Array.isArray(perfil.versiones)) {
      perfil.versiones = [];
    }

    // 3. Añadir la nueva versión al arreglo `versiones`.
    perfil.versiones.push(nuevaVersion);

    // 4. Enviar la actualización al servidor.
    const updateResponse = await fetch(`${BASE_URL}/${perfilId}`, {
      method: 'PUT', // Asegúrate de que tu backend soporte PUT para actualizaciones completas.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(perfil), // Enviamos el perfil completo con la sección actualizada.
    });

    if (!updateResponse.ok) {
      throw new Error('Error al actualizar el perfil con la nueva versión.');
    }

    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error('Error al agregar la versión al perfil:', error);
    return null;
  }
};

/**
 * Crear una nueva versión de examen (Función Original).
 * @param {Object} nuevaVersion - Objeto que contiene los datos de la nueva versión.
 * @returns {Promise<Object|null>} - Retorna el perfil actualizado o null si hubo un error.
 */
export const createVersion = async (nuevaVersion) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(nuevaVersion),
    });
    if (!response.ok) {
      throw new Error('Error al crear la versión');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la versión:', error);
    return null;
  }
};

/**
 * Actualizar una versión de examen existente.
 * @param {string} id - ID del perfil a actualizar.
 * @param {Object} versionActualizada - Objeto con los datos actualizados de la versión.
 * @returns {Promise<Object|null>} - Retorna el perfil actualizado o null si hubo un error.
 */
export const updateVersion = async (id, versionActualizada) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(versionActualizada),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la versión');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar la versión:', error);
    return null;
  }
};

/**
 * Eliminar una versión de examen por ID de perfil.
 * @param {string} id - ID del perfil a eliminar.
 * @returns {Promise<boolean>} - Retorna true si la eliminación fue exitosa, false en caso contrario.
 */
export const deleteVersion = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la versión');
    }
    return true; // Retornar true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error al eliminar la versión:', error);
    return false; // Retornar false si hubo un error
  }
};

/**
 * Obtener el último ID utilizado (si tu backend lo soporta).
 * @returns {Promise<string|null>} - Retorna el último ID o null si hubo un error.
 */
export const obtenerUltimoId = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ultimoid`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener el último ID del riesgo.');
    }
    const data = await response.json();
    return data.ultimoId; // Asegúrate de que este campo existe en tu respuesta
  } catch (error) {
    console.error('Error al obtener el último ID del riesgo:', error);
    return null;
  }
};
