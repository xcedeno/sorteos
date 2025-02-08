import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Card from '../components/Card';
import './numbers.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Numbers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state as { name: string };
  const {phone} = location.state as {phone: string};
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState<number[]>([]);
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const newTotal = isSelecting.length * 1; // Cada número seleccionado vale 1 dólar
    setTotal(newTotal);
  }, [isSelecting]);

  const handleSelect = (number: number) => {
    if (isConfirmed || takenNumbers.includes(number)) return;
    if (isSelecting.includes(number)) {
      setIsSelecting(isSelecting.filter((n) => n !== number));
    } else {
      setIsSelecting([...isSelecting, number]);
    }
  };

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleConfirmSelection = async () => {
    // Verifica si el usuario ya existe en la tabla
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single();
  
    if (fetchError && fetchError.code !== 'PGRST116') {
      alert('Error al verificar el usuario. Intenta de nuevo.');
      return;
    }
  
    if (existingUser) {
      // Si el usuario ya existe, actualiza los números seleccionados
      const { error: updateError } = await supabase
        .from('users')
        .update({ selectedNumbers: isSelecting })
        .eq('name', name);
  
      if (updateError) {
        alert('Error al actualizar la selección. Intenta de nuevo.');
        return;
      }
    } else {
      // Si el usuario no existe, inserta un nuevo registro
      const { error: insertError } = await supabase.from('users').insert({
        name,
        phone,
        selectedNumbers: isSelecting,
      });
  
      if (insertError) {
        alert('Error al guardar la selección. Intenta de nuevo.');
        return;
      }
    }
    setSelectedNumbers(isSelecting);
    setIsSelecting([]);
    setIsConfirmed(true);
    setShowModal(false);
    toast.success('¡Gracias por participar!');
    setTimeout(() => {
      navigate('/');
    }, 3000); // 3 segundos de retraso
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
            isSelecting={isSelecting.includes(number)}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className="confirm-buttom-container">
        <button className="confirm-buttom" onClick={handleConfirm}>Confirmar selección</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Selección</h2>
            <p>¿Estás seguro de seleccionar los siguientes números?</p>
            <p>{isSelecting.join(', ')}</p>
            <p>Total a pagar: ${total}</p>
            <button onClick={handleConfirmSelection}>Aceptar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Numbers;