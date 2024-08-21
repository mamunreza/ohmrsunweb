import React from 'react';
import './Modal.css'; // Optional: for styling

interface ModalProps {
    text: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ text, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-body">{text}</div>
            </div>
        </div>
    );
};

export default Modal;
