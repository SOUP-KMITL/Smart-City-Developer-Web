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
import './login.css';

export default class Login extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    requestLogin(value) {
        fetch(api.signin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: value
        }).then((response) => response.json()).then(
            (res) => {
                alert( JSON.stringify(res))
                console.log(res);
            },
            (err) => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <div>
                <div className='login-background'>
                    <div className='login-overlay'>
                        <Container style={{ height: window.innerHeight-140 }}>
                            <Row>
                                <Col md={7} xs={12}></Col>
                                <Col md={5} xs={12} className='form-area'>
                                    <Form onSubmit={submittedValues => this.requestLogin(submittedValues)}>
                                        { formApi => (
                                            <form onSubmit={formApi.submitForm} id='form2' className='form-login'>

                                                <label htmlFor="username">Username</label>
                                                <StyledText field='username' id='username' className='text-input login-input' />

                                                <label htmlFor="password">Password</label>
                                                <StyledText type='password' field='password' id='lastName'  className='text-input login-input' />

                                                <div className='login-submit'>
                                                    <Button type='submit' size='lg' className='login-btn btn-smooth btn-raised-success' outline>Sign In</Button>
                                                    <span>Not have an account? <Link to='signup'>Sign Up</Link> </span>
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
