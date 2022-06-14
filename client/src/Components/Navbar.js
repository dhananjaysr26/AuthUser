import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../Assets/Styles/Navbar.css';
import myContext from '../Context/useContext';
function Navbar() {
    let navigate = useNavigate();
    const context = useContext(myContext);
    const logout = () => {
        axios.post("/logout").then(res => {
            if (res.data) {
                window.location.href = "/"
            }
        })
    }
    return (
        <nav className="navBar">
            <label className="logo"><label className="logo-half">User</label>Auth</label>
            <ul className='nav__links'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {context.id ? <li><button onClick={logout}>Logout</button></li> : <li><button onClick={() => navigate("/login")}>Login</button></li>}
            </ul>
        </nav>
    )
}

export default Navbar