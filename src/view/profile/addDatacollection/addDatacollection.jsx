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
import FaPlus from 'react-icons/lib/fa/plus';
import axios from 'axios';

import api from '../../../constance/api.js';


class AddDataCollection extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            submitResult: undefined,
            queryStrings: [],
            headers: [],
            columns: [],
        }
        this.addHeaders = this.addHeaders.bind(this);
        this.addQueryString = this.addQueryString.bind(this);
        this.addColumns = this.addColumns.bind(this);
    }

    resolveValue(value) {
        // Assign manual key, value in headers
        const { columns, endPoint } = value;

        if (value.type === 'timeseries') {
            value.columns = [{
                "name": "ts",
                "type": "timestamp",
                "indexed": true
            }];
        } else if (value.type === 'geotemporal') {
            value.columns = [{
                "name": "lat",
                "type": "double",
                "indexed": true
            }, {
                "name": "lng",
                "type": "double",
                "indexed": true
            }];
        }

        if (columns != undefined) {
            columns.name!=undefined && columns.type!=undefined && columns.indexed!=undefined &&
                columns.name.map((name, i) => {
                    columns.push({
                        "name": columns.name[i],
                        "type": columns.type[i],
                        "indexed": columns.indexed[i]
                    });
                })
        }

        if (endPoint != undefined && endPoint.headers != undefined) {
            endPoint.headers.keys.map((key, i) => {
                endPoint.headers[key] = endPoint.headers.values[i];
            })
            delete endPoint.headers.keys;
            delete endPoint.headers.values;
        }

        if (endPoint != undefined && endPoint.queryString != undefined) {
            endPoint.queryString.keys.map((key, i) => {
                endPoint.queryString[key] = endPoint.queryString.values[i];
            })
            delete endPoint.queryString.keys;
            delete endPoint.queryString.values;
        }

        try {
            value.example = JSON.parse( value.example );
        } catch(err) {
            this.props.notify('Example object format is invalid', 'error');
            this.setState({ loading: false });
            return null;
        }

        try {
            value.isOpen = JSON.parse( value.isOpen);
        } catch(err) {
            this.props.notify('Please check Public or Private field', 'error');
            this.setState({ loading: false });
            return null;
        }

        return value;
    }

    requestUpload(val) {
        this.setState({ loading: true });
        let value = this.resolveValue(val);

        if (value != null) {

            axios.post(api.dataCollection, JSON.stringify(value), {
                headers: {
                    'Authorization': this.props.userData.accessToken,
                    'Content-Type': 'application/json'
                }
            })
                .then(({ data }) => {
                    this.setState({ submitResult: true })
                    this.props.notify('CREATE SUCCESS', 'success');
                    setTimeout(() => {
                        this.props.history.goBack();
                    }, 1000);
                })
                .catch(({ response }) => {
                    if (response.status === 409)
                        this.props.notify('This collection name is already been taken', 'error');
                    else
                        this.props.notify('CREATE UNSUCCESS', 'error');
                })
                .finally(() => {
                    setTimeout(() => {
                        this.setState({ loading: false });
                    }, 1000)
                })
        }
    }

    addHeaders() {
        this.setState({ headers: this.state.headers.concat(['']) })
    }

    addColumns() {
        this.setState({ columns: this.state.columns.concat(['']) })
    }

    addQueryString() {
        this.setState({ queryStrings: this.state.queryStrings.concat(['']) })
    }


    render() {
        const { loading, submitResult } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Create DataCollection</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.requestUpload(submittedValues)}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label htmlFor='collectionName'>Collection name</label>
                                <StyledText type='text' field='collectionName' className='text-input login-input' />

                                <label htmlFor='type'>Type</label>
                                <StyledSelect field="type" options={type} className='text-input-select' />

                                <label htmlFor='encryptionLevel'>Encryption level</label>
                                <StyledSelect field="encryptionLevel" options={encryptionLevel} className='text-input-select' />

                                <label htmlFor='example'>Example</label>
                                <StyledText type='text' field='example' className='text-input login-input' />

                                <label htmlFor='example'>Category</label>
                                <StyledText type='text' field='category' className='text-input login-input' />

                                <br />
                                <div className='left-right'>
                                    <h3>Columns</h3>
                                    <Button type='button' size='sm' outline color='info' onClick={this.addColumns}>
                                        <FaPlus />
                                    </Button>
                                </div>
                                <hr />
                                {
                                    this.state.columns.map((item, i) => (
                                        <div class="input-row" key={i}>
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor="columns.name">Name</label>
                                                <StyledText type='text' field={['columns.name', i]} className='text-input login-input' />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.type'>Type</label>
                                                <StyledSelect field={['columns.type', i]} options={columnsType} className='text-input-select' />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.indexed'>Indexed</label>
                                                <StyledSelect field={['columns.indexed', i]} options={boolean} className='text-input-select' />
                                            </Col>
                                        </div>
                                    ))
                                }

                                <br />
                                <h3>endPoint</h3>
                                <hr />
                                <label htmlFor="type">Type</label>
                                <StyledSelect field="endPoint.type" options={endpointType} className='text-input-select' />

                                <label htmlFor="url">URL</label>
                                <StyledText type='text' field='endPoint.url' className='text-input login-input' />

                                <label htmlFor="url">Headers</label>
                                <Button size='sm' style={{ float: 'right' }} outline color='info' onClick={this.addHeaders}>
                                    <FaPlus />
                                </Button>
                                {
                                    this.state.headers.map((item, i) => (
                                        <div className='input-row' key={i}>
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <StyledText type='text' field={['endPoint.headers.keys',i]} className='text-input login-input' />
                                            </Col>
                                            <Col md={8} style={{ paddingRight: 0 }}>
                                                <StyledText type='text' field={['endPoint.headers.values',i]} className='text-input login-input' />
                                            </Col>
                                        </div>
                                    ))
                                }

                                <br />

                                <label htmlFor="url">Parameters</label>
                                <Button size='sm' style={{ float: 'right' }} outline color='info' onClick={this.addQueryString}><FaPlus /></Button>
                                {
                                    this.state.queryStrings.map((item, i) => (
                                        <div className='input-row' key={i}>
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <StyledText type='text' field={['endPoint.queryString.keys',i]} className='text-input login-input' />
                                            </Col>
                                            <Col md={8} style={{ paddingRight: 0 }}>
                                                <StyledText type='text' field={['endPoint.queryString.values',i]} className='text-input login-input' />
                                            </Col>
                                        </div>
                                    ))
                                }

                                <RadioGroup field="isOpen">
                                    { group => (
                                        <div>
                                            <label htmlFor="public" className="mr-2">Public</label>
                                            <Radio group={group} value="true" className="mr-3 d-inline-block" />
                                            <label htmlFor="private" className="mr-2">Private</label>
                                            <Radio group={group} value="false" className="d-inline-block" />
                                        </div>
                                    )}
                                </RadioGroup>

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

