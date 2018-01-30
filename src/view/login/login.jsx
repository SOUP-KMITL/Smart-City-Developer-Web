import React from 'react';
import { connect } from 'react-redux';
import { StyledText, Form } from 'react-form';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Button
} from 'reactstrap';
import ReactLoading from 'react-loading';
import { Redirect, withRouter } from 'react-router-dom';

import api from '../../constance/api.js';
import './login.css';
import Storage from '../share/authorization/storage.jsx';

class Login extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            loginResult: undefined,
        }
    }

    requestLogin(value) {
        this.setState({ loading: true })

        const auth = 'Basic ' + new Buffer(value.username + ':' + value.password).toString('base64');

        fetch(api.signin, {
            method: 'GET',
            headers: {
                'Authorization': auth
            }
        }).then(response => response.json()).then(
            res => {
                this.setState({ loginResult: true })
                if (res.success != false) {
                    Storage.saveUserData(res);
                    this.props.updateUserData(res);
                }
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
        const { loading } = this.state;
        const { userId } = this.props.userData;

        if (userId!==undefined)
            return <Redirect to='/profile' />;
        else
            return (
                <div className='fullscreen'>
                    <div className='login-background'>
                        <div className='login-overlay'>
                            <div className='form-area'>
                                <Form onSubmit={submittedValues => this.requestLogin(submittedValues)}>
                                    { formApi => (
                                        <form onSubmit={formApi.submitForm} className='form-login'>

                                            <label htmlFor="username">Username</label>
                                            <StyledText field='username' className='text-input login-input' />

                                            <label htmlFor="password">Password</label>
                                            <StyledText type='password' field='password' className='text-input login-input' />

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
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (data) => {
            dispatch({
                type: 'UPDATE',
                payload: data
            })
        }
    }
}

export default connect(state => state, mapDispatchToProps)(Login);
