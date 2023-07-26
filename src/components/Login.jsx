import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../services/userServices';
import { doLogin } from '../services/auth';
import ActiveChatContext from '../context/ActiveChatContext';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate  = useNavigate();

    const handleChange = (e)=>{
        var name = e.target.name;
        var value = e.target.value;

        if(name ==='username'){
            setUsername(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }




    // handle form submit
    const handleLoginForm = (e) => {
        e.preventDefault();
        setError("");

        if (username.trim().length < 1) {
            setError("Insert username")
            return;
        }
        if(password.trim().length < 1){
            setError("Insert password")
            return;
        }


        userLogin(username, password)
            .then((data)=>{
                // console.log(data)
                doLogin(data, ()=>{
                    console.log("Logged In successfull");
                    navigate("/chat-dashboard");
                });
            })
            .catch((err)=>{
                console.log(err)
                if(err.code === "ERR_NETWORK"){
                    setError("PROBLEM!! Contact With Shubrato")
                    return;
                }
                setError(err.response.data.message);                
            })

      
    }

    return (
        <div>
            <form className='form' onSubmit={handleLoginForm}>                
                <h1>Login TalkStar </h1>
                {
                    error && <div className='alert-danger'>
                        <p>{error}</p>
                    </div>
                }

                <div className="input-group">
                    <input type="text" onChange={handleChange} name='username' value={username} placeholder='Enter you username'/>
                </div>
                <div className="input-group">
                    <input type="password" onChange={handleChange} name='password' value={password} placeholder='Your password'/>
                </div>
                <p>Don't have an account? <Link style={{color:"green"}} to={"/register"}>Register a New Account</Link></p>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login