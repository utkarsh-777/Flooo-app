import React, { useEffect } from "react"
import {useHistory} from "react-router-dom"
import img1 from "./images/flooop.png"
import {FaGgCircle} from "react-icons/fa"

const Flash = () => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(()=>{
        setTimeout(function(){
            if(user){
                history.push('/Home')
            }else{
                history.push('/login')
            }
        },3000)
    },[history])
   
    return(
        <div className='container'>
            <h1 className='text-center'><img src={img1} style={{width:'100%',height:'auto'}} alt=".." /></h1>
            <h2 className='text-white text-center'>Loading..<div id='loading' className='mt-2'> <FaGgCircle /></div></h2>
        </div>
    )
}

export default Flash;