import React from 'react'
import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <div className="logo">
                <NavLink to="/" className="logo">Cloud Notes</NavLink>
            </div>

            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header