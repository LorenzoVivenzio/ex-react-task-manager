import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow"; 

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);

    return (
        <section className="container mt-4">
            <h1>Lista Task</h1>
            <table className="table table-light table-hover table-striped">
                <thead>
                    <tr>
                        <th className="table-info">Nome</th>
                        <th className="table-info">Stato</th>
                        <th className="table-info">Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </section>
    );
}
