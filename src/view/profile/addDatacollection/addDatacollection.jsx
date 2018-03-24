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
import FaMinus from 'react-icons/lib/fa/minus';
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
        this.deleteColumns = this.deleteColumns.bind(this);
    }

    resolveValue(value) {
        let { endPoint } = value;
        value.encryptionLevel = 0; // Maybe temporary

        delete value.requireColumnsName;
        delete value.requireColumnsType;
        delete value.requireColumnsIndexed;
        delete value.requireColumnsGeoName1;
        delete value.requireColumnsGeoType1;
        delete value.requireColumnsGeoIndexed1;
        delete value.requireColumnsGeoName2;
        delete value.requireColumnsGeoType2;
        delete value.requireColumnsGeoIndexed2;

        if (value.columns != undefined) {
            const colTmp = [];
            // key: name, type, indexed must have equal length and more than 0
            value.columns.name.length > 0
                && value.columns.name.length==value.columns.type.length
                && value.columns.type.length==value.columns.indexed.length
                && value.columns.indexed.length==value.columns.name.length
                && value.columns.name.map((name, i) => {
                    colTmp.push({
                        "name": value.columns.name[i],
                        "type": value.columns.type[i],
                        "indexed": value.columns.indexed[i]
                    });
                });
            value.columns = colTmp;
        }

        if (value.columns == undefined)
            value.columns = [];
        if (value.type === 'timeseries') {
            value['endPoint'] = {'type': 'local'}
            value.columns.push({
                "name": "ts",
                "type": "timestamp",
                "indexed": true
            });
        } else if (value.type === 'geotemporal') {
            value['endPoint'] = {'type': 'local'}
            value.columns.push({
                "name": "lat",
                "type": "double",
                "indexed": true
            }, {
                "name": "lng",
                "type": "double",
                "indexed": true
            });
        } else if (value.type === 'keyvalue') {
            value['endPoint'] = {'type': 'local'}
            delete value.columns;
        } else if (value.type === 'remote') {
            delete value.columns;
            value.endPoint.type = 'remote';
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
        console.log(value);

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
        this.setState({ headers: this.state.headers.concat(['']) });
    }

    addColumns() {
        this.setState({ columns: this.state.columns.concat(['']) });
    }

    deleteColumns(value) {
        // Pop array length
        const array = this.state.columns;
        array.splice(array.length-1, 1);
        this.setState({ columns: array });

        if (value.columns != undefined) {
            // Pop value in columns array
            const { indexed, name, type } = value.columns;
            indexed.splice(indexed.length-1, 1);
            name.splice(name.length-1, 1);
            type.splice(type.length-1, 1);
        }
    }

    addQueryString() {
        this.setState({ queryStrings: this.state.queryStrings.concat(['']) });
    }


    render() {
        const { loading, submitResult } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Create DataCollection</CardTitle>
                    <hr />
                    <Form
                        onSubmit={submittedValues => this.requestUpload(submittedValues)}
                        defaultValues={{
                            requireColumnsName: 'ts',
                            requireColumnsType: 'timestamp',
                            requireColumnsIndexed: true,
                            requireColumnsGeoName1: 'lat',
                            requireColumnsGeoType1: 'double',
                            requireColumnsGeoIndexed1: true,
                            requireColumnsGeoName2: 'lng',
                            requireColumnsGeoType2: 'double',
                            requireColumnsGeoIndexed2: true
                        }}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label htmlFor='collectionName'>Collection name</label>
                                <StyledText type='text' field='collectionName' className='text-input login-input' />

                                <label htmlFor='example'>Description</label>
                                <StyledText type='text' field='description' className='text-input login-input' />

                                {
                                    //<label htmlFor='encryptionLevel'>Encryption level</label>
                                    //<StyledSelect field="encryptionLevel" options={encryptionLevel} className='text-input-select' />
                                }

                                <label htmlFor='example'>Example</label>
                                <StyledText type='text' field='example' className='text-input login-input' />

                                <label htmlFor='category'>Category</label>
                                <StyledSelect field="category" options={category} className='text-input-select' />

                                <label htmlFor='type'>Type</label>
                                <StyledSelect field="type" options={type} className='text-input-select' />

                                <br />

                                {
                                    (formApi.values.type=='timeseries' || formApi.values.type=='geotemporal') &&
                                        <div className='left-right'>
                                            <h3>Columns</h3>
                                            <div>
                                                <Button type='button' size='sm' outline color='info' onClick={this.addColumns}>
                                                    <FaPlus />
                                                </Button>
                                                {
                                                    this.state.columns.length>0 &&
                                                        <Button
                                                            type='button'
                                                            size='sm'
                                                            outline
                                                            color='info'
                                                            onClick={ () => this.deleteColumns(formApi.values) }
                                                            style={{ marginLeft: '5px' }}>
                                                            <FaMinus />
                                                        </Button>
                                                }
                                            </div>
                                        </div>
                                }
                                {
                                    // Show defaultl columns value
                                    formApi.values.type=='timeseries' &&
                                        <div class="input-row">
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor="columns.name">Name</label>
                                                <StyledText type='text' field='requireColumnsName' className='text-input login-input' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.type'>Type</label>
                                                <StyledSelect field='requireColumnsType' options={columnsType} className='text-input-select' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.indexed'>Indexed</label>
                                                <StyledSelect field='requireColumnsIndexed' options={boolean} className='text-input-select' disabled />
                                            </Col>
                                        </div>
                                }
                                {
                                    // Show defaultl columns value of geotemporal
                                    formApi.values.type=='geotemporal' &&
                                        <div class="input-row">
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor="columns.name">Name</label>
                                                <StyledText type='text' field='requireColumnsGeoName1' className='text-input login-input' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.type'>Type</label>
                                                <StyledSelect field='requireColumnsGeoType1' options={columnsType} className='text-input-select' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.indexed'>Indexed</label>
                                                <StyledSelect field='requireColumnsGeoIndexed1' options={boolean} className='text-input-select' disabled />
                                            </Col>
                                        </div>
                                }
                                {
                                    formApi.values.type=='geotemporal' &&
                                        <div class="input-row">
                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor="columns.name">Name</label>
                                                <StyledText type='text' field='requireColumnsGeoName2' className='text-input login-input' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.type'>Type</label>
                                                <StyledSelect field='requireColumnsGeoType2' options={columnsType} className='text-input-select' disabled />
                                            </Col>

                                            <Col md={4} style={{ paddingLeft: 0 }}>
                                                <label htmlFor='columns.indexed'>Indexed</label>
                                                <StyledSelect field='requireColumnsGeoIndexed2' options={boolean} className='text-input-select' disabled />
                                            </Col>
                                        </div>
                                }
                                {
                                    (formApi.values.type=='geotemporal' || formApi.values.type=='timeseries')
                                        && this.state.columns.map((item, i) => (
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

                                {
                                    formApi.values.type === 'remote' &&
                                        <div>
                                            <h3>endPoint</h3>
                                            <hr />

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

                                        </div>
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
];

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
    },
    {
        label: 'Remote',
        value: 'remote'
    }
];

const endpointType = [
    {
        label: 'Local',
        value: 'local'
    },
    {
        label: 'Remote',
        value: 'remote'
    }
];

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
];

const boolean = [
    {
        label: 'True',
        value: true
    },
    {
        label: 'False',
        value: false
    }
];

const category = [
    {
        label: 'Smart environment',
        value: 'smart environment'
    },
    {
        label: 'Smart utility',
        value: 'smart utility'
    },
    {
        label: 'Smart economy',
        value: 'smart economy'
    },
    {
        label: 'Smart living',
        value: 'smart living'
    },
    {
        label: 'Smart mobility',
        value: 'smart mobility'
    },
    {
        label: 'Other',
        value: 'other'
    }
];
