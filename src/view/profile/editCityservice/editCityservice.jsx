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
import api from '../../../constance/api.js';


class EditCityService extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            submitResult: undefined,
            thumbnail: null,
            cityService: undefined,
        }
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

    resolveData(value) {
        if (value.sampleData != undefined) {
            value.sampleData = JSON.parse(value.sampleData);
            //if (typeof value.sampleData === Object)
            // Validate error of object invalid
        }
        return value;
    }

    updateCityservice(value) {
        const { serviceId } = this.props.match.params;
        value = this.resolveData(value);

        fetch(api.cityService + '/' + serviceId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        }).then(response => response.json()).then(
            res => {
                this.setState({ cityService: res });
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }

    render() {
        const { loading, submitResult, cityService } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle>Update CityService: { cityService!=undefined && cityService.serviceName }</CardTitle>
                    <hr />
                    <Form onSubmit={submittedValues => this.updateCityservice(submittedValues)}>
                        { formApi => (
                            <form onSubmit={formApi.submitForm} className='form-editprofile'>

                                <label htmlFor='endpoint'>Endpoint</label>
                                <StyledText type='text' field='endpoint' className='text-input login-input' />

                                <label htmlFor='sampleData'>Sample data</label>
                                <StyledText type='text' field='sampleData' className='text-input login-input' />

                                <label htmlFor='description'>Description</label>
                                <StyledText type='text' field='description' className='text-input login-input' />

                                <label htmlFor='appLink'>App link</label>
                                <StyledText type='text' field='appLink' className='text-input login-input' />

                                <label htmlFor='videoLink'>Video link</label>
                                <StyledText type='text' field='videoLink' className='text-input login-input' />

                                <label htmlFor='swagger'>Swagger</label>
                                <StyledText type='text' field='swagger' className='text-input login-input' />

                                {
/*                                    <label htmlFor='code'>Code</label>*/
                                        //<StyledText type='text' field='code' className='text-input login-input' />

                                        //<label htmlFor='kind'>Kind</label>
                                        /*<StyledText type='text' field='kind' className='text-input login-input' />*/
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
