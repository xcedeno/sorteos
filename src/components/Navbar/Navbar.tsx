import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
return (
<nav className="navbar">
    <ul>
    <li>
        <Link to="/">Menú Principal</Link>
    </li>
    <li>
        <Link to="/roulette">Ruleta de Sorteo</Link>
    </li>
    </ul>
</nav>
);
};

export default Navbar;