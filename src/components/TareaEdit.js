import React, { useState, useEffect } from 'react';
import tareaService from '../services/tareaService';

const TareaEdit = ({ tarea, onCancel, onSave }) => {
    const [titulo, setTitulo] = useState(tarea.titulo);
    const [descripcion, setDescripcion] = useState(tarea.descripcion);
    const [estado, setEstado] = useState(tarea.estado);
    const [prioridad, setPrioridad] = useState(tarea.prioridad);

    useEffect(() => {
        setTitulo(tarea.titulo);
        setDescripcion(tarea.descripcion);
        setEstado(tarea.estado);
        setPrioridad(tarea.prioridad);
    }, [tarea]);

    const handleSave = async () => {
        const updatedTarea = {
            id: tarea.id,
            titulo,
            descripcion,
            estado,
            prioridad,
        };

        try {
            await tareaService.updateTarea(tarea.id, updatedTarea);
            onSave(updatedTarea);
        } catch (error) {
            console.error('Error actualizando tarea:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Editar Tarea</h2>
            <div>
                <label className="block">Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
            </div>
            <div>
                <label className="block">Descripción</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
            </div>
            <div>
                <label className="block">Prioridad</label>
                <select
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </div>
            <div>
                <label className="block">Estado</label>
                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="terminada">Terminada</option>
                </select>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Guardar
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default TareaEdit;
