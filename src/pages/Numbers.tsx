import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Card from '../components/Card';
import './numbers.css';

const Numbers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state as { name: string };
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchTakenNumbers = async () => {
      const { data, error } = await supabase.from('users').select('selectedNumbers');
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        const allNumbers = data.flatMap((entry) => entry.selectedNumbers || []);
        setTakenNumbers(allNumbers);
      }
    };
    fetchTakenNumbers();
  }, []);

  const handleSelect = (number: number) => {
    if (!takenNumbers.includes(number)) {
      setSelectedNumbers((prev) => [...prev, number]);
      setTotal((prev) => prev + 1);
    }
  };

  const handleConfirm = async () => {
    const { error } = await supabase.from('users').insert({
      name,
      selectedNumbers,
    });
    if (error) {
      alert('Error al guardar la selección. Intenta de nuevo.');
      return;
    }
    setIsConfirmed(true);
    alert('¡Gracias por participar!');
    navigate('/');
  };

  return (
    <div>
      <h1>Bienvenido, {name}</h1>
      <p>Total a pagar: ${total}</p>
      <div className="grid-container">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
          <Card
            key={number}
            number={number}
            isSelected={takenNumbers.includes(number) || selectedNumbers.includes(number)}
            onSelect={handleSelect}
            isConfirmed={isConfirmed}
          />
        ))}
      </div>
      <button onClick={handleConfirm}>Confirmar selección</button>
    </div>
  );
};

export default Numbers;