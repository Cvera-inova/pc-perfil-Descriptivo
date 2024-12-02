// ActividadesService.js

const API_URL = 'http://51.222.110.107:5011/perfil';

export const ActividadesService = {
  // Actualizar solo la sección 'datos' de un perfil existente
  actualizarActividad: async (id, datos) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH', // Usamos PATCH para actualizaciones parciales
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar la sección 'datos' del perfil con ID ${id}`);
    }
    return await response.json();
  },

  // Obtener actividad por ID
  obtenerActividadPorId: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el perfil con ID ${id}`);
    }
    return await response.json();
  },

  // Actualizar un perfil existente
  actualizarActividadCompleta: async (id, perfilActualizado) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // Usamos PUT para reemplazar el recurso completo
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
      body: JSON.stringify(perfilActualizado),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar el perfil con ID ${id}`);
    }
    return await response.json();
  },

  // Eliminar una actividad
  eliminarActividad: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
      },
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la actividad con ID ${id}`);
    }
    return await response.json();
  },
};
