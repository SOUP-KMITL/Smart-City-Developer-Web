import React from 'react';
import { Button } from 'reactstrap';
import './contact.css';

export default class Contact extends React.Component {

    render() {
        return (
            <div className='contact'>
                <div className='bg-contact'>
                    <h4>
                        If you have any questions, please don't hesitate to ask us on:
                        <br /> <br />
                        <strong style={{ textDecoration: 'underline' }}>support@smartcity.kmitl.io</strong>
                    </h4>
                </div>
            </div>
        );
    }
}
