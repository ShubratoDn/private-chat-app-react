import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userLogin, userRegister } from '../services/userServices';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    // handle form submit
    const handleRegister = (e) => {
        e.preventDefault();

        if (username.trim().length < 1) {
            setError("Insert username")
            return;
        }
        if(password.trim().length < 1){
            setError("Insert password")
            return;
        }

        userRegister(username, password)
            .then((data)=>{
                console.log(data)
                navigate("/login");
            })
            .catch((err)=>{
                setError(err.response.data.message);
            })
    }




    //input handling
    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        if (name === 'username') {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    return (
        <div>
            <form className='form' onSubmit={handleRegister}>
                <h1>Register to TalkStar</h1>

                {
                    error && <div className='alert-danger'>
                        <p>{error}</p>
                    </div>
                }

                <div className="input-group">
                    <input type="text" onChange={handleChange} name='username' value={username} placeholder='Enter you username' />
                </div>
                <div className="input-group">
                    <input type="password" onChange={handleChange} name='password' value={password} placeholder='Your password' />
                </div>
                <p>Already have an account? <Link style={{ color: "royalblue" }} to={"/login"}>Login now</Link></p>
                <button type='submit'>Register Now</button>
            </form>
        </div>
    )
}

export default Register