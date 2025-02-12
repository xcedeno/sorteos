import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import AdminCard from '../components/AdminCard';
import Ticket from '../components/Ticket/Ticket';
import Modal from '../components/Modals/Modal';
import './admin.css';
import { toPng } from 'html-to-image';
import Navbar from '../components/Navbar/Navbar';

const Admin: React.FC = () => {
const [purchases, setPurchases] = useState<{ number: number, name: string, isPaid: boolean }[]>([]);
const [paidUsers, setPaidUsers] = useState<{ name: string, numbers: number[] }[]>([]);
const [selectedUser, setSelectedUser] = useState<{ name: string, numbers: number[] } | null>(null);
const ticketRefs = useRef<Map<string, HTMLDivElement>>(new Map());

useEffect(() => {
const fetchPurchases = async () => {
    const { data, error } = await supabase.from('users').select('name, selectedNumbers, isPaid');
    if (error) {
    console.error(error);
    return;
    }
    if (data) {
    const allPurchases = data.flatMap((entry) =>
        entry.selectedNumbers.map((number: number) => ({ number, name: entry.name, isPaid: entry.isPaid }))
    );
    setPurchases(allPurchases);

    const paidUsersData = data
        .filter((entry) => entry.isPaid)
        .map((entry) => ({ name: entry.name, numbers: entry.selectedNumbers }));
    setPaidUsers(paidUsersData);
    }
};
fetchPurchases();
}, []);

const handleConfirmPayment = async (name: string) => {
const updatedPurchases = purchases.map(purchase =>
    purchase.name === name ? { ...purchase, isPaid: true } : purchase
);
setPurchases(updatedPurchases);

// Actualiza el estado de pago en la base de datos
const { error } = await supabase
    .from('users')
    .update({ isPaid: true })
    .eq('name', name);

if (error) {
    console.error('Error al actualizar el estado de pago:', error);
} else {
    const user = purchases.find(purchase => purchase.name === name);
    if (user) {
    setPaidUsers([...paidUsers, { name: user.name, numbers: purchases.filter(p => p.name === user.name).map(p => p.number) }]);
    }
}
};

const handleDownloadTicket = async (name: string) => {
const ticketRef = ticketRefs.current.get(name);
if (ticketRef) {
    const dataUrl = await toPng(ticketRef);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `ticket-${name}.png`;
    link.click();
}
};

const handleShowTicket = (name: string) => {
const user = paidUsers.find(user => user.name === name);
if (user) {
    setSelectedUser(user);
}
};

const handleCloseModal = () => {
setSelectedUser(null);
};

const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
const allPurchasesMap = new Map(purchases.map(purchase => [purchase.number, purchase]));

return (
<div className="admin-container">
    <Navbar />
    <div className="grid-admin-container">
    {allNumbers.map((number) => {
        const purchase = allPurchasesMap.get(number);
        return (
        <AdminCard
            key={number}
            number={number}
            name={purchase ? purchase.name : 'Disponible'}
            isSelected={!!purchase}
            isPaid={purchase ? purchase.isPaid : false}
            onConfirmPayment={() => purchase && handleConfirmPayment(purchase.name)}
            onDownloadTicket={() => purchase && handleDownloadTicket(purchase.name)}
            onShowTicket={() => purchase && handleShowTicket(purchase.name)}
        />
        );
    })}
    </div>
    <Modal isOpen={!!selectedUser} onClose={handleCloseModal}>
    {selectedUser && (
        <div ref={el => el && ticketRefs.current.set(selectedUser.name, el)}>
        <Ticket name={selectedUser.name} numbers={selectedUser.numbers} />
        </div>
    )}
    </Modal>
</div>
);
};

export default Admin;