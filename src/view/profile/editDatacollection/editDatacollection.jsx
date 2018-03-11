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
import axios from 'axios';

import api from '../../../constance/api.js';


class EditDataCollection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            submitResult: undefined,
            dataCollection: undefined,
        }
        this.requestDatacollection(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData != undefined)
            this.requestDatacollection(props);
    }

    requestDatacollection(props) {
        const { collectionId } = this.props.match.params;

        axios.get(api.dataCollection + collectionId + '/meta', {
            headers: {
                'Authorization': props.userData.accessToken
            }
        })
            .then(({ data }) => {
                this.setState({ dataCollection: data });
            })
            .catch(({ response }) => {
                this.props.notify('CANNOT GET DATA', 'WARNING');
            });
    }

    resolveValue(value) {
        // Assign manual key, value in headers
        if (value.isOpen != undefined)
            value.isOpen = JSON.parse( value.isOpen);
        else {
            this.props.notify('PLEASE CHECK Public or Private button', 'error');
            return null;
        }

        return value;
    }

    updateDatacollection = (value) => {
        const { collectionId } = this.state.dataCollection;
        value = this.resolveValue(value);

        axios.put(api.dataCollection + collectionId + '/meta', JSON.stringify(value), {
            headers: {
                'Authorization': this.props.userData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(({ data }) => {
                this.props.notify('UPDATE SUCCESS', 'success');
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000);
            })
            .catch(({ response }) => {
                this.props.notify('UPDATE UNSUCCESS', 'error');
            });
    }

    render() {
        const { loading, submitResult, dataCollection } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Update DataCollection: { dataCollection!=undefined && dataCollection.collectionName }</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.updateDatacollection(submittedValues)}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label htmlFor='icon'>Icon <small>URL image for icon</small></label>
                                <StyledText type='text' field='icon' className='text-input login-input' />

                                <label htmlFor='description'>Description</label>
                                <StyledText type='text' field='description' className='text-input login-input' />

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

export default connect(state => state)(EditDataCollection);
