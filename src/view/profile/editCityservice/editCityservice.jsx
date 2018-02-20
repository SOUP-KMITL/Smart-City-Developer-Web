import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
} from 'reactstrap';
import { StyledText, Form, Radio, RadioGroup, StyledSelect, NestedForm, Select } from 'react-form';
import ReactLoading from 'react-loading';
import Dropzone from 'react-dropzone';

import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';

import api from '../../../constance/api.js';


class EditCityService extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            submitResult: undefined,
            thumbnail: undefined,
            cityService: undefined,
            swagger: undefined,
            code: undefined,
        }
        this.swaggerTobase64 = this.swaggerTobase64.bind(this);
        this.codeTobase64 = this.codeTobase64.bind(this);
    }

    componentDidMount() {
        this.requestCityService(this.props.match.params);
    }

    requestCityService({ serviceId }) {
        fetch(api.cityService + '/' + serviceId, {
            method: 'GET',
        }).then(response => response.json()).then(
            res => {
                this.setState({ cityService: res });
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }

    codeTobase64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64File = reader.result;
            this.setState({ code: base64File });
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file);
    }

    onDrop = acceptedFiles => {
        this.uploadThumbnail(acceptedFiles[0]);
    }

    swaggerTobase64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64File = reader.result;
            this.setState({ swagger: base64File });
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file);
    }

    resolveData(value) {
        if (value.sampleData != undefined) {
            value.sampleData = JSON.parse(value.sampleData);
            //if (typeof value.sampleData === Object)
            // Validate error of object invalid
        }

        if (this.state.code == undefined)
            value.kind = undefined;

        if (this.state.swagger != undefined)
            value.swagger = this.state.swagger;

        if (this.state.code != undefined && this.state.code != '')
            value.code = this.state.code;

        if (this.state.thumbnail != undefined) {
            value.thumbnail = this.state.thumbnail;
            this.uploadThumbnail(this.state.thumbnail);
        }

        return value;
    }

    uploadThumbnail(thumbnail) {
        const { serviceId } = this.props.match.params;
        const formData = new FormData();
        formData.append('file', thumbnail);

        fetch(api.cityService + '/' + serviceId + '/thumbnail', {
            method: 'PUT',
            headers: {
                'Authorization': this.props.userData.accessToken,
            },
            body: formData
        }).then(response => response.json()).then(
            res => {
                this.props.notify('UPDATE THUMBNAIL SUCCESSFULLY', 'success');
            },
            err => {
                console.log('CANNOT GET DATA');
                this.props.notify('UPDATE THUMBNAIL UNSUCCESSFULLY', 'error');
            }
        )
    }

    updateCityservice = (value) => {
        const { serviceId } = this.props.match.params;
        value = this.resolveData(value);
        console.log(value);

        fetch(api.cityService + '/' + serviceId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        }).then(response => response.json()).then(
            res => {
                this.setState({ cityService: res });
                this.props.notify('UPDATE SUCCESSFULLY', 'success');
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000)
            },
            err => {
                console.log('CANNOT GET DATA');
                this.props.notify('UPDATE UNSUCCESSFULLY', 'error');
            }
        )
    }

    render() {
        const { loading, submitResult, cityService, thumbnail } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Update CityService: { cityService!=undefined && cityService.serviceName }</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.updateCityservice(submittedValues)}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label>Thumbnail</label>
                                <Dropzone onDrop={this.onDrop.bind(this)} className='dropzone pointer' accept='image/*' >
                                    {
                                        thumbnail!=null
                                            ? <div className='dropzone-thumbnail'>
                                                <div className='dropzone-overlay'>
                                                    <img src={thumbnail} className='dropzone-img' />
                                                </div>
                                            </div>
                                            : <div className='dropzone-description'>
                                                <FaCloudUpload className='dropzone-icon' />
                                                <p>Drop image</p>
                                                <p>or</p>
                                                <p>Click to upload</p>
                                            </div>
                                    }
                                </Dropzone>

                                <label htmlFor='endpoint'>Endpoint <small>*empty for local or URL for remote</small></label>
                                <StyledText type='text' field='endpoint' className='text-input login-input' />

                                <label htmlFor='sampleData'>Sample data</label>
                                <StyledText type='text' field='sampleData' className='text-input login-input' />

                                <label htmlFor='description'>Description</label>
                                <StyledText type='text' field='description' className='text-input login-input' />

                                <label htmlFor='appLink'>App link <small>URL to sample application link</small></label>
                                <StyledText type='text' field='appLink' className='text-input login-input' />

                                <label htmlFor='videoLink'>Video link <small>URL to sample video link</small></label>
                                <StyledText type='text' field='videoLink' className='text-input login-input' />

                                <label htmlFor='swagger'>Swagger</label>
                                <input type='file' accept='.yaml' onChange={this.swaggerTobase64} className='text-input login-input' />

                                <label htmlFor='code'>Source code</label>
                                <input type='file' onChange={this.codeTobase64} className='text-input login-input' />

                                {
                                    this.state.code != undefined
                                        && <div>
                                            <label htmlFor='kind'>Kind</label>
                                            <Select field="kind" options={selectKind} className='text-input login-input' />
                                        </div>
                                }

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

export default connect(state => state)(EditCityService);


const selectKind = [
    {
        label: 'nodejs',
        value: 'nodejs'
    },
    {
        label: 'nodejs:6',
        value: 'nodejs:6'
    },
    {
        label: 'python',
        value: 'python'
    },
    {
        label: 'python:3',
        value: 'python:3'
    }
];
