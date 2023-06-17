import React, { useState } from 'react';

function ReservationForm() {
    const [name, setName] = useState('');
    const [numSeats, setNumSeats] = useState(1);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("e", e)
        fetch('/api/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, numSeats }),
        })
            .then(res => res.json())
            .then(data => alert(`Reservation successful!\nSeats: ${data.seats}\nTotal price: ${data.price}`))
            .catch(error => alert(`Reservation failed: ${error}`));

        setName('');
        setNumSeats(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Number of seats:
                <input type="number" min="1" max="7" value={numSeats} onChange={e => setNumSeats(e.target.value)} />
            </label>
            <br />
            <button type="submit">Reserve</button>
        </form>
    );
}

export default ReservationForm;
