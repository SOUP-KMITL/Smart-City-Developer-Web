import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import ReactJson from 'react-json-view';
import axios from 'axios';
import Blockies from 'react-blockies';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaToggleOff from 'react-icons/lib/fa/toggle-off';
import FaCopy from 'react-icons/lib/fa/copy';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';
import FaObjectGroup from 'react-icons/lib/fa/object-group';
import FaTickets from 'react-icons/lib/fa/ticket';

import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainRightPanel from '../share/component/right-panel.jsx';
import './cityservice-view.css';
import api from '../../constance/api.js';
import Loading from '../share/component/loading.jsx';


class ViewDatacollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {},
            loading: true,
            modalOpen: false,
            ticket: '',
            copy: 'Copy',
            thumbnail: null
        }
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.setWordCopy = this.setWordCopy.bind(this);
    }

    componentDidMount() {
        this.requestDataCollection(this.props.match.params);
    }

    requestUserThumbnail(serviceOwner) {
        axios.get(api.users + serviceOwner + '/thumbnail')
            .then(({ status }) => {
                setTimeout(() => {
                    this.setState({ thumbnail: status });
                }, 1000);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    requestDataCollection({ collectionName }) {
        axios.get(api.dataCollection + '?collectionName=' + collectionName)
        .then(({ data }) => {
                if (data.sampleData!=undefined)
                    data.sampleData = data.sampleData;
                this.setState({ dataCollection: data.content[0] });
                if (data.swagger!=undefined)
                    this.getSwagger();
                if (data.thumbnail != undefined)
                    setTimeout(() => {
                        this.setState({ loading: false });
                    }, 1000);
                else
                    this.requestUserThumbnail();
            })
            .catch(({ response }) => {
                console.log('CANNOT GET DATA COLLECTION');
            })
    }

    genTicket(datacollectionId) {
        const { accessToken } = this.props.userData;
        const body = {
            collectionId: datacollectionId,
            expire: 0
        }
        axios.post(api.getTicket, JSON.stringify(body), {
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            }
        })
            .then(({ data }) => {
                this.setState({ ticket: data });
            })
            .catch(({ response }) => {
                this.props.notify('CANNOT GENERATE TICKET', 'error');
            })
            .finally(() => {
                this.setState({ modalOpen: true });
            });
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    setWordCopy() {
        // Set word copy to copied
        this.setState({ copy: 'Copied!' });
    }

    formatDate(date) {
        if (date != null) {
            const value = new Date(date);
            return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
        }
        else
            return '-';
    }

    render() {
        const { dataCollection, loading, thumbnail, modalOpen, copy, ticket } = this.state;

        if (loading === true)
            return ( <Loading /> )
        else
            return (
                <Container className='fullscreen' style={{ paddingTop: 50 }}>

                    <ModalComponent
                        isOpen={modalOpen}
                        toggle={this.closeModal}
                        ticket={ticket}
                        copy={copy}
                        setwordCopy={this.setWordCopy}
                    />

                    <Row>

                        <Col md={3} xs={12} sm={12}>
                            {
                                this.props.userData.userId==undefined
                                ? <Link to='/signin' className='link'>
                                    <Button size='lg' block className='btn-smooth btn-raised-success'>Sign In</Button>
                                </Link>
                                :<ProfileMenu userData={ this.props.userData }/>
                            }
                        </Col>

                        <Col md={1} xs={12} sm={12}>
                            <hr className='vertical' />
                        </Col>

                        <Col md={{ size: 7 }} sm={12} style={{ marginBottom: '30px' }}>

                            <div className='img-product'>
                                {
                                    dataCollection.thumbnail
                                        && <img
                                            src={dataCollection.thumbnail}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={dataCollection.collectionName}
                                        />
                                }
                                {
                                    !dataCollection.thumbnail && thumbnail!=200
                                        && <Blockies
                                            seed={dataCollection.owner}
                                            size={7}
                                            scale={30}
                                            color='#DC90DD'
                                            bgColor='#F0F0F0'
                                            spotColor='#77C5D4'
                                        />
                                }
                                {
                                    !dataCollection.thumbnail && thumbnail==200
                                        && <img
                                            src={api.users + dataCollection.owner + '/thumbnail'}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={dataCollection.collectionName}
                                        />
                                }
                            </div>
                            <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{ dataCollection.collectionName }</h3>
                                <div class="flex-inline">
                                    <div
                                        className='pointer black'
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => this.genTicket(dataCollection.collectionId)}
                                    >
                                        <FaTickets /> Gen Ticket
                                    </div>
                                </div>
                            </div>
                            <div className='product-header-description'>
                                <p><FaUser color='#56b8db' /> { dataCollection.owner }</p>
                                <p><FaObjectGroup color='#56b8db' />  { dataCollection.type!=undefined? dataCollection.type.toUpperCase(): '-' }</p>
                                {
                                    dataCollection.open
                                        ? <p><FaToggleOn color='#56b8db' /> Public</p>
                                        : <p><FaToggleOff color='#56b8db'/> Private</p>
                                }
                            </div>
                            <small>collectionId: <i>{ dataCollection.collectionId }</i></small>
                            <hr />


                            <p>{ dataCollection.description }</p>
                            { dataCollection.description!=null && <hr /> }

                            <h3>Example API</h3>
                            {
                                dataCollection.example!=undefined && Object.keys(dataCollection.example).length === 0
                                    ? <p>No Example API</p>
                                    : <ReactJson src={ dataCollection.example } />
                            }
                            <hr />

                            <h3>Category</h3>
                            {
                                dataCollection.category==null
                                    ? <p>No category</p>
                                    : <p>{ dataCollection.category }</p>
                            }
                            <hr />

                        </Col>
                    </Row>
                </Container>
            );
    }
}

export default connect(state => state)(ViewDatacollection);

const ModalComponent = ({ isOpen, toggle, ticket, copy, setwordCopy }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Generate Ticket Success</ModalHeader>
        <ModalBody>
            {
                ticket!=''
                    ? `Your ticket is`
                    : 'Get ticket fail!'
            }
            <br />
            <input type='text' value={ticket} disabled className='text-input login-input' />
        </ModalBody>
        <ModalFooter className='link'>
            <CopyToClipboard text={ticket}
                onCopy={() => setwordCopy()}>
                <Button className='btn-smooth btn-raised-info'> <FaCopy /> { copy }</Button>
            </CopyToClipboard>
            <div className='btn-invisible' onClick={toggle}>
                Close
            </div>
        </ModalFooter>
    </Modal>
)
