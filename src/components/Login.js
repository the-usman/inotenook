import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/Alertcontext/alertContext';

function Login() {
    const {showAlert}= useContext(alertContext)
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials) // No need for toString()
        });
        const data = await response.json();
        console.log(data);
        if(data.success)
        {
            localStorage.setItem('token', data.tokenAuth)
            history('/')
            showAlert("Successfully loged in", "success")
        }
        else{
            showAlert("Incorrect Credendial", "danger")
        }
    };


    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }; return (
        <div className='container' onSubmit={handleSubmit}>
            <h1 className='my-3'>Login Form</h1>
            <form className='my-3'>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="email" value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
