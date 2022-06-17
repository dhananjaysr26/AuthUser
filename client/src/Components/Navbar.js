import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import '../Assets/Styles/Navbar.css';
import myContext from '../Context/useContext';
function Navbar() {
    let navigate = useNavigate();
    const [menuClicked, setmenuClicked] = useState(1);
    const context = useContext(myContext);
    const logout = () => {
        axios.post("http://localhost:5000/logout").then(res => {
            if (res.data) {
                window.location.href = "/"
            }
        })
    }
    return (
        <nav className="navBar">
            <label className="logo"><label className="logo-half">MY</label>Notes</label>
            <ul className={menuClicked ? "nav__links" : "nav__links active"} >
                <li onClick={() => setmenuClicked(1)}><Link to="/">Home</Link></li>
                <li onClick={() => setmenuClicked(1)}><Link to="/profile">Profile</Link></li>
                {context.id ? <li onClick={() => setmenuClicked(1)}><button onClick={logout}>Logout</button></li> : <li onClick={() => setmenuClicked(1)}><button onClick={() => navigate("/login")}>Login</button></li>}
            </ul>
            <div id="menuIcon" onClick={() => { if (menuClicked) { setmenuClicked(0) } else { setmenuClicked(1) } }}>{menuClicked ? <FaBars /> : <FaTimes />}</div>
        </nav>
    )
}

export default Navbar