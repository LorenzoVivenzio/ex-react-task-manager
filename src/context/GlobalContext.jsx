import { createContext, useContext } from "react";
import { useTask } from "../components/useTask";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    
    const taskData = useTask();

    return (
        <GlobalContext.Provider value={taskData}>
            {children}
        </GlobalContext.Provider>
    );
}

//creiamo un hook personalizzato per non dover scrivere ogni volta useContext(GlobalContext)
export const useGlobalContext = () => useContext(GlobalContext);
