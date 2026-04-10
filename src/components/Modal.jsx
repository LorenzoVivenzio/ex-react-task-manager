import ReactDOM from "react-dom";

export default function Modal({ 
    title, 
    content, 
    show, 
    onClose, 
    onConfirm, 
    confirmText = "Conferma" 
}) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <>
            
            <div 
                className="modal-backdrop fade show" 
                style={{ zIndex: 1050 }}
                onClick={onClose} 
            ></div>

            {/* Contenitore Modale */}
            <div 
                className="modal fade show d-block" 
                tabIndex="-1" 
                style={{ zIndex: 1055 }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>{content}</p>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={onClose}
                            >
                                Annulla
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}
