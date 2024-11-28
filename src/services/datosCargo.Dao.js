// src/services/apiService.js

const BASE_URL = 'http://51.222.110.107:5011/perfil';

// Crear un nuevo dato
export async function enviarDatosIdentificacionCargo(data) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en enviarDatosIdentificacionCargo:', error);
        throw error;
    }
}

// Obtener todos los datos
export async function obtenerDatosIdentificacionCargo() {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en obtenerDatosIdentificacionCargo:', error);
        throw error;
    }
}
// Obtener todos los datos
export async function obtenerTodosDatos() {
    try {
        const response = await fetch(`${BASE_URL}`, { // Asegúrate de que este endpoint devuelva todos los datos
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener todos los datos');
        }

        return await response.json(); // Retorna todos los datos
    } catch (error) {
        console.error('Error en obtenerTodosDatos:', error);
        throw error;
    }
}


// Obtener un dato por ID
export async function obtenerDatoPorId(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el dato por ID');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en obtenerDatoPorId:', error);
        throw error;
    }
}
export async function obtenerPerfiles() {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los perfiles');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en obtenerPerfiles:', error);
        throw error;
    }
}

// Actualizar un dato existente
export async function actualizarDatosIdentificacionCargo(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar los datos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en actualizarDatosIdentificacionCargo:', error);
        throw error;
    }
}

// Eliminar un dato existente
export async function eliminarDatosIdentificacionCargo(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar los datos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en eliminarDatosIdentificacionCargo:', error);
        throw error;
    }
}
