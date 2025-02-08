import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Header from './Header/Header';
import './form.css';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!name.trim() || !nameRegex.test(name)) {
      alert('Por favor, ingresa un nombre válido (solo letras).');
      return;
    }

    if (!phone.trim() || !phoneRegex.test(phone)) {
      alert('Por favor, ingresa un número de teléfono válido (solo números).');
      return;
    }

    const { error } = await supabase.from('users').insert({ name, phone });
    if (error) {
      alert('Error al guardar los datos. Intenta de nuevo.');
      return;
    }

    navigate('/numbers', { state: { name, phone } });
  }, [name, phone, navigate]);

  const handleAdminLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', adminUsername)
      .eq('password', adminPassword);

    if (error || data.length === 0) {
      alert('Credenciales incorrectas.');
      return;
    }

    navigate('/admin');
  }, [adminUsername, adminPassword, navigate]);

  const toggleForm = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div>
      <Header isAdmin={isAdmin} toggleForm={toggleForm} />
      <div className="form-container">
        <form onSubmit={handleSubmit} className={!isAdmin ? 'active' : ''}>
          <label htmlFor="name">Ingresa tu nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="phone">Ingresa tu número de teléfono:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Aceptar</button>
        </form>
        <form onSubmit={handleAdminLogin} className={isAdmin ? 'active' : ''}>
          <label htmlFor="adminUsername">Usuario:</label>
          <input
            type="text"
            id="adminUsername"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
          />
          <label htmlFor="adminPassword">Contraseña:</label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Form;