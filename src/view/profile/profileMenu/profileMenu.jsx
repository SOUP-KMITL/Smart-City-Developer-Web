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

import Storage from '../../share/authorization/storage.jsx';
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
        const { userName } = this.props.userData;
        const auth = 'Basic ' + new Buffer(userName + ':' + 'abc123').toString('base64');
        fetch(api.users + userName + '/token', {
            method: 'PUT',
            headers: {
                'Authorization': auth,
            },
        }).then(response => response.text()).then(
            res => {
                this.props.userData.accessToken = res;
                this.props.updateUserData(this.props.userData);
                Storage.saveUserData(this.props.userData);
            },
            err => {
                console.log('CANNOT GENERATE NEW ACCESSTOKEN');
            }
        ).finally(
            () => this.setState({ modalOpen: true })
        )
    }

    render() {
        const { firstName, lastName, userName, accessToken } = this.props.userData;
        const { modalOpen } = this.state;

        return (
            <div>
                <ModalComponent isOpen={modalOpen} toggle={this.closeModal} newToken={accessToken} />
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
                        <Link to='/profile/my-cityservices/cityservice'>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (data) => {
            dispatch({
                type: 'UPDATE',
                payload: data
            })
        }
    }
}

export default connect(state => state, mapDispatchToProps)(ProfileMenu);


const ModalComponent = ({ isOpen, toggle, newToken }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Generate Access Token</ModalHeader>
        <ModalBody>
            Your new token is { newToken }
        </ModalBody>
        <ModalFooter className='link'>
            <Button color="secondary" outline onClick={toggle} className='btn-smooth'>Close</Button>
        </ModalFooter>
    </Modal>
)
