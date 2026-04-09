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


    //chiamata API per inviare i dati tramite POST
    const addTask = async (taskData) => {
        const response = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
        });

        const data = await response.json();

        if (data.success) {
            // Aggiorniamo lo stato aggiungendo la nuova task alla lista 
            setTasks((prevTasks) => [...prevTasks, data.task]);
        } else {
            throw new Error(data.message || "Errore durante il salvataggio");
        }
    };

    const removeTask = () => {};
    const updateTask = () => {};

    return { tasks, addTask, removeTask, updateTask };
}
