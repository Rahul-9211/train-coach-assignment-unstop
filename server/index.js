const express = require("express");
const cors = require("cors");
const { reserveSeats, getSeatAvailability } = require("./controllers/seats");
const SeatsModal = require("./modals/seat.modal");
require("./connection/db");

const app = express();

app.use(express.json());
app.use(cors());

// Reserve seats
// app.post('/api/reserve', async (req, res) => {
//     const { name, numberOfSeats } = req.body;

//     // Find available seats
//     const availableSeats = await findAvailableSeats(numberOfSeats);

//     if (availableSeats.length < numberOfSeats) {
//         return res.status(400).send({ message: 'Not enough seats available.' });
//     }

//     // Update reservation status
//     await Reservation.updateMany(
//         { seatNumber: { $in: availableSeats } },
//         { $set: { isReserved: true } }
//     );

//     // Create reservation
//     const reservation = new Reservation({
//         name,
//         numberOfSeats,
//         seatNumbers: availableSeats,
//         isReserved: true
//     });

//     await reservation.save();

//     res.send({ message: 'Seats reserved successfully.' });
// });

// Get all seat reservations
app.get("/api/reservations", async (req, res) => {
    const reservations = await Reservation.find({});
    res.send(reservations);
});

// Get available seats
// app.get('/api/seats', async (req, res) => {
//     const availableSeats = await findAvailableSeats(1);
//     res.send(availableSeats);
// });

// Helper function to find available seats
const findAvailableSeats = async (numberOfSeats) => {
    // Get all seat reservations
    const reservations = await Reservation.find({});

    // Create matrix of seats
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
        [77, 78, 79, 80],
    ];

    // Check if seats are available
    let availableSeats = [];
    for (let row = 0; row < seats.length; row++) {
        for (let col = 0; col < seats[row].length; col++) {
            if (availableSeats.length === numberOfSeats) {
                return availableSeats;
            }
            if (!reservations.some((r) => r.seatNumbers.includes(seats[row][col]))) {
                availableSeats.push(seats[row][col]);
            } else {
                availableSeats = [];
            }
        }
        availableSeats = [];
    }

    return availableSeats;
};

// Random Number 10 unique ID Generator  --------------------------------->
function uniqueIdGenerator() {
    const uniqueID = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `${uniqueID}`;
}

app.post("/api/reserve", reserveSeats);
app.get("/api/seats", getSeatAvailability);

// api to hard code data
app.post("/custom-seats", async (req, res) => {
    console.log("custom-seats", req.body);
    const { email, numberOfSeats } = req.body;
    const uniqID = uniqueIdGenerator();
    try {
        await SeatsModal.create({
            UniqueID: uniqID,
            Email: email,
            Seats: [],
        })
            .then((res) => {
                console.log("yes modal created", res);
            })
            .catch((res) => {
                console.log("no modal not created", res);
            });
        for (let i = 0; i < numberOfSeats; i++) {
            const seats = {
                number: i + 1,
                status: "reserved",
                email: email,
            };
            await SeatsModal.updateOne(
                {
                    UniqueID: uniqID,
                },
                { $push: { Seats: seats } }
            )
                .then((res) => {
                    console.log("yes modal updated", res);
                })
                .catch((res) => {
                    console.log("no modal not updated", res);
                });
        }
        res.json({ status: true });
    } catch (error) {
        console.log("error", error);
        res.json({ status: false });
    }
});

app.post("/add-seats", async (req, res) => {
    console.log("body", req.body);
    //   console.log("custom-seats", req.body);
    const { email, numberOfSeats } = req.body;
    const uniqID = "1167333842";
    try {
        // await SeatsModal.create({
        //     UniqueID: uniqID,
        //     Email: email,
        //     Seats: [],
        // })
        //     .then((res) => {
        //         console.log("yes modal created", res);
        //     })
        //     .catch((res) => {
        //         console.log("no modal not created", res);
        //     });
        for (let i = 0; i < numberOfSeats; i++) {
            const seats = {
                number: i + 1,
                status: "reserved",
                email: email,
            };
            await SeatsModal.updateOne(
                {
                    UniqueID: uniqID,
                },
                { $push: { Seats: seats } }
            )
                .then((res) => {
                    console.log("yes modal updated", res);
                })
                .catch((res) => {
                    console.log("no modal not updated", res);
                });
        }
        res.json({ status: true, data: email, token: "" });
    } catch (error) {
        console.log("error", error);
        res.json({ status: false, data: "", token: "" });
    }
});


app.post('/cofirm-seats', async (req, res) => {
    console.log("thois is em ")
    try {

        const uniqID = "1167333842";
        const seats = await SeatsModal.find({});

        for (let i = 0; i < seats.Seats.length; i++) {
            if (seats.Seats[i].email === req.body.email) {
                await SeatsModal.updateOne({
                    UniqueID: uniqID,
                    "Seats.number": seats.Seats[i].number
                }, { $set: { "Seats.$.status": "booked" } })    
            }
        }
    } catch (error) {

    }

})

app.get('/get-seats', async (req, res) => {
    // console.log("this is me");
    try {
        const seats = await SeatsModal.find({})
        res.json({ status: true, data: seats })
    } catch (error) {

        res.json({ status: false, data: seats })
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
