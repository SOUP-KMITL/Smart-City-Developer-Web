import React from 'react';
import { StyledText, Form } from 'react-form';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Button
} from 'reactstrap';

import api from '../../constance/api.js';
import '../login/login.css';

export default class Register extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    requestRegister(value) {
        fetch(api.users, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }).then(response => response.text()).then(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <div className='fullscreen'>
                <div className='login-background' >
                    <div className='login-overlay'>
                        <div className='form-area' style={{ height: '100vh', paddingBottom: '150px' }}>
                            <Form onSubmit={submittedValues => this.requestRegister(submittedValues)}>
                                { formApi => (
                                    <form onSubmit={formApi.submitForm} id='form2' className='form-login'>

                                        <label htmlFor="firstname">Firstname</label>
                                        <StyledText field='fistName' className='text-input login-input' />

                                        <label htmlFor="lastname">Lastname</label>
                                        <StyledText field='lastName' className='text-input login-input' />

                                        <label htmlFor="username">Username</label>
                                        <StyledText field='userName' className='text-input login-input' />

                                        <label htmlFor="email">Email</label>
                                        <StyledText field='email' id='email' className='text-input login-input' />

                                        <label htmlFor="password">Password</label>
                                        <StyledText type='password' field='password' id='password'  className='text-input login-input' />

                                        <label htmlFor="repassword">Retype Password</label>
                                        <StyledText type='password' field='repassword' id='repassword'  className='text-input login-input' />

                                        <div className='login-submit'>
                                            <Button type='submit' size='lg' className='login-btn btn-smooth btn-raised-success' outline>Sign Up</Button>
                                            <span>Already have an account? <Link to='signin'>Sign In</Link> </span>
                                        </div>
                                    </form>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


const statusOptions = [
    {
        label: 'Single',
        value: 'single'
    },
    {
        label: 'In a Relationship',
        value: 'relationship'
    },
    {
        label: "It's Complicated",
        value: 'complicated'
    }
];

