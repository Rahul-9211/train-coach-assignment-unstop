
import { useState } from "react"
import swal from 'sweetalert'
import "../assets/CSS/login.css"
import axios from "axios"


const Login = () => {
    const [email, setEmail] = useState("")
    const [numberOfSeats, setNumberOfSeats] = useState()

    const handleSubmit = async () => {
        console.log("", email, numberOfSeats)

        await axios.post(`http://localhost:5000/add-seats`, {
            email: email,
            numberOfSeats: numberOfSeats
        }).then((res) => {
            if (res.status) {
                console.log("data", res.data.data)
                localStorage.setItem("email", res.data.data)
                window.location.href = "/dashboard"
            }
        })
    }
    const handleEmailOnchange = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const handleSeatNumberOnchange = (e) => {
        console.log(e.target.value)
        const seats = e.target.value
        if (seats > 7 || seats < 1) {
            swal({
                title: "Error!",
                text: "Please enter between 1 and  7!",
                icon: "warning",
                button: "Aww yiss!",
            });
            setNumberOfSeats()
        }
        // if (seats === null) {
        //     swal({
        //         title: "Error!",
        //         text: "Please enter between 1 and  7!",
        //         icon: "warning",
        //         button: "Aww yiss!",
        //     });
        // }

        else {

            setNumberOfSeats(e.target.value)
        }


    }
    return (
        <div className="login">

            <div class="login_container">
                <input id="signup_toggle" type="checkbox" />
                <div class="login_form">
                    <div class="login_form_front">
                        <div class="login_form_details">Login</div>

                        <input className="login_input" required="" name="" placeholder="email" type="email" value={email} onChange={handleEmailOnchange} />
                        <input type="number" id="seats" class="login_input" placeholder="number of seats" name="seats" min="1" max="7" value={numberOfSeats} onChange={handleSeatNumberOnchange} />
                        <button onClick={handleSubmit} class="login_btn">Login</button>
                        <span class="switch">Don't have an account?
                            <label htmlFor="signup_toggle" class="signup_tog">
                                Sign Up
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;