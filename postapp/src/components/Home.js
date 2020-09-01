import React, { useState, useEffect} from "react"
import Navbar from "./Navbar";
import {toast,ToastContainer} from 'react-toastify'
import {useLocation} from "react-router-dom"

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const location = useLocation()
    const [login,setLogin] = useState(location.state ? location.state.mylogin : 'No')

    const [posts,setPosts] = useState([])

    useEffect(()=>{
    if(login==='yes'){
        toast('Login Successful!',{type:'success'})
    }
    fetch('http://localhost:5000/allposts',{
        method:'get',
        headers:{
            "Content-Type":'application/json',
            Authorization:"Bearer "+localStorage.getItem('jwt')
        }
    }).then(res=>res.json())
    .then(result=>{
        setPosts(result)
    }).catch(err=>console.log(err))     
    },[])
    
    return(
        <div>
            <ToastContainer />
            <Navbar />
            {user ? 
                <div>
                    {posts ? 
                        <div>
                            <div className='container mt-5'>
                            {posts.map(post=>{
                                return(
                                    <div key={post._id} className="card bg-transparent text-white p-2 mb-4 border-warning" style={{width: '100%'}}>
                                        {post.image ?
                                            <h1 className='text-center'><img src={post.image} className="card-img-top" style={{width:'100%'}} alt="..." /></h1>
                                            :
                                            <div></div>
                                        }
                                        <div className="card-body">
                                            <h4 className="card-title text-center">{post.title}</h4>
                                            <p className="card-text text-center">{post.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>     
                        :
                        <div><h2 className='mt-4 text-danger'>No Posts to Show!</h2></div>
                    }
                </div>
                :
                <div>
                    <h2 className='text-center text-danger mt-3'>You are Not Authorized!</h2>
                </div>
            }
        </div>
    )
}

export default Home;