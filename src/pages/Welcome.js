import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg">Gestiona tus tareas de forma eficiente</p>
            <div className="mt-6">
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4">Iniciar Sesión</Link>
                <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-lg">Registrarse</Link>
                <Link to="/tareas" className="px-4 py-2 bg-red-500 text-white rounded-lg ml-4">Vista de Tareas</Link>
            </div>
        </div>
    );
};

export default Welcome;