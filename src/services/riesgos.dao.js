// src/services/riesgos.dao.js

const BASE_URL = 'http://51.222.110.107:5011/perfil';

// Define headers comunes
const headers = {
  'Content-Type': 'application/json',
  'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
};

/**
 * Obtener todos los riesgos del cargo.
 * @returns {Promise<Array>} - Retorna un array con todos los perfiles y sus riesgos.
 */
export const fetchRiesgosDelCargo = async () => {
  try {
    const response = await fetch(BASE_URL, { headers });
    if (!response.ok) {
      throw new Error('La respuesta de la red no fue correcta.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los riesgos del cargo:', error);
    return [];
  }
};

/**
 * Obtener riesgos del cargo por ID de perfil.
 * @param {string} id - ID del perfil.
 * @returns {Promise<Object|null>} - Retorna el perfil con sus riesgos o null si no se encuentra.
 */
export const fetchRiesgoDelCargoById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { headers });
    if (!response.ok) {
      throw new Error('Error al obtener el riesgo del cargo.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el riesgo del cargo por ID:', error);
    return null;
  }
};

/**
 * Crear un nuevo riesgo del cargo.
 * @param {Object} nuevoRiesgo - Objeto que contiene los datos del nuevo riesgo.
 * @returns {Promise<Object|null>} - Retorna el riesgo creado o null si hubo un error.
 */
export const createRiesgoDelCargo = async (nuevoRiesgo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(nuevoRiesgo),
    });
    if (!response.ok) {
      throw new Error('Error al crear el riesgo del cargo.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear el riesgo del cargo:', error);
    return null;
  }
};

/**
 * Actualizar un riesgo del cargo completo.
 * @param {string} id - ID del perfil a actualizar.
 * @param {Object} riesgoActualizado - Objeto con los datos actualizados del riesgo.
 * @returns {Promise<Object|null>} - Retorna el riesgo actualizado o null si hubo un error.
 */
export const updateRiesgoDelCargo = async (id, riesgoActualizado) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(riesgoActualizado),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el riesgo del cargo.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar el riesgo del cargo:', error);
    return null;
  }
};

/**
 * Eliminar un riesgo del cargo por ID de perfil.
 * @param {string} id - ID del perfil a eliminar.
 * @returns {Promise<boolean>} - Retorna true si la eliminación fue exitosa, false en caso contrario.
 */
export const deleteRiesgoDelCargo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el riesgo del cargo.');
    }
    return true; // Retorna true si la eliminación fue exitosa.
  } catch (error) {
    console.error('Error al eliminar el riesgo del cargo:', error);
    return false; // Retorna false si hubo un error.
  }
};

/**
 * Obtener el último ID de riesgo del cargo (si es necesario).
 * @returns {Promise<string|null>} - Retorna el último ID o null si hubo un error.
 */
export const obtenerUltimoIdRiesgo = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ultimoid`, { headers });
    if (!response.ok) {
      throw new Error('Error al obtener el último ID del riesgo.');
    }
    const data = await response.json();
    return data.ultimoId;
  } catch (error) {
    console.error('Error al obtener el último ID del riesgo:', error);
    return null;
  }
};

/**
 * Actualizar únicamente la sección `riesgosDelCargo` de un perfil específico.
 * @param {string} perfilId - ID del perfil a actualizar.
 * @param {Array<Object>} nuevosFactoresDeRiesgo - Array con los nuevos factores de riesgo.
 * @returns {Promise<Object|null>} - Retorna el perfil actualizado o null si hubo un error.
 */
export const updateRiesgosDelCargo = async (perfilId, nuevosFactoresDeRiesgo) => {
  try {
    // 1. Obtener el perfil existente.
    const perfilResponse = await fetch(`${BASE_URL}/${perfilId}`, { headers });
    if (!perfilResponse.ok) {
      throw new Error('Error al obtener el perfil.');
    }
    const perfil = await perfilResponse.json();

    // 2. Verificar si existe la sección `riesgosDelCargo`.
    if (!perfil.riesgosDelCargo || !Array.isArray(perfil.riesgosDelCargo)) {
      throw new Error('La sección riesgosDelCargo no existe en el perfil.');
    }

    // 3. Encontrar el objeto `riesgosDelCargo` correspondiente al perfil.
   // console.log(perfil.riesgosDelCargo[0].id)
    // const riesgosDelCargoIndex = perfil.riesgosDelCargo[0].findIndex(
    //   (rc) => rc.id === perfilId
    // );
    if (perfil.riesgosDelCargo[0].id === perfilId) {
      throw new Error(
        'Riesgos del cargo no encontrados para el perfil especificado.'
      );
    }
    // if (riesgosDelCargoIndex === -1) {
    //   throw new Error(
    //     'Riesgos del cargo no encontrados para el perfil especificado.'
    //   );
    // }

    // 4. Actualizar los `factoresDeRiesgo` con los nuevos datos.
    perfil.riesgosDelCargo[0].factoresDeRiesgo  =
      nuevosFactoresDeRiesgo;

    // 5. Enviar la actualización al servidor.
    const updateResponse = await fetch(`${BASE_URL}/${perfilId}`, {
      method: 'PUT', // O PATCH, según tu API.
      headers,
      body: JSON.stringify(perfil), // Enviamos el perfil completo con la sección actualizada.
    });

    if (!updateResponse.ok) {
      throw new Error('Error al actualizar los riesgos del cargo.');
    }

    const data = await updateResponse.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar los riesgos del cargo:', error);
    return null;
  }
};