export default connect(state => state)(AddDataCollection);

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
    }
]

const type = [
    {
        label: 'Timeseries',
        value: 'timeseries'
    },
    {
        label: 'Geotemporal',
        value: 'geotemporal'
    },
    {
        label: 'Keyvalue',
        value: 'keyvalue'
    }
]

const endpointType = [
    {
        label: 'Local',
        value: 'local'
    },
    {
        label: 'Remote',
        value: 'remote'
    }
]

const columnsType = [
    {
        label: 'Varchar',
        value: 'varchar'
    },
    {
        label: 'Int',
        value: 'int'
    },
    {
        label: 'BigInt',
        value: 'bigint'
    },
    {
        label: 'Double',
        value: 'double'
    },
    {
        label: 'Text',
        value: 'text'
    },
    {
        label: 'Timestamp',
        value: 'timestamp'
    }
]

const boolean = [
    {
        label: 'True',
        value: true
    },
    {
        label: 'False',
        value: false
    }
]

const test = {
    "collectionName": "kjsdfo",
    "endPoint": {
        "type": "local",
        "url": "http://url.com",
        /*
         *"headers": {
         *    "content-type": "application/json",
         *    "accept": "application/json"
         *},
         *"queryString": {
         *    "param": "value"
         *},
         */
    },
    "columns": [
        "name": "ts",
        "type": "timeseries",
        "indexed": true
    ],
    "type": "timeseries",
    "encryptionLevel": 0,
    "example": {},
    "isOpen": true
}
