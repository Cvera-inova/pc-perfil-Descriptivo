const BASE_URL = 'http://51.222.110.107:5011/perfil/next-id'

const headers = {
    'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
  };

  export async function obtenerSiguienteIdPerfil () {
    try {
      const response = await fetch(`${BASE_URL}`, { headers });
      if (!response.ok) {
        throw new Error('Error al obtener el siguiente id de perfil');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el siguiente id de perfil:', error);
      return null;
    }
  };