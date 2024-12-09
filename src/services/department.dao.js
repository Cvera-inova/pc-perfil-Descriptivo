const BASE_URL = 'http://51.222.110.107:5000/departments';

// Crear un nuevo dato
export async function getListaDepartamentos(session) {
    try {
        const token = session?.user?.data?.token
        const response = await fetch(`${BASE_URL}/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
                'Token':token,
            },
        });

        if (!response.ok) {
            throw new Error('Error al recibir los departamentos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getListaDepartamentos:', error);
        throw error;
    }
}

export async function getDepartamentoById(id_departamento_r, session) {
    try {
        const token = session?.user?.data?.token
        const id_departamento=JSON.stringify({id:id_departamento_r})
        const response = await fetch(`${BASE_URL}/read_one`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7zXnBjF5PBl7EzG/WhATQw==',
                'Token':token,
            },
            body: id_departamento
        });

        if (!response.ok) {
            throw new Error('Error al recibir el departamento por id');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getDepartamentoById:', error);
        throw error;
    }
}