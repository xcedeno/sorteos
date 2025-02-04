import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import './ticket.css';

interface TicketProps {
name: string;
numbers: number[];
}

const Ticket: React.FC<TicketProps> = ({ name, numbers }) => {
const ticketRef = useRef<HTMLDivElement>(null);

const generateTicketNumber = () => {
return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const ticketNumber = generateTicketNumber();

const downloadTicket = async () => {
if (ticketRef.current === null) {
    return;
}

const dataUrl = await toPng(ticketRef.current);
const link = document.createElement('a');
link.href = dataUrl;
link.download = `ticket-${ticketNumber}.png`;
link.click();
};

return (
<div className="ticket" ref={ticketRef}>
    <h2>Ticket</h2>
    <p><strong>Nombre:</strong> {name}</p>
    <p><strong>Números:</strong> {numbers.join(', ')}</p>
    <p><strong>Número de Ticket:</strong> {ticketNumber}</p>
    <button onClick={downloadTicket}>Descargar Ticket</button>
</div>
);
};

export default Ticket;