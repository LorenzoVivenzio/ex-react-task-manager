import './App.css'; // Aggiunto il punto e virgola
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout'; // Controlla che il percorso sia corretto
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import { GlobalProvider } from './context/GlobalContext';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addTask" element={<AddTask />} /> 
            <Route path='/task/:id' element={<TaskDetail/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
export default App;
