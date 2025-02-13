import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { supabase } from "../../services/supabaseClient";
import "./Roulette.css";
import Navbar from "../Navbar/Navbar";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface PaidNumber {
number: number;
ticketNumber: string;
name: string; // Agregamos el campo 'name' para identificar al ganador
}

const Roulette: React.FC = () => {
const [paidNumbers, setPaidNumbers] = useState<PaidNumber[]>([]);
const [isSpinning, setIsSpinning] = useState(false);
const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
const [showModal, setShowModal] = useState(false);
const { width, height } = useWindowSize();

// Función para cargar los números confirmados desde Supabase
const fetchPaidNumbers = async () => {
try {
    const { data, error } = await supabase
    .from("users")
    .select("name, selectedNumbers, ticketNumber");

    if (error) {
    console.error("Error fetching paid numbers:", error);
    return;
    }

    if (data && Array.isArray(data)) {
    const processedNumbers: PaidNumber[] = [];
    data.forEach((user) => {
        if (
        Array.isArray(user.selectedNumbers) &&
        user.ticketNumber // Solo incluir si hay un ticketNumber
        ) {
        user.selectedNumbers.forEach((number: number) => {
            processedNumbers.push({
            number,
            ticketNumber: user.ticketNumber || "Sin Ticket",
            name: user.name || "Desconocido", // Agregamos el nombre del usuario
            });
        });
        }
    });

    setPaidNumbers(processedNumbers);
    }
} catch (err) {
    console.error("Unexpected error:", err);
}
};

useEffect(() => {
fetchPaidNumbers();
}, []);

// Función para girar la ruleta
const spinWheel = () => {
if (isSpinning || paidNumbers.length === 0) return;

setIsSpinning(true);
const randomIndex = Math.floor(Math.random() * paidNumbers.length);
setPrizeIndex(randomIndex);

setTimeout(() => {
    setIsSpinning(false);
    setShowModal(true);
}, 4000); // Duración de la animación de giro
};

// Datos para la ruleta
const colors = ["#00008B", "#000000", "#FF0000"]; // Azul oscuro, negro y rojo

const data = paidNumbers.map((number, index) => ({
option: `Número: ${number.number}`,
style: { backgroundColor: colors[index % colors.length] },
fontSize: 16,
}));

// Validar que haya números disponibles
if (paidNumbers.length === 0) {
return (
    <div className="roulette-container">
    <Navbar />
    <p>No hay números con ticket disponibles para sortear.</p>
    </div>
);
}

return (
<div className="roulette-container">
    <Navbar />
    {/* Ruleta */}
    <div className="wheel-container">
    <Wheel
        mustStartSpinning={isSpinning}
        prizeNumber={prizeIndex !== null ? prizeIndex : -1}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        radiusLineColor="black"
        fontSize={16}
        spinDuration={0.35}
        onStopSpinning={() => setIsSpinning(false)}
    />
    <button
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning || paidNumbers.length === 0}
    >
        {isSpinning
        ? "Girando..."
        : paidNumbers.length === 0
        ? "Sin números disponibles"
        : "Girar Ruleta"}
    </button>
    </div>

    {/* Modal de Resultado */}
    {showModal && (
    <div className={`modal-overlay ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
        <h2>¡Felicidades!</h2>
        <p>
            Nombre del Ganador:{" "}
            <strong>{prizeIndex !== null ? paidNumbers[prizeIndex].name : ""}</strong>
        </p>
        <p>
            Ganaste el número:{" "}
            <strong>{prizeIndex !== null ? paidNumbers[prizeIndex].number : ""}</strong>
        </p>
        <p>
            Número de Ticket:{" "}
            <strong>{prizeIndex !== null ? paidNumbers[prizeIndex].ticketNumber : ""}</strong>
        </p>
        <button className="close-button" onClick={() => setShowModal(false)}>
            Cerrar
        </button>
        </div>
    </div>
    )}

    {/* Efecto de Confeti */}
    {showModal && <Confetti width={width} height={height} />}
</div>
);
};

export default Roulette;