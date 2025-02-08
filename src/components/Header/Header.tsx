import React from 'react';
import './header.css';

interface HeaderProps {
isAdmin: boolean;
toggleForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, toggleForm }) => {
return (
<header className="header">
    <button className="toggle-button" onClick={toggleForm}>
    {isAdmin ? 'Volver' : 'Administrador'}
    </button>
</header>
);
};

export default Header;