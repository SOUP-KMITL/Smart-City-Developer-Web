import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { StyledText, Form } from 'react-form';
import ReactLoading from 'react-loading';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';

import './edit-profile.css';

class EditProfile extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            loginResult: undefined,
        }
    }

    requestUpdateProfile(value) {
        this.setState({ loading: true })
        console.log(value);
    }


    render() {
        const { loading } = this.state;
        const { firstName, lastName } = this.props.userData;
        const formValue = {
            firstName: firstName,
            lastName: lastName
        }

        return (
            <Card>
                <CardBody>
                    <CardTitle>Update Profile</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.requestUpdateProfile(submittedValues)} defaultValues={formValue}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label htmlFor="firstName">Firstname</label>
                                <StyledText field='firstName' className='text-input login-input' />

                                <label htmlFor="lastName">Lastname</label>
                                <StyledText type='lastName' field='lastName' className='text-input login-input' />

                                <label htmlFor="password">Password</label>
                                <StyledText type='password' field='password' className='text-input login-input' />

                                <label htmlFor="repassword">Repassword</label>
                                <StyledText type='repassword' field='repassword' className='text-input login-input' />

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
                                        { loading!=true ? 'Update': '' }
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default connect(state => state)(EditProfile);
