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
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';
import { connect } from 'react-redux';
import Blockies from 'react-blockies';

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
        const { userId, userName, thumbnail } = this.props.userData;

        return (
            <div>
                <Navbar fixed='top' color='faded' light expand='md' className='navbar'>
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
                                <a href='https://soup-kmitl.gitbooks.io/smart-city/content/' target='_blank'><NavLink>Tutorial</NavLink></a>
                            </NavItem>
                            <NavItem className='menu'>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Marketplace
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <Link to='/marketplace/datacollection/page/1' className='black'>
                                            <DropdownItem>
                                                Data collections
                                            </DropdownItem>
                                        </Link>
                                        <DropdownItem divider />
                                        <Link to='/marketplace/cityservice/page/1' className='black'>
                                            <DropdownItem>
                                                City services
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
                            <NavItem className='menu'>
                                <Link to='/contact-us'><NavLink>Contact Us</NavLink></Link>
                            </NavItem>
                            {
                                userId===undefined
                                    ? <NavItem className='menu'>
                                        <Link to='/signin'><NavLink>Sign In</NavLink></Link>
                                    </NavItem>
                                    : <NavItem className='menu'>
                                        <UncontrolledDropdown nav inNavbar>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <DropdownToggle nav caret>
                                                    {
                                                        thumbnail==null
                                                            ? <Blockies
                                                                seed={userName}
                                                                size={7}
                                                                scale={3}
                                                                color='#DC90DD'
                                                                bgColor='#F0F0F0'
                                                                spotColor='#77C5D4'
                                                            />
                                                            : <img
                                                                className='img-fluid'
                                                                src={ thumbnail }
                                                                style={{ maxWidth: 20, maxHeight: 20 }}
                                                            />
                                                    }
                                                    <span style={{ marginLeft: '10px', verticalAlign: 'top' }}>{ userName }</span>
                                                </DropdownToggle>
                                            </div>
                                            <DropdownMenu >
                                                <Link to='/profile' className='black'>
                                                    <DropdownItem>
                                                        My Profile
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <Link to='/signout' className='black'>
                                                    <DropdownItem>
                                                        Sign Out
                                                    </DropdownItem>
                                                </Link>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </NavItem>
                            }
                            {
                                userId==undefined &&
                                    <NavItem className='menu'>
                                        <Link to='/signup' className='link'>
                                            <Button color='warning' className='btn-raised-yellow'>Sign Up</Button>
                                        </Link>
                                    </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(state => state)(MyNavbar);
