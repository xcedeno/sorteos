import React, { useState } from 'react';
import './AdminCard.css';

interface AdminCardProps {
number: number;
name: string;
isSelected: boolean;
isPaid: boolean;
onConfirmPayment: () => void;
onDownloadTicket: () => void;
onShowTicket: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ number, name, isSelected, isPaid, onConfirmPayment, onDownloadTicket, onShowTicket }) => {
const [showConfirm, setShowConfirm] = useState(false);

const handleConfirmClick = () => {
setShowConfirm(true);
};

const handleConfirmPayment = () => {
onConfirmPayment();
setShowConfirm(false);
};

const handleCancel = () => {
setShowConfirm(false);
};

return (
<div className={`card ${isSelected ? (isPaid ? 'paid' : 'not-paid') : 'not-selected'}`} onClick={isPaid ? onShowTicket : undefined}>
    <p>{number}</p>
    <p>{name}</p>
    {isSelected && !isPaid && (
    <>
        <button onClick={handleConfirmClick}>Confirmar Pago</button>
        {showConfirm && (
        <div className="confirm-dialog">
            <p>¿Estás seguro?</p>
            <button onClick={handleConfirmPayment}>Sí</button>
            <button onClick={handleCancel}>No</button>
        </div>
        )}
    </>
    )}
    {isSelected && isPaid && (
    <button onClick={onDownloadTicket}>Descargar Ticket</button>
    )}
</div>
);
};

export default AdminCard;