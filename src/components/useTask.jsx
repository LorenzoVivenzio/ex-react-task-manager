import { useState, useEffect } from "react";

export function useTask() {
    const [tasks, setTasks] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    //chiamo il database per farmi dare i dati
    useEffect(() => {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error("Errore caricamento:", err));
    }, [url]);


    //AGGIUNGERE TASK
    //chiamata API per inviare i dati tramite POST
    const addTask = async (taskData) => {
        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();

        if (data.success) {

            setTasks((prevTasks) => [...prevTasks, data.task]);
        } else {
            throw new Error(data.message || "Errore durante il salvataggio");
        }
    };


    //RIMUOVERE UNA TASK
    const removeTask = async (taskId) => {

        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {

            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        } else {

            throw new Error(data.message || "Impossibile eliminare la task");
        }
    };


    //MODIFICARE UNA TASK
    const updateTask = async (updatedTask) => {
        const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });

        const data = await response.json();

        if (data.success) {
            // Aggiorniamo lo stato: cerchiamo la task vecchia e la sostituiamo con quella nuova
            setTasks((prevTasks) =>
                prevTasks.map(t => t.id === updatedTask.id ? data.task : t)
            );
        } else {
            throw new Error(data.message || "Errore durante la modifica");
        }
    };


    return { tasks, addTask, removeTask, updateTask };
}
