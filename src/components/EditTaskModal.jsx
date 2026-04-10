import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
    // Stati locali per gestire il form (inizializzati con i dati della task)
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [status, setStatus] = useState(task?.status || "To do");
    
    const formRef = useRef();

    // Aggiorna i campi se la task cambia 
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Passiamo al componente padre l'oggetto aggiornato
        onSave({ ...task, title, description, status });
    };

    const formContent = (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Titolo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Descrizione</label>
                <textarea 
                    className="form-control" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Stato</label>
                <select 
                    className="form-select" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </form>
    );

    return (
        <Modal 
            show={show}
            title="Modifica Task"
            content={formContent}
            confirmText="Salva"
            onClose={onClose}
            onConfirm={() => formRef.current.requestSubmit()} // Fa scattare l'handleSubmit del form
        />
    );
}
