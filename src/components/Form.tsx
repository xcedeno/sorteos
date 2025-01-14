import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import './form.css';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    navigate('/numbers', { state: { name } });
  }, [name, navigate]);

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

  return (
    <div>
      <header className="header">
        <button className="admin-button" onClick={() => setIsAdmin(true)}>Administrador</button>
      </header>
      {!isAdmin ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Ingresa tu nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Aceptar</button>
        </form>
      ) : (
        <form onSubmit={handleAdminLogin}>
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
          <button type="button" onClick={() => setIsAdmin(false)}>Volver</button>
        </form>
      )}
    </div>
  );
};

export default Form;