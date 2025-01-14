import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import AdminCard from '../components/AdminCard';
import './admin.css';

const Admin: React.FC = () => {
const [purchases, setPurchases] = useState<{ number: number, name: string }[]>([]);

useEffect(() => {
const fetchPurchases = async () => {
    const { data, error } = await supabase.from('users').select('name, selectedNumbers');
    if (error) {
    console.error(error);
    return;
    }
    if (data) {
    const allPurchases = data.flatMap((entry) =>
        entry.selectedNumbers.map((number: number) => ({ number, name: entry.name }))
    );
    setPurchases(allPurchases);
    }
};
fetchPurchases();
}, []);

const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
const allPurchasesMap = new Map(purchases.map(purchase => [purchase.number, purchase.name]));

return (
<div>
    <h1>Panel de Administrador</h1>
    <div className="grid-container">
    {allNumbers.map((number) => (
        <AdminCard
        key={number}
        number={number}
        name={allPurchasesMap.get(number) || 'Disponible'}
        isSelected={allPurchasesMap.has(number)}
        />
    ))}
    </div>
</div>
);
};

export default Admin;