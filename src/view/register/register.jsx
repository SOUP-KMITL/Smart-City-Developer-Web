import React from 'react';
import { StyledText, Form } from 'react-form';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Button
} from 'reactstrap';

import '../login/login.css';

export default class Register extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        return (
            <div className='fullscreen'>
                <div className='login-background'>
                    <div className='login-overlay'>
                        <Container>
                            <Row>
                                <Col md={7} xs={12}></Col>
                                <Col md={5} xs={12} className='fullscreen form-area'>
                                    <Form onSubmit={submittedValues => this.setState( { submittedValues } )}>
                                        { formApi => (
                                            <form onSubmit={formApi.submitForm} id='form2' className='form-login'>

                                                <label htmlFor="username">Username</label>
                                                <StyledText field='username' id='username' className='text-input login-input' />

                                                <label htmlFor="email">Email</label>
                                                <StyledText field='email' id='email' className='text-input login-input' />

                                                <label htmlFor="password">Password</label>
                                                <StyledText type='password' field='password' id='password'  className='text-input login-input' />

                                                <label htmlFor="password">Retype Password</label>
                                                <StyledText type='password' field='password' id='password'  className='text-input login-input' />

                                                <div className='login-submit'>
                                                    <Button type='submit' size='lg' className='login-btn btn-smooth btn-raised-success' outline>Sign Up</Button>
                                                    <span>Already have an account? <Link to='signin'>Sign In</Link> </span>
                                                </div>
                                            </form>
                                        )}
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
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

