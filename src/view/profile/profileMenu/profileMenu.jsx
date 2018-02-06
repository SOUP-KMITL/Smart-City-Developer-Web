import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import api from '../../../constance/api.js';


class ProfileMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        }
        this.requestGenAcessToken = this.requestGenAcessToken.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    requestGenAcessToken() {
        this.setState({ modalOpen: true });
    }

    render() {
        const { firstName, lastName, userName } = this.props.userData;
        const { modalOpen } = this.state;

        return (
            <div>
                <ModalComponent isOpen={modalOpen} toggle={this.closeModal} />
                <div className='profile-image'>
                    <img
                        src='https://avatars1.githubusercontent.com/u/17084428?s=460&v=4'
                        width='200px'
                        className='img-fluid'
                        alt=''
                    />
                </div>
                <div className='profile-info'>
                    <strong>@{userName}</strong>
                    <p>{firstName} {lastName}</p>
                    <div className='link'>
                        <Button size='sm' outline color='info' className='btn-smooth' onClick={this.requestGenAcessToken}>Gen Access Token</Button>
                    </div>
                </div>
                <ListGroup className='profile-menu'>
                    <ListGroupItem>
                        <Link to='/profile'>My Account</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to='/profile/my-datacollections/page/1'>
                            My DataCollections
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to='/profile/my-cityservices'>
                            My CityServices
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to='/signout'>
                            Sign Out
                        </Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}


export default connect(state => state)(ProfileMenu);


const ModalComponent = ({ isOpen, toggle }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Generate Access Token</ModalHeader>
        <ModalBody>
            Your new token is 30819731b464935783e0d7469950f534dcaba528e77de0c99e74b71b484d3666
        </ModalBody>
        <ModalFooter className='link'>
            <Button color="secondary" outline onClick={toggle} className='btn-smooth'>Close</Button>
        </ModalFooter>
    </Modal>
)
