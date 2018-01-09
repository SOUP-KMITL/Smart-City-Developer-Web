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
            <div style={{ marginTop: 100 }}>
                <Navbar color="faded" light expand="md" className='menubar'>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='text-default'>© { this.getCurrentYear() } Smart City Innohub, all rights reserved. </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Footer;
