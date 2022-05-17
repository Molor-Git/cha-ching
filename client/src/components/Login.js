import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailNotFound, setEmailNotFound] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { email, password};
        axios.post("http://localhost:8000/api/login", postData, {
            withCredentials: true,
        })
        .then((response) => {
            console.log(response);
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            setError(err.response.data.error)
            setEmailNotFound(err.response.data.err)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="login bg-secondary">
            <h1>Cha-Ching 🤑</h1>
            {error && <h5 style={{color: "yellow" }}>{error}</h5> }
            {emailNotFound && <h5 style={{color: "red" }}>{emailNotFound}</h5> }
            <div className="email text-light">
                Email: <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="password text-light">
                Password: <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary">
                <Link 
                    to={"/register"} 
                    className="text-light">Return
                </Link>
            </button>
            <button type="submit" onChange={Login} className="btn btn-success">Login</button>
        </form>
    )
}

export default Login;

