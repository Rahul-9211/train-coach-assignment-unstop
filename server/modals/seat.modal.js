const mongoose = require("mongoose");

const SeatsData = new mongoose.Schema(
    {
        UniqueID: { type: String },
        Email: { type: String, },
        Seats: [
            JSON
        ]
    },
    { collection: "seats" }
);


const SeatsModal = mongoose.model("seats", SeatsData);

module.exports = SeatsModal;


