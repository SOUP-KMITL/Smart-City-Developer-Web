import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
} from 'reactstrap';
import './navbar.css';
import logo from '../../assets/logo.png';

class MyNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar color='faded' light expand='md' className='navbar'>
                    <NavbarBrand><img src={logo} width={150} alt='smart-city' /></NavbarBrand>
                    <Nav className='ml-auto' navbar>
                        <NavItem className='menu'>
                            <Link to='/'><NavLink>Home</NavLink></Link>
                        </NavItem>
                        <NavItem className='menu'>
                            <Link to='about'><NavLink>About</NavLink></Link>
                        </NavItem>
                        <NavItem className='menu'>
                            <Link to='contact'><NavLink>Contact Us</NavLink></Link>
                        </NavItem>
                        <NavItem className='menu'>
                            <Link to='market-place'><NavLink>Market Place</NavLink></Link>
                        </NavItem>
                        <NavItem className='menu'>
                            <Link to='about'><NavLink>About Us</NavLink></Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;
