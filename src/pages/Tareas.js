import React, { useState, useEffect } from 'react';
import TareasList from '../components/TareasList';
import TareaForm from '../components/TareaForm';
import tareaService from '../services/tareaService';

const TareasView = () => {
    const [tareas, setTareas] = useState([]);

    const handleAddTarea = (newTarea) => {
        setTareas((prevTareas) => [newTarea, ...prevTareas]);
    };

    const handleDeleteTarea = (id) => {
        setTareas((prevTareas) => prevTareas.filter(tarea => tarea.id !== id));
    };

    const handleSaveTarea = (updatedTarea) => {
        setTareas((prevTareas) => 
            prevTareas.map(tarea => (tarea.id === updatedTarea.id ? updatedTarea : tarea))
        );
    };

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const tareas = await tareaService.getTareas();
                setTareas(tareas);
            } catch (error) {
                console.error('Error obteniendo tareas:', error);
            }
        };

        fetchTareas();
    }, []);

    return (
        <div>
            <TareaForm onTareaAdded={handleAddTarea} />
            <TareasList 
                tareas={tareas} 
                onTareaDeleted={handleDeleteTarea} 
                onTareaUpdated={handleSaveTarea}
            />
        </div>
    );
};

export default TareasView;