import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
} from 'reactstrap';
import { StyledText, Form, Radio, RadioGroup, StyledSelect, NestedForm } from 'react-form';
import ReactLoading from 'react-loading';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FaPlus from 'react-icons/lib/fa/plus';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';

import api from '../../../constance/api.js';
import './addCityservice.css';


class AddCityService extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            submitResult: undefined,
        }
    }

/*
 *    onDrop = acceptedFiles => {
 *        acceptedFiles.map(file => {
 *            const reader = new FileReader();
 *            reader.onload = () => {
 *                const base64Image = reader.result;
 *                this.setState({ thumbnail: base64Image });
 *            };
 *            reader.onabort = () => console.log('file reading was aborted');
 *            reader.onerror = () => console.log('file reading has failed');
 *
 *            reader.readAsDataURL(file);
 *        });
 *    }
 */


    requestUpload(value) {
        this.setState({ loading: true });
        //value["thumbnail"] = this.state.thumbnail;

        axios.post(api.cityService, JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.userData.accessToken
            },
        }).then(
            res => {
                this.setState({ submitResult: true });
                this.props.notify('CREATE SUCCESS', 'success');
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000);
            })
            .catch(({ response }) => {
                if (response.status === 409)
                    this.props.notify('This service name is already taken', 'error');
                else
                    this.props.notify('CREATE UNSUCCESS', 'error');
            })
            .finally(() => {
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 1000)
            });
    }


    render() {
        const { loading, submitResult } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Create CityService</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.requestUpload(submittedValues)}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                {
                                    /*
                                     *<label>Thumbnail</label>
                                     *<Dropzone onDrop={this.onDrop.bind(this)} className='dropzone pointer' accept='image/*' >
                                     *    {
                                     *        thumbnail!=null
                                     *            ? <div className='dropzone-thumbnail'>
                                     *                <div className='dropzone-overlay'>
                                     *                    <img src={thumbnail} className='dropzone-img' />
                                     *                </div>
                                     *            </div>
                                     *            : <div className='dropzone-description'>
                                     *                <FaCloudUpload className='dropzone-icon' />
                                     *                <p>Drop image</p>
                                     *                <p>or</p>
                                     *                <p>Click to upload</p>
                                     *            </div>
                                     *    }
                                     *</Dropzone>
                                     */
                                }

                                <label htmlFor='serviceName'>Service name</label>
                                <StyledText type='text' field='serviceName' className='text-input login-input' />

                                <label htmlFor='description'>description</label>
                                <StyledText type='text' field='description' className='text-input login-input' />

                                <br />


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
                                        { loading!=true ? 'Create': '' }
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

export default connect(state => state)(AddCityService);

const encryptionLevel = [
    {
        label: 'Low encryption',
        value: 0
    },
    {
        label: 'Middle encryption',
        value: 1
    },
    {
        label: 'High encryption',
        value: 2
    },
]
