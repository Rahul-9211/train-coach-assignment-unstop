import axios from "axios";
import React, { useEffect, useState } from "react";
import "./confirmBtn.css";

const TrainSeats = () => {
    const [seatState, setSeatState] = useState([]);
    // const userLocal = localStorage.getItem("email")
    const [user, setUser] = useState("suraj@gmail.com")
    var [seatState_index, setSeatState_index] = useState(0);
    async function getSeats() {
        await axios
            .get(`http://localhost:5000/get-seats`)
            .then((res) => {
                console.log("res - .>", res.data.data);
                setSeatState(res.data.data[0].Seats);
                setUser(() => { return localStorage.getItem("email") })
            })
            .catch((res) => {
                console.log("res - false");
            });
    }
    useEffect(() => {

        getSeats();
    }, []);

    const getSeatContent = (seat) => {
        // console.log("seat", seat)
        if (seat != undefined) {
            if (seat.status === "reserved") {
                if (seat.email === user) {
                    return <div className="reserved-self-seat">{seat.number}</div>;
                }
                return <div className="reserved-seat">{seat.number}</div>;
            } else if (seat.status === "booked") {
                if (seat.email === user) {
                    return <div className="booked-self-seat">{seat.number}</div>;
                }
                return <div className="booked-seat">{seat.number}</div>;
            } else {
                return <div className="empty-seat"></div>;
            }
        }

        // return <div className="window-seat"></div>;
    };
    async function handleCofirmBooking(){
        await axios.post('http://localhost:5000/confirm-seats', {email : user})
        .then((res)=>{console.log("res after confirm booking  ", res.data)})
        .catch((res)=>{console.log("error in cofrm booking ", res.data)})
    }

    return (
        <div className="train">
            <div className="saveSeats"><button class="cssbuttons-io-button" onClick={()=>{handleCofirmBooking()}}> Confirm Booking
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                </div>
            </button></div>
            <div className="legends">

                <div className="legendBox">
                    <div className="train-seat"><div className="booked-self-seat"></div></div>
                    <div className="name">Booked by you</div>
                </div>
                <div className="legendBox"> <div className="train-seat"><div className="booked-seat"></div></div>
                    <div className="name">Already Booked</div>
                </div>
                <div className="legendBox"> <div className="train-seat"><div className="reserved-self-seat"></div></div>
                    <div className="name">Reserved by you</div></div>
                <div className="legendBox"> <div className="train-seat"><div className="reserved-seat"></div></div>
                    <div className="name">Already Reserved</div></div>
                <div className="legendBox"> <div className="train-seat"><div className="empty--seat"></div></div>
                    <div className="name">Available</div></div>

            </div>
            {[...Array(11)].map((_, rowIndex) => (
                <div className="train-row" key={rowIndex}>
                    {[...Array(7)].map((_, seatIndex) => {
                        const seatNumber = rowIndex * 7 + seatIndex + 1;
                        // const seat = seatState.find((s) => s.seatNumber === seatNumber);
                        // console.log("main", seatState)
                        return <div className="train-seat">{getSeatContent(seatState[seatState_index++])}</div>;
                    })}
                    {rowIndex === 10 && (
                        <>
                            {[...Array(3)].map((_, seatIndex) => {
                                const seatNumber = 77 + seatIndex + 1;
                                const seat = seatState.find((s) => s.seatNumber === seatNumber);
                                return <div className="train-seat">{getSeatContent(seat)}</div>;
                            })}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TrainSeats;
