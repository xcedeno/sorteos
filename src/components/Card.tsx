import React from 'react';
import './card.css';

interface CardProps {
number: number;
isSelected: boolean;
onSelect: (number: number) => void;
}

const Card: React.FC<CardProps> = ({ number, isSelected, onSelect }) => {
return (
<div
    onClick={() => !isSelected && onSelect(number)}
    className={`card ${isSelected ? 'selected' : 'not-selected'}`}
>
    {number}
</div>
);
};

export default Card;