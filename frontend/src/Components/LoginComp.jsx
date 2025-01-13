import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from 'axios'
const LoginComp = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        console.log(username,password);
        axios.post('http://localhost:8000/api/auth/login',{
            "username": username,
            "password": password
        },{withCredentials: true}).then(res => {
            console.log(res.data)
            if(!res.data.message){
                localStorage.setItem("user",JSON.stringify(res.data));
                navigate('/');
            }else{
                setError(true);
            }
        })
    }
    return(
        <div className="container d-flex flex-column justify-content-between " style={{height:'100vh'}} >
            <Navbar />
            <div className="container-fluid mt-5 d-flex justify-content-center flex-column gap-4 align-items-center">
                <div className="h2">Sing in </div>
                <div className="container d-flex flex-column gap-3 w-50">
                    <input className="form-control" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    <input className="form-control" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    {error ? <div className="alert alert-danger d-flex justify-content-center">No user found !</div> : null}
                    <div className="btn btn-success" onClick={(e)=>{handleSubmit()}}>Log in</div>
                    <Link to="/register"><p className="text-start"><u>You don't you have an account?</u></p></Link>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default LoginComp