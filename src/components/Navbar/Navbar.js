import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
        <nav>
            <div className="React-link-div">
                <img src={logo} className="Nav-logo" alt="logo" />
                <a className="React-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
            </div>
            <div className="Route-links">
                <NavLink exact to="/" activeClassName="selected">Me</NavLink>
                <div className="dropdown">
                    <div className="dropdown-title"><NavLink to="/reports" activeClassName="selected">Reports</NavLink></div>
                    <div className="dropdown-sub">
                        <div className="dropdown-option"><NavLink exact to="/reports/week/1" activeClassName="selected">Week 1</NavLink></div>
                        <div className="dropdown-option"><NavLink exact to="/reports/week/2" activeClassName="selected">Week 2</NavLink></div>
                    </div>
                </div>
            </div>
        </nav>
        );
    }
}

export default Navbar;
