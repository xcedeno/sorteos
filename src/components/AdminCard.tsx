import React from 'react';
import './card.css';

interface AdminCardProps {
number: number;
name: string;
isSelected: boolean;
children?: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ number, name, isSelected }) => {
return (
<div className={`card ${isSelected ? 'selected' : 'not-selected'}`}>
    <p>{number}</p>
    <p>{name}</p>
</div>
);
};

export default AdminCard;