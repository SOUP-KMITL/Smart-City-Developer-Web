import React from 'react';
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


export default class AddDataCollection extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            submitResult: undefined,
            queryStrings: [],
            headers: []
        }
        this.addHeaders = this.addHeaders.bind(this);
        this.addQueryString = this.addQueryString.bind(this);
    }

    requestUpload(value) {
        // Assign manual key, value in headers
        const { headers, queryString } = value.endpoint;
        headers.keys.map((key, i) => {
            headers[key] = headers.values[i];
        })
        queryString.keys.map((key, i) => {
            queryString[key] = queryString.values[i];
        })
        delete headers.keys;
        delete queryString.keys;
        delete headers.values;
        delete queryString.values;
        console.log(value);
    }

    addHeaders() {
        this.setState({ headers: this.state.headers.concat(['']) })
    }

    addQueryString() {
        this.setState({ queryStrings: this.state.queryStrings.concat(['']) })
    }


    render() {
        const { loading } = this.state;

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
                                <StyledText type='text' field='type' className='text-input login-input' />

                                <label htmlFor='encryptionLevel'>Encryption level</label>
                                <StyledSelect field="encryptionLevel" options={encryptionLevel} className='text-input-select' />

                                <label htmlFor='example'>Example</label>
                                <StyledText type='text' field='example' className='text-input login-input' />

                                <h3>endpoint</h3>
                                <hr />
                                <label htmlFor="type">Type</label>
                                <StyledText type='text' field='endpoint.type' className='text-input login-input' />

                                <label htmlFor="url">URL</label>
                                <StyledText type='text' field='endpoint.url' className='text-input login-input' />

                                <label htmlFor="url">Headers</label>
                                <Button size='sm' style={{ float: 'right' }} outline color='info' onClick={this.addHeaders}><FaPlus /></Button>
                                {
                                    this.state.headers.map((item, i) => (
                                        <div className='input-row' key={i}>
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <StyledText type='text' field={['endpoint.headers.keys',i]} className='text-input login-input' />
                                            </Col>
                                            <Col md={8} style={{ paddingRight: 0 }}>
                                                <StyledText type='text' field={['endpoint.headers.values',i]} className='text-input login-input' />
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
                                                <StyledText type='text' field={['endpoint.queryString.keys',i]} className='text-input login-input' />
                                            </Col>
                                            <Col md={8} style={{ paddingRight: 0 }}>
                                                <StyledText type='text' field={['endpoint.queryString.values',i]} className='text-input login-input' />
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
