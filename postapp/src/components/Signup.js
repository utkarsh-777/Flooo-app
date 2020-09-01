import React, { useState } from "react"
import logo from "./images/flooop.png"
import {toast,ToastContainer} from "react-toastify"
import {Link} from "react-router-dom"

const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = () => {
            fetch('http://localhost:5000/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                return toast('User Already Exists!',{type:'warning'})
            }
            return toast('Saved Successfully! Login to continue',{type:'success'})
        })
    }
    

    return(
        <div className='container'>
        <ToastContainer />
            <div className='container text-center'>
                <h1><img src={logo} alt='img' width="40%"  /></h1>
            </div>
            <h1 className='text-center mb-3 text-light'>Signup</h1>
            <input 
            type='text' 
            className='form-control mt-2' 
            name='name' 
            placeholder='Your Name' 
            value={name}
            onChange={e=>setName(e.target.value)}
            />

            <input type='email' 
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

            <button className='btn btn-info btn-block mt-4' onClick={()=>handleSubmit()}>Signup</button>
            <h4 className='text-center mt-4'><Link to='/login'>login</Link><span className='text-white'> or </span><Link to='/signup'>signup</Link></h4>
        </div>
    )
}

export default Signup;