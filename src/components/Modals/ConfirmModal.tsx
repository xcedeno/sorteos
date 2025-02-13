import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
isOpen: boolean;
onClose: () => void;
onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
if (!isOpen) return null;

return (
<div className="confirm-modal-overlay">
    <div className="confirm-modal-content">
    <h2>¿Está seguro que desea salir?</h2>
    <div className="confirm-modal-buttons">
        <button onClick={onConfirm} className="confirm-button">Sí</button>
        <button onClick={onClose} className="cancel-button">No</button>
    </div>
    </div>
</div>
);
};

export default ConfirmModal;