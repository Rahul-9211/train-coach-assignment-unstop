import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';

const TrainCoach = () => {
    const [seats, setSeats] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchSeatAvailability = async () => {
            const response = await axios.get('http://localhost:5000/api/seats');
            console.log("response  data", response.data)
            // setSeats(response.data);
        };
        fetchSeatAvailability();
    }, []);

    const handleReservation = (reservation) => {
        setReservations([...reservations, reservation]);
    };

    const isSeatReserved = (rowIndex, seatIndex) => {
        const reservation = reservations.find(r => r.row === rowIndex && r.seat === seatIndex);
        return reservation ? reservation.name : false;
    };

    return (
        <>
            <h1>Train Coach</h1>
            <table>
                <tbody>
                    {seats.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((seat, seatIndex) => (
                                <td key={seatIndex} className={isSeatReserved(rowIndex, seatIndex) ? 'reserved' : ''}>
                                    {seat}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReservationForm onReservation={handleReservation} />
        </>
    );
};

export default TrainCoach;