import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { supabase } from '../../services/supabaseClient';
import './ticket.css';

interface TicketProps {
name: string;
numbers: number[];
}

const Ticket: React.FC<TicketProps> = ({ name, numbers }) => {
const ticketRef = useRef<HTMLDivElement>(null);
const [ticketNumber, setTicketNumber] = useState<string>('');

useEffect(() => {
const fetchTicketNumber = async () => {
    const { data, error } = await supabase
    .from('users')
    .select('ticketNumber')
    .eq('name', name)
    .single();

    if (error) {
    console.error('Error fetching ticket number:', error);
    return;
    }

    if (data && data.ticketNumber) {
    setTicketNumber(data.ticketNumber);
    } else {
    const newTicketNumber = generateTicketNumber();
    setTicketNumber(newTicketNumber);
    await supabase
        .from('users')
        .update({ ticketNumber: newTicketNumber })
        .eq('name', name);
    }
};

fetchTicketNumber();
}, [name]);

const generateTicketNumber = () => {
return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const downloadTicket = async () => {
if (ticketRef.current === null) {
    return;
}

const dataUrl = await toPng(ticketRef.current, { width: 365, height: 667 });
const link = document.createElement('a');
link.href = dataUrl;
link.download = `ticket-${name}-${ticketNumber}.png`;
link.click();
};

return (
<div className="ticket" ref={ticketRef}>
    <h2>Sorteo 001</h2>
    <p><strong>Gánate un combo playero</strong></p>
    <img src="/src/assets/images/sorteo.png" alt="Imagen del Sorteo" className="ticket-image" />
    <p><strong>Nombre:</strong> {name}</p>
    <p><strong>Tus Números:</strong></p>
    <div className="numbers-container">
    {numbers.map((number, index) => (
        <div key={index} className="number-box">{number}</div>
    ))}
    </div>
    <p><strong>Número de Ticket:</strong> {ticketNumber}</p>
    <button onClick={downloadTicket}>Descargar Ticket</button>
</div>
);
};

export default Ticket;