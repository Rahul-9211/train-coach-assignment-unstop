const seats = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76],
    [77, 78, 79, 80]
];

const reservations = [];

const reserveSeats = (req, res) => {
    const { name, numberOfSeats } = req.body;

    const availableSeats = findAvailableSeats(numberOfSeats);

    if (availableSeats.length === numberOfSeats) {
        const newReservation = {
            name,
            seatNumbers: availableSeats
        };
        reservations.push(newReservation);
        res.status(200).json(newReservation);
    } else {
        res.status(400).json({ message: 'Seats not available.' });
    }
};

const getSeatAvailability = (req, res) => {
    const seatStatus = seats.map(row => {
        return row.map(seat => {
            return {
                number: seat,
                reserved: reservations.some(r => r.seatNumbers.includes(seat))
            };
        });
    });
    res.status(200).json(seatStatus);
};

const findAvailableSeats = (numberOfSeats) => {
    const seats = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],]; 
        const seatStatus = seats.map(row => {
            let startIndex = 0;
            let availableSeats = [];
            for (let i = 0; i < row.length; i++) {
                if (i === row.length - 1) {
                    if (row[i - 1] + 1 === row[i]) {
                        availableSeats.push({ startIndex, endIndex: i });
                    } else {
                        availableSeats.push({ startIndex, endIndex: i - 1 }, { startIndex: i, endIndex: i });
                    }
                } else if (row[i + 1] - row[i] > 1) {
                    availableSeats.push({ startIndex, endIndex: i });
                    startIndex = i + 1;
                }
            }
            return availableSeats;
        });

    const flattenedSeatStatus = [].concat(...seatStatus);

    const matchingSeats = [];
    for (let i = 0; i < flattenedSeatStatus.length; i++) {
        const { startIndex, endIndex } = flattenedSeatStatus[i];
        if (endIndex - startIndex + 1 >= numberOfSeats) {
            matchingSeats.push({ startIndex, endIndex });
        }
    }

    if (matchingSeats.length === 0) {
        return [];
    }

    const randomIndex = Math.floor(Math.random() * matchingSeats.length);
    const { startIndex, endIndex } = matchingSeats[randomIndex];
    return seats[startIndex].slice(0, numberOfSeats);
};

module.exports = { reserveSeats, getSeatAvailability };