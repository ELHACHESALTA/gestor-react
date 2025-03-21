import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/register`, { name, email, password });
            navigate("/tareas");
        } catch (err) {
            setError("Error al registrarse");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegister}>
                <input type="text" placeholder="Nombre" className="border p-2 mb-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Correo" className="border p-2 mb-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" className="border p-2 mb-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;