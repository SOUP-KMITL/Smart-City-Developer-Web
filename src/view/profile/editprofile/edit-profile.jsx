import React from 'react';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


export default class EditProfile extends React.Component {


    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Name: EditProfile</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Link to='/profile/my-datacollections'>
                        <Button size='sm' className='btn-smooth' style={{ float: 'right' }}>Edit</Button>
                    </Link>
                </CardBody>
            </Card>
        );
    }
}
