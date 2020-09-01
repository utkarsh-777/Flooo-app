import React,{useState} from "react"
import logo from "./images/flooop.png"
import {toast,ToastContainer} from 'react-toastify'
import { useHistory,Link } from "react-router-dom"

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory()

    const handleSubmit = () => {
        fetch('http://localhost:5000/login',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
            password
        })
    }).then(res=>res.json())
    .then(result=>{
        if(result.error){
            return toast(result.error,{type:'warning'})
        }
        if(result.message){
            return toast(result.message,{type:'warning'})
        }
        toast('Login Successful!',{type:'success'})
        localStorage.setItem('user',JSON.stringify(result.user))
        localStorage.setItem('jwt',result.token)
        return history.push('/home',{mylogin:'yes'})
    })
}

    return(
        <div className='container'>
            <ToastContainer />
            <div className='container text-center'>
                <h1><img src={logo} alt='img' width="40%" /></h1>
            </div>
            <h1 className='text-center mb-3 text-light'>Login</h1>
            <input 
            type='email' 
            className='form-control mt-2' 
            name='email'
            placeholder='Email' 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />

            <input 
            type='password' 
            className='form-control mt-2' 
            name='Password' 
            placeholder='Password' 
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />

            <button className='btn btn-info btn-block mt-4' onClick={()=>handleSubmit()}>Login</button>
            <h4 className='text-center mt-4'><Link to='/login'>login</Link><span className='text-white'> or </span><Link to='/signup'>signup</Link></h4>
        </div>
    )
}

export default Login;