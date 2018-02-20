import React from 'react';
import ReactDOM from 'react-dom';
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
    Input,
} from 'reactstrap';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Blockies from 'react-blockies';

import Storage from '../../share/authorization/storage.jsx';
import api from '../../../constance/api.js';


class ProfileMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false,
            modalPwdOpen: false,
            pwd: '',
            requestResult: null
        }
        this.requestGenAcessToken = this.requestGenAcessToken.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModalPwd = this.closeModalPwd.bind(this);
        this.updatePwdInput = this.updatePwdInput.bind(this);
        this.openModalPwd = this.openModalPwd.bind(this);

    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    closeModalPwd() {
        this.setState({ modalPwdOpen: false });
    }

    openModalPwd() {
        this.setState({ modalPwdOpen: true });
    }

    swapModal = () => {
        if (this.state.pwd != '') {
            this.closeModalPwd();
            this.requestGenAcessToken();
        }
    }

    updatePwdInput(event) {
        const value = event.target.value;
        this.setState({ pwd: value });
    }

    requestGenAcessToken() {
        const { userName } = this.props.userData;
        const { pwd } = this.state;
        const auth = 'Basic ' + new Buffer(userName + ':' + pwd).toString('base64');
        fetch(api.users + userName + '/token', {
            method: 'PUT',
            headers: {
                'Authorization': auth,
            },
        }).then(response => response.text()).then(
            ( res ) => {
                if (res!='') {
                    this.props.userData.accessToken = res;
                    this.props.updateUserData(this.props.userData);
                    Storage.saveUserData(this.props.userData);
                    this.setState({ requestResult: true });
                }
                else {
                    console.log('CANNOT GENERATE NEW ACCESSTOKEN');
                    this.setState({ requestResult: false });
                }
            }
        ).finally(() => this.setState({ modalOpen: true }));
    }

    render() {
        const { firstName, lastName, userName, accessToken } = this.props.userData;
        const { modalOpen, modalPwdOpen, requestResult } = this.state;

        return (
            <div>
                <ModalComponent isOpen={modalOpen} toggle={this.closeModal} newToken={accessToken} requestResult={requestResult} />
                <ModalPassword isOpen={modalPwdOpen} swapModal={this.swapModal} close={this.closeModalPwd} updatePwd={this.updatePwdInput} />
                <div className='profile-image-overlay' onClick={() => alert('UPLOAD IMG IS COMING SOON')}>
                    <div className='profile-image'>
                        <Blockies
                            seed={userName}
                            size={7}
                            scale={30}
                            color='#DC90DD'
                            bgColor='#F0F0F0'
                            spotColor='#77C5D4'
                        />
                        {
                            /*                        <img*/
                            //src='https://avatars1.githubusercontent.com/u/17084428?s=460&v=4'
                            //width='200px'
                            //className='img-fluid'
                            //alt=''
                            /*/>*/
                        }
                    </div>
                </div>
                <div className='profile-info'>
                    <strong>@{userName}</strong>
                    <p>{firstName} {lastName}</p>
                    <div className='link'>
                        <Button size='sm' outline color='info' className='btn-smooth' onClick={this.openModalPwd}>Gen Access Token</Button>
                    </div>
                </div>
                <ListGroup className='profile-menu'>
                    <ListGroupItem>
                        <Link to='/profile'>My Account</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to='/profile/my-datacollections/page/1'>
                            My Data Collections
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to='/profile/my-cityservices/cityservice'>
                            My City Services
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


const ModalComponent = ({ isOpen, toggle, newToken, requestResult }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>
            Generate
            {
                requestResult!=null && requestResult==true
                    ? ' Success' + requestResult
                    : ' Fail'
            }
        </ModalHeader>
        <ModalBody>
            {
                requestResult!=null && requestResult==true
                    ? `Your new token is ${newToken}`
                    : 'Password is invalid!'
            }
        </ModalBody>
        <ModalFooter className='link'>
            <Button color="secondary" outline onClick={toggle} className='btn-smooth'>Close</Button>
        </ModalFooter>
    </Modal>
)

const ModalPassword = ({ isOpen, swapModal, close, updatePwd }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={close}>
        <ModalHeader toggle={close}>Generate Access Token</ModalHeader>
        <ModalBody>
            <label>Password</label>
            <Input type='password' onChange={(e) => updatePwd(e)} />
        </ModalBody>
        <ModalFooter className='link'>
            <Button onClick={swapModal} className='btn-smooth btn-raised-success'>Generate</Button>
            <Button color="secondary" outline onClick={close} className='btn-smooth'>Close</Button>
        </ModalFooter>
    </Modal>
)
