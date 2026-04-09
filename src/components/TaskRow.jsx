import { Link } from "react-router-dom";
import React from "react";

const TaskRow = ({ task }) => {
    // Gestione colori Milestone 3 (Rimaniamo ordinati)
    const getStatusColor = (status) => {
        if (status === "To do") return "table-danger";
        if (status === "Doing") return "table-warning";
        if (status === "Done") return "table-success";
        return "";
    };

    return (
        <tr>
            <td>
                {/* Milestone 7 */}
                <Link to={`/task/${task.id}`} className="text-decoration-none fw-bold text-dark">
                    {task.title}
                </Link>
            </td>
            <td className={getStatusColor(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
};

export default React.memo(TaskRow);
