import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }
        else {
            alert("invalid credentials")
        }
        // console.log(json);
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={onChange} value={credentials.email} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={onChange} value={credentials.password} placeholder="Enter your password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;
