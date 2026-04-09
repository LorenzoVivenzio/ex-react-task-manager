import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
    //id dall'URL
    const { id } = useParams();

    // lista delle task dal contesto globale
    const { tasks } = useGlobalContext();

    const task = tasks.find((t) => t.id == id);

    if (!task) {
        return <div className="container mt-5"><h3>Task non trovata!</h3></div>;
    }

    const handleDelete = () => {
        console.log("Elimino task", id);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h1 className="display-4">{task.title}</h1>
                    <p className="lead text-muted">{task.description}</p>
                    <hr />
                    <p><strong>Stato:</strong> {task.status}</p>
                    <p><strong>Data creazione:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                    
                    <button 
                        className="btn btn-danger mt-3" 
                        onClick={handleDelete}
                    >
                        Elimina Task
                    </button>
                </div>
            </div>
        </div>
    );
}
