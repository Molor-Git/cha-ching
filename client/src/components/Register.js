import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Register.css"

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [err, setErr] = useState({});
    // const [emailExists, setEmailExists] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { 
            firstName, 
            lastName, 
            email, 
            password,
            confirmPassword
        };
        axios.post("http://localhost:8000/api/register", newUser, {
            withCredentials: true,
        })
        .then((response) => {
            console.log(response);
            setSuccessMsg("Thank you for registering, you can now log in!");
            
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                setAuthError("email already exists!");
            } else {
                setErr(err.response.data.errors);
            }
        })
    };
    return (
        <form onSubmit={handleSubmit} className="">
        <div className="container bg-secondary">
            <div className="header">
                <h1><span className="text-info">Welcome to</span> Cha-Ching 🤑</h1>
                <h5><Link to={`/login`} className="login text-info">Login</Link></h5>
            </div>
                <h4 className="text-light">One man's trash, Another men's treasure! </h4>
            <div className="successMsg">
                <h5 style={{ color: "lightgreen" }}>{successMsg}</h5>
            </div>
                {authError && <h5 style={{ color: "yellow" }}>{authError}</h5> }
                {/* {emailExists && <h5 style={{ color: "yellow" }}>{emailExists}</h5> } */}
            <div className="register align-left">
                <h2 className="text-light">Register</h2>
                <div className="text-light">
                    First Name: <input type="text" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="text-light">
                    Last Name: <input type="text" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="text-light">
                    Email: <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="text-light">
                    Password: <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="text-light">
                    Confirm Password: <input type="text" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="errors">
                    {err.firstName && <h5 style={{color: "yellow" }}>{err.firstName.message}</h5> }
                    {err.lastName && <h5 style={{color: "yellow" }}>{err.lastName.message}</h5> }
                    {err.email && <h5 style={{color: "yellow" }}>{err.email.message}</h5> }
                    {err.password && <h5 style={{color: "yellow" }}>{err.password.message}</h5> }
                    {err.confirmPassword && <h5 style={{color: "yellow" }}>{err.confirmPassword.message}</h5> }
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </div>
        </form>
    )
};


export default Register;