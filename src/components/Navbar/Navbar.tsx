import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, PuzzlePieceIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

const Navbar: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const toggleMenu = () => {
setIsOpen(!isOpen);
};

const handleLogout = () => {
// Lógica para cerrar sesión
// Por ejemplo, eliminar el token de autenticación
localStorage.removeItem('authToken');
navigate('/');
};

useEffect(() => {
if (isOpen) {
    document.body.classList.add('navbar-open');
    document.body.classList.remove('navbar-closed');
} else {
    document.body.classList.add('navbar-closed');
    document.body.classList.remove('navbar-open');
}
}, [isOpen]);

return (
<nav className={`navbar ${isOpen ? 'open' : ''}`}>
    <div className="hamburger" onClick={toggleMenu}>
    <span className="bar"></span>
    <span className="bar"></span>
    <span className="bar"></span>
    </div>
    <ul>
    <li>
        <Link to="/admin" className="menu-item">
        <HomeIcon className="icon" />
        <span className="menu-text">Menú Principal</span>
        </Link>
    </li>
    <li>
        <Link to="/roulette" className="menu-item">
        <PuzzlePieceIcon className="icon" />
        <span className="menu-text">Ruleta de Sorteo</span>
        </Link>
    </li>
    <li>
        <button onClick={handleLogout} className="menu-item logout-button">
        <ArrowRightOnRectangleIcon className="icon" />
        <span className="menu-text">Cerrar Sesión</span>
        </button>
    </li>
    </ul>
</nav>
);
};

export default Navbar;