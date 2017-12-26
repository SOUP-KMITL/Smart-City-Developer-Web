import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
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
                    <div>
                        <img src={logo} className='logo' />
                    </div>
                    <div>
                        <Link to='/'><strong>Sign Up</strong></Link>
                        <span>  or  </span>
                        <Link to='/'><strong>Sign In</strong></Link>
                    </div>
                </div>
                <Navbar color="faded" light expand="md" className='menubar'>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="" className='text-default'>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="" className='text-default'>Contact Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="" className='text-default'>Market Place</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;
