import React from 'react'
import logo from './images/flooop.png'
import {useHistory} from "react-router-dom"

const Navbar = () => {
    const user =  JSON.parse(localStorage.getItem('user'))
    const history = useHistory()
    const logout = () => {
        localStorage.clear()
        return history.push('/login')
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark border-bottom">
            <a className="navbar-brand" href="/home"><img src={logo} alt='img' width='70px' height='70px' /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                {user ? 
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link text-white" href="/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <button className='btn btn-danger btn-sm' onClick={logout} >Logout</button>
                            </li>
                        </ul>
                    </div>
                    :
                    <div>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Signup</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar