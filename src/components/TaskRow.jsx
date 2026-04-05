import React from "react";

// React.memo evita che la riga venga ricaricata se i dati del task non cambiano
const TaskRow = React.memo(({ task }) => {
    
    // Usiamo una variabile per salvare la classe di Bootstrap
    let coloreClasse = "";

    if (task.status === "To do") {
        coloreClasse = "table-danger"; // Rosso
    } else if (task.status === "Doing") {
        coloreClasse = "table-warning"; // Giallo
    } else if (task.status === "Done") {
        coloreClasse = "table-success"; // Verde
    }

    return (
        <tr>
            <td>{task.title}</td>
            <td className={coloreClasse}>
                {task.status}
            </td>
            <td>{new Date(task.createdAt).toLocaleString()}</td>
        </tr>
    );
});

export default TaskRow;
