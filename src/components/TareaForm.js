import React, { useState, useEffect } from 'react';
import tareaService from '../services/tareaService';

const TareaForm = ({ onTareaAdded }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuarios, setSelectedUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await tareaService.getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error('Error obteniendo usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedUsuarios((prevSelectedUsuarios) => {
            if (checked) {
                return [...prevSelectedUsuarios, value];
            } else {
                return prevSelectedUsuarios.filter((usuarioId) => usuarioId !== value);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const tareaData = {
            titulo,
            descripcion,
            estado,
            prioridad,
            usuarios: selectedUsuarios,
        };
    
        try {
            const nuevaTarea = await tareaService.createTarea(tareaData);
            onTareaAdded(nuevaTarea);
            alert('Tarea creada con éxito');

            setTitulo('');
            setDescripcion('');
            setEstado('');
            setPrioridad('');
            setSelectedUsuarios([]);
        } catch (error) {
            console.error('Error creando tarea:', error);
            alert('Error creando tarea');
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En Progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                    >
                        <option value="">Seleccione una prioridad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>
                <div>
                    <label>Usuarios Asociados</label>
                    <div className="space-y-2">
                        {usuarios.map((usuario) => (
                            <div key={usuario.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`usuario-${usuario.id}`}
                                    value={usuario.id}
                                    checked={selectedUsuarios.includes(usuario.id.toString())}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label htmlFor={`usuario-${usuario.id}`} className="text-sm">{usuario.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Crear Tarea
                </button>
            </form>
        </div>
    );
};

export default TareaForm;