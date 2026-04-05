import { NavLink } from "react-router-dom";


export default function Header() {
    return (
        <>
        
            <nav className="navbar bg-primary navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Task Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to = "/" className="nav-link active" aria-current="page" href="#">Task List</NavLink >
                            <NavLink  to = "/addTask" className="nav-link" href="#">Add Task</NavLink >
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}