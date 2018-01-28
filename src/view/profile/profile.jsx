import React from 'react';
import {
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';

import './profile.css';


class Profile extends React.Component {


    render() {
        return (
            <Container className='fullscreen' style={{ paddingTop: 50 }}>
                <Row>
                    <Col md={3} xs={12} sm={12}>
                        <div className='profile-image'>
                            <img
                                src='https://pickaface.net/assets/images/slides/slide4.png'
                                width='200px'
                                className='img-fluid'
                                alt=''
                            />
                        </div>
                        <ListGroup>
                            <ListGroupItem>Edit Profile</ListGroupItem>
                            <ListGroupItem>My DataCollections</ListGroupItem>
                            <ListGroupItem>My CityServices</ListGroupItem>
                            <ListGroupItem>Setting</ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={1} xs={12} sm={12}>
                        <hr className='vertical' />
                    </Col>
                    <Col md={{ size: 7 }} sm={12}>
                        <Card>
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default connect(state => state)(Profile);
