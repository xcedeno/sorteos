import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Numbers from './pages/Numbers';
import Admin from './pages/Admin';
import Roulette from './components/Roulette/Roulette';
import { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    const handleResize = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar && navbar.classList.contains('open')) {
        document.body.classList.add('navbar-open');
        document.body.classList.remove('navbar-closed');
      } else {
        document.body.classList.add('navbar-closed');
        document.body.classList.remove('navbar-open');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Router>

      {/* Rutas de la aplicación */}
      <Routes>
        {/* Página inicial (Formulario) */}
        <Route path="/" element={<Form />} />

        {/* Página de números seleccionados */}
        <Route path="/numbers" element={<Numbers />} />

        {/* Página del administrador */}
        <Route path="/admin" element={<Admin />} />
        {/* Página de la Ruleta de Sorteo */}
        <Route path="/roulette" element={<Roulette />} />

        
      </Routes>
    </Router>
  );
};

export default App;

