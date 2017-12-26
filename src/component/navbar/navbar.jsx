import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import './navbar.css';
import logo from '../../assets/logo.png';

class MyNavbar extends Component {
    render() {
        return (
            <div>
                <div className='header'>
                    <Link to='/' >
                        <img src={logo} className='logo' alt='Smart City' />
                    </Link>
                    <div>
                        <Link to='/'><strong>Sign Up</strong></Link>
                        <span>  or  </span>
                        <Link to='/'><strong>Sign In</strong></Link>
                    </div>
                </div>
                <Navbar color="faded" light expand="md" className='menubar'>
                    <Nav navbar>
                        <NavItem>
                            <Link to='about'><NavLink className='text-default'>About</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='contact'><NavLink href='contact' className='text-default'>Contact Us</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='market-place'><NavLink href='market-place' className='text-default'>Market Place</NavLink></Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;
