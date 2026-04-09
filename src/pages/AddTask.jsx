import { useMemo, useRef, useState } from "react";
//  Importiamo il context
import { useGlobalContext } from "../context/GlobalContext";

export default function AddTask() {
    // Usiamo addTask dal contesto globale
    const { addTask } = useGlobalContext(); 
    const [title, setTitle] = useState("");

    //usiamo Ref per l'input non controllati
    const descizioneRef = useRef();
    const selectRef = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

    const validTitle = useMemo(() => {  //validazione del titolo : se è vuoto e controlliamo se ci siano simboli
        if (!title.trim()) return false;
        return title.split("").some((s) => symbols.includes(s));
    });

    async function handleSubmit(event) { 
        event.preventDefault();

        // Validazione titolo (Milestone 5)
        if (!title.trim() || validTitle) {
            alert("Controlla il titolo: non può essere vuoto o contenere simboli.");
            return;
        }

        const descrizione = descizioneRef.current.value;
        const select = selectRef.current.value;

        try {
            await addTask({
                title: title,
                description: descrizione,
                status: select
            });

            alert("Task creata con successo!");
            
            // Reset campi
            setTitle("");
            descizioneRef.current.value = "";
            selectRef.current.value = "To do";
            
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section className="container mt-4">
            <h2 className="text-center mb-4">Aggiungi la tua task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome della task</label>
                    <input
                        type="text"
                        className={`form-control ${validTitle ? "is-invalid" : ""}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Es: Fare la spesa"
                    />
                    {title.trim() && (
                        <div className={validTitle ? "text-danger" : "text-success"}>
                            {validTitle ? "Simboli non ammessi" : "Titolo valido"}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrizione</label>
                    <textarea className="form-control" ref={descizioneRef}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Stato</label>
                    <select className="form-select" ref={selectRef}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Aggiungi Task</button>
            </form>
        </section>
    );
}
