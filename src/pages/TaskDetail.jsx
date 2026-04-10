import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal"; 

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask, updateTask } = useGlobalContext();
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Stato per modifica

    const task = tasks.find((t) => t.id == id);

    if (!task) return <div className="container mt-5">Task non trovata.</div>;

    const handleSave = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo!");
            setIsEditModalOpen(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1>{task.title}</h1>
                <p className="text-muted">{task.description}</p>
                <p><strong>Stato:</strong> {task.status}</p>
                
                <div className="mt-4">
                    <button className="btn btn-primary me-2" onClick={() => setIsEditModalOpen(true)}>
                        Modifica Task
                    </button>
                    <button className="btn btn-danger" onClick={() => setIsDeleteModalOpen(true)}>
                        Elimina Task
                    </button>
                </div>
            </div>

            {/* Modale Eliminazione */}
            <Modal 
                show={isDeleteModalOpen}
                title="Conferma eliminazione"
                content="Vuoi davvero eliminare questa task?"
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={async () => {
                    await removeTask(task.id);
                    navigate("/");
                }}
            />

            {/* Modale Modifica */}
            <EditTaskModal 
                show={isEditModalOpen}
                task={task}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
