import React from 'react';
import './card.css';

interface CardProps {
number: number;
isSelected: boolean;
isSelecting: boolean;
onSelect: (number: number) => void;
children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ number, isSelected, isSelecting, onSelect }) => {
return (
<div
    onClick={() => !isSelected && onSelect(number)}
    className={`card ${isSelected ? 'selected' : isSelecting ? 'selecting' : 'not-selected'}`}
>
    {number}
</div>
);
};

export default Card;