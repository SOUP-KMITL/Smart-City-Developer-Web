import React, { Component } from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import './footer.css';

class Footer extends Component {

    getCurrentYear() {
        const date = new Date();
        return date.getFullYear();
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md" className='menubar'>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='text-default'>© { this.getCurrentYear() } Smart City Innohub, all rights reserved. </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='text-default'>About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='text-default'>Contact Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='text-default'>Help</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='text-default'>FAQ</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Footer;
