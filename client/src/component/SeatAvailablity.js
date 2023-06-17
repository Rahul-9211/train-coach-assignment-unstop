import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatAvailability = () => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            const res = await axios.get('/api/seats');
            setSeats(res.data);
        };

        fetchSeats();
    }, []);

    return (
        <div>
            <h2>Seat Availability</h2>
            <table>
                <tbody>
                    {seats.map(row => (
                        <tr key={row}>
                            {row.map(seat => (
                                <td key={seat} className={seat.reserved ? 'reserved' : 'available'}>{seat.number}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeatAvailability;