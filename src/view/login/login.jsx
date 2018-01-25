import React from 'react';
import { StyledText, Form } from 'react-form';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Button
} from 'reactstrap';
import ReactLoading from 'react-loading';

import api from '../../constance/api.js';
import './login.css';
import Storage from '../share/authorization/storage.jsx';

export default class Login extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            loginResult: undefined,
        }
    }

    requestLogin(value) {
        this.setState({ loading: true })

        fetch(api.signin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value)
        }).then((response) => response.json()).then(
            res => {
                this.setState({ loginResult: false })
                if (res.success != false) {
                    Storage.saveUserData(res);
                    getUserData(value)
                }
                // Redirect
            },
            err => {
                this.setState({ loginResult: false })
                console.log('CANNOT SIGN IN');
            },
        ).finally(() => {
            setTimeout(() => {
                this.setState({ loading: false })
            }, 1000);
        })
    }

    render() {
    const { loading, loginResult } = this.state;
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
                                                    <Button
                                                        type='submit'
                                                        size='lg'
                                                        className='login-btn btn-smooth btn-raised-success pointer'
                                                        outline
                                                        disabled={loading}
                                                    >
                                                        <ReactLoading
                                                            type='bars'
                                                            height='30px'
                                                            width='30px'
                                                            className={(loading!==true? 'hidden': 'margin-auto ')} />
                                                        { loading!=true ? 'Sign In': '' }
                                                    </Button>
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


const getUserData = (value) => {
    const { username, password } = value;
    const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

    fetch(api.getSignin, {
        method: 'GET',
        headers: {
            'Authorization': auth
        },
    }).then(response => response.json()).then(
        res => {
            Storage.saveAccessData(res);
        },
        err => {
            console.log('CANNOT GET USER DATA');
        }
    )
}