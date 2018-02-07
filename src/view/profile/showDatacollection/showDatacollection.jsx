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
import ReactJson from 'react-json-view';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

import api from '../../../constance/api.js';
import '../../product/product.css';


class ShowDataCollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {},
            modalOpen: false,
            ticket: ''
        }
        this.formatDate = this.formatDate.bind(this);
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const dataCollection = this.props.match.params.collectionName;
        fetch(api.dataCollection + '?collectionName=' + dataCollection, {
            method: 'GET',
        }).then(response => response.json()).then(
            res => {
                this.setState({ dataCollection: res[0] });
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }

    genTicket(datacollectionId) {
        const { accessToken } = this.props.userData;
        const body = {
            collectionId: datacollectionId,
            expire: 0
        }
        fetch(api.getTicket, {
            method: 'POST',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(response => response.text()).then(
            res => {
                this.setState({ ticket: res });
            },
            err => {
                console.log('CANNOT GET TICKET');
            }
        ).finally(() => this.setState({ modalOpen: true }));
    }


    formatDate(date) {
        const value = new Date(date);
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }


    render() {
        const { dataCollection, modalOpen, ticket } = this.state;

        return (
            <Container>

                <ModalComponent isOpen={modalOpen} toggle={this.closeModal} ticket={ticket} />

                <div className='img-product'>
                    <img
                        src={ dataCollection.icon==null? noImageAvialable: dataCollection.icon }
                        className='img-fluid img-thumbnail'
                        alt='smartcity_product_name'
                    />
                </div>
                <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{ dataCollection.collectionName }</h3>
                    <div className='link'>
                        <Button
                            size='sm'
                            className='btn-smooth btn-raised-success right'
                            style={{ height: '34px' }}
                            onClick={() => this.genTicket(dataCollection.collectionId)}
                        >
                            Gen Ticket
                        </Button>
                    </div>
                </div>
                <div className='product-header-description'>
                    <p><FaCalendarO color='#56b8db' />  { this.formatDate(dataCollection.timestamp) }</p>
                    <p><FaUser color='#56b8db' /> { dataCollection.owner }</p>
                </div>
                <hr />

                <p>{ dataCollection.description }</p>
                { dataCollection.description!=null && <hr /> }

                <h3>API</h3>
                {
                    dataCollection.example!=undefined && Object.keys(dataCollection.example).length === 0
                        ? <h4>No Example API</h4>
                        : <ReactJson src={ dataCollection.example } />
                }
                <hr />

                <div id="swaggerContainer" />

            </Container>
        );
    }
}

export default connect(state => state)(ShowDataCollection);

const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';


const ModalComponent = ({ isOpen, toggle, ticket }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Generate Ticket Success</ModalHeader>
        <ModalBody>
            {
                ticket!=''
                ? `Your ticket is ${ticket}`
                : 'Get ticket fail!'
            }
        </ModalBody>
        <ModalFooter className='link'>
            <Button className='btn-smooth btn-raised-info'> <FaCopy /> Copy</Button>
            <div className='btn-invisible' onClick={toggle}>
                Close
            </div>
        </ModalFooter>
    </Modal>
)
