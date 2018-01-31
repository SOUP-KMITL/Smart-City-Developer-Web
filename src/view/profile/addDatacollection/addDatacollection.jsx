import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
} from 'reactstrap';
import { StyledText, Form, Radio, RadioGroup, StyledSelect, NestedForm } from 'react-form';
import ReactLoading from 'react-loading';


export default class AddDataCollection extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            loading: false,
            submitResult: undefined,
        }
    }

    requestUpload(value) {
        console.log(value);
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
                                <StyledSelect field="encryptionLevel" options={encryptionLevel} />

                                <label htmlFor='example'>Example</label>
                                <StyledText type='text' field='example' className='text-input login-input' />

                                <Endpoint />

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


const Endpoint = () => (
    <NestedForm field="endpoint">
        <Form>
            { formApi => (
                <div>
                    <h3>endpoint</h3>
                    <hr />
                    <label htmlFor="type">Type</label>
                    <StyledText type='text' field='type' className='text-input login-input' />
                    <label htmlFor="url">URL</label>
                    <StyledText type='text' field='url' className='text-input login-input' />
                </div>
            )}
        </Form>
    </NestedForm>
);
