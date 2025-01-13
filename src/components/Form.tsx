import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    navigate('/numbers', { state: { name } });
  }, [name, navigate]);

  return (
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
  );
};

export default Form;