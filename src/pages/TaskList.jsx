import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    
   
    const [searchTerm, setSearchTerm] = useState("");
    
    const [searchQuery, setSearchQuery] = useState("");

    // 2. Funzione Debounce con useCallback
    const debouncedSearch = useCallback(
        debounce((value) => setSearchQuery(value), 300),
        []
    );

    function debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSort = (colonna) => {
        if (sortBy === colonna) {
            setSortOrder(sortOrder * -1);
        } else {
            setSortBy(colonna);
            setSortOrder(1);
        }
    };

   
    const filteredAndSortedTasks = useMemo(() => {

        let result = tasks.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        
        return result.sort((a, b) => {
            let confronto = 0;
            if (sortBy === "title") {
                confronto = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                const pesi = { "To do": 1, "Doing": 2, "Done": 3 };
                confronto = pesi[a.status] - pesi[b.status];
            } else if (sortBy === "createdAt") {
                confronto = new Date(a.createdAt) - new Date(b.createdAt);
            }
            return confronto * sortOrder;
        });
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <section className="container mt-4">
            <h1 className="mb-4 text-center">I tuoi Task</h1>

            {/* Input di Ricerca */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg shadow-sm"
                    placeholder="Cerca task per nome..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            
            <table className="table table-light table-hover table-striped shadow-sm">
                <thead>
                    <tr style={{ cursor: "pointer" }}>
                        <th className="table-info" onClick={() => handleSort("title")}>Nome</th>
                        <th className="table-info" onClick={() => handleSort("status")}>Stato</th>
                        <th className="table-info" onClick={() => handleSort("createdAt")}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                    {filteredAndSortedTasks.length === 0 && (
                        <tr><td colSpan="3" className="text-center py-4">Nessun task trovato.</td></tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}
