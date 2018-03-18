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
import axios from 'axios';

import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';

import api from '../../../constance/api.js';


class EditCityService extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            submitResult: undefined,
            thumbnail: null,
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
        axios.get(api.cityService + '/' + serviceId)
            .then(({ data }) => {
                this.setState({ cityService: data });
            })
            .catch(({ response }) => {
                console.log(response);
            });
    }

    codeTobase64 = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64Tmp = reader.result;
            // Substr, use only token after ','
            const base64File = base64Tmp.substr( base64Tmp.indexOf(',') + 1, base64Tmp.length );
            this.setState({ code: base64File });
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(file);
    }

    imgTobase64 = e => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64File = reader.result;
            this.setState({ thumbnail: base64File });
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsDataURL(e);
    }

    onDrop = acceptedFiles => {
        this.imgTobase64(acceptedFiles[0]);
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

        if (value.videoLink != undefined)
            value.videoLink = value.videoLink.split('https://youtu.be/')[1];

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

        axios.put(api.cityService + '/' + serviceId + '/thumbnail', formData, {
            headers: {
                'Authorization': this.props.userData.accessToken,
            },
        })
            .then(({ data }) => {
                this.props.notify('UPDATE THUMBNAIL SUCCESS', 'success');
            })
            .catch(({ response }) => {
                this.props.notify('UPDATE THUMBNAIL UNSUCCESS', 'error');
            });
    }

    updateCityservice = (value) => {
        const { serviceId } = this.props.match.params;
        this.setState({ thumbnail: null }); // Not upload thumbnail in resolveData
        value = this.resolveData(value);

        axios.patch(api.cityService + '/' + serviceId, JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.userData.accessToken
            },
        })
            .then(({ data }) => {
                this.setState({ cityService: data });
                this.props.notify('UPDATE SUCCESSFULLY', 'success');
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000);
            })
            .catch(({ response }) => {
                this.props.notify('UPDATE UNSUCCESSFULLY', 'error');
            });
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

                                <label htmlFor='videoLink'>
                                    { 'Video link '}
                                    <small>Shorten link of youtube video Ex. https://youtu.be/rjzsUijnWTO</small>
                                </label>
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
