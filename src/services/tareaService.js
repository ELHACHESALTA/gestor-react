import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const tareaService = {
    async getCSRFToken() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });
            return response;
        } catch (error) {
            console.error('Error obteniendo CSRF token:', error);
        }
    },

    async getTareas() {
        try {
            await tareaService.getCSRFToken();
            const response = await axios.get(`${API_URL}/tareas`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            throw error;
        }
    },

    async createTarea(tareaData) {
        try {
            await tareaService.getCSRFToken();
            const response = await axios.post(`${API_URL}/tareas`, tareaData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            throw error;
        }
    },

    async updateTarea(id, tareaData) {
        try {
            await tareaService.getCSRFToken();
            const response = await axios.put(`${API_URL}/tareas/${id}`, tareaData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la tarea con ID ${id}:`, error);
            throw error;
        }
    },

    async deleteTarea(id) {
        try {
            await tareaService.getCSRFToken();
            await axios.delete(`${API_URL}/tareas/${id}`, { withCredentials: true });
            return { message: 'Tarea eliminada correctamente' };
        } catch (error) {
            console.error(`Error al eliminar la tarea con ID ${id}:`, error);
            throw error;
        }
    },

    async getUsuarios() {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            throw error;
        }
    },
};

export default tareaService;