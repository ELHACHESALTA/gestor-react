import axios from "axios";

const API_URL = "http://localhost:8000/api";

const authService = {
    register: async (userData) => {
        return await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
    },

    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    logout: async () => {
        const token = localStorage.getItem("token");
        return await axios.post(
            `${API_URL}/logout`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
        ).then(() => {
            localStorage.removeItem("token");
        });
    },

    getAuthToken: () => localStorage.getItem("token"),
};

export default authService;