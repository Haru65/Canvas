import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "./login.css"; // Keep this as is if your CSS file is named login.css
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
const Login = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const histroy = useNavigate()
    const check = () => {
        setMessage(password ? "" : "Password is required");
    };
   
    const submit = async () => {
        try {
            await axios.post("http://localhost:3001/api/login", {
                username,
                password,
            }).then( res =>{
                if(res.data.message  === "found"){
                    histroy("/home")
                }
            }
             
            )
            console.log("Signup successful");
        } catch (e) {
            console.error("Signup error:", e);
        }
    };

    return (
        <div className="container">
            <form className="form">
                <div className="form-group">
                    <label className="signuplabel">Username</label>
                    <input
                        className="signupinput"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="signuplabel">Password</label>
                    <input
                        className="signupinput"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="error-message">{message}</p>

                    <div className="button-group">
                        <button
                            className="button"
                            type="button"
                            onClick={() => { submit(); check(); }}
                        >
                            Login
                        </button>
                        <Link to ="/signup"> 
                                <button
                                    className="button" type="button">
                                    Signup
                                </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
