import React, {useState, useContext} from 'react'
import alertContext from '../context/Alertcontext/alertContext';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const {showAlert}= useContext(alertContext)
    const [credentials, setCredentials] = useState({ name:"", email: "", password: "" })
    let history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials) 
        });
        const data = await response.json();
        console.log(data);
        if(data.success)
        {
            localStorage.setItem('token', data.tokenAuth)
            history('/')
            showAlert("Account Created Successfully", "success")
        }
        else{
            showAlert("Incorrect Details", "danger")
        }
    };


    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <div className='container' onSubmit={handleSubmit}>
            <h1 className='my-3'>Signup Form</h1>
            <form className='my-3'>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="name" value={credentials.name} required/>
                    
                </div>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="email" value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} value={credentials.password} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
