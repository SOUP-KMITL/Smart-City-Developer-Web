import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
    Collapse,
    NavbarToggler,
} from 'reactstrap';
import './navbar.css';
import logo from '../../assets/logo.png';

class MyNavbar extends Component {

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div>
                <Navbar color='faded' light expand='md' className='navbar'>
                    <NavbarBrand><img src={logo} width={150} alt='smart-city' /></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className='ml-auto text-center' navbar>
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
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;
