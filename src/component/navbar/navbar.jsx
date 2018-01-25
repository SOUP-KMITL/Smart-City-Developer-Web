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
    Button,
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
                    <Link to='/'>
                        <NavbarBrand>
                            <img src={logo} width={150} alt='smart-city' />
                        </NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav className='ml-auto text-center' navbar>
                            <NavItem className='menu'>
                                <Link to='/'><NavLink>Home</NavLink></Link>
                            </NavItem>
                            <NavItem className='menu'>
                                <Link to='/tutorial'><NavLink>Tutorial</NavLink></Link>
                            </NavItem>
                            <NavItem className='menu'>
                                <Link to='/market-place'><NavLink>Market Place</NavLink></Link>
                            </NavItem>
                            <NavItem className='menu'>
                                <Link to='/signin'><NavLink>Sign In</NavLink></Link>
                            </NavItem>
                            <NavItem className='menu'>
                                <Link to='/signup' className='link'>
                                    <Button color='warning' className='btn-raised-yellow'>Sign Up</Button>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default MyNavbar;
