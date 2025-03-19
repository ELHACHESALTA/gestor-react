import React, { useState, useEffect } from 'react';
import tareaService from '../services/tareaService';
import TareaEdit from './TareaEdit';

const TareasList = ({ tareas, onTareaDeleted, onTareaUpdated }) => {
    const [editingTarea, setEditingTarea] = useState(null);

    const handleDelete = async (id) => {
        try {
            await tareaService.deleteTarea(id);
            onTareaDeleted(id);
        } catch (error) {
            console.error('Error borrando tarea:', error);
        }
    };

    const handleEdit = (tarea) => {
        setEditingTarea(tarea);
    };

    const handleCancelEdit = () => {
        setEditingTarea(null);
    };

    const handleSaveEdit = (updatedTarea) => {
        onTareaUpdated(updatedTarea);
        setEditingTarea(null);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-8">Tareas</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tareas.map(tarea => (
                    <div key={tarea.id} className="bg-white shadow-lg rounded-lg p-6">
                        {editingTarea && editingTarea.id === tarea.id ? (
                            <TareaEdit
                                tarea={tarea}
                                onCancel={handleCancelEdit}
                                onSave={handleSaveEdit}
                            />
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold">{tarea.titulo}</h3>
                                <p className="text-gray-600">{tarea.descripcion}</p>

                                <div className="mt-4">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold mr-2 bg-blue-200 text-blue-800 rounded-full">
                                        {tarea.estado}
                                    </span>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-200 text-yellow-800 rounded-full">
                                        {tarea.prioridad}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <strong>Usuarios:</strong>
                                    <p>
                                        {tarea.users && tarea.users.length > 0 ? (
                                            tarea.users.map(user => (
                                                <span key={user.id} className="text-blue-600 mr-2">{user.name}</span>
                                            ))
                                        ) : (
                                            <span>No hay usuarios asociados</span>
                                        )}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => handleDelete(tarea.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleEdit(tarea)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TareasList;
