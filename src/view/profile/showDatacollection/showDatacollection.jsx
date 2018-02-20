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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v';
import FaTickets from 'react-icons/lib/fa/ticket';

import api from '../../../constance/api.js';
import '../../product/cityservice-view.css';


class ShowDataCollection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataCollection: {},
            modalOpen: false,
            ticket: '',
            dropdownOpen: false
        }
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.requestDatacollection(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData != undefined)
            this.requestDatacollection(props);
    }

    requestDatacollection(props) {
        const dataCollection = props.match.params.collectionId;
        fetch(api.dataCollection + dataCollection + '/meta', {
            method: 'GET',
            headers: {
                'Authorization': props.userData.accessToken,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(
            res => {
                this.setState({ dataCollection: res });
            },
            err => {
                this.props.notify('CANNOT GET DATA', 'WARNING');
            }
        )
    }

    deleteDatacollection(collectionId) {
        fetch(api.dataCollection + collectionId, {
            method: 'DELETE',
            headers: {
                'Authorization': this.props.userData.accessToken
            }
        }).then(
            res => {
                this.props.notify('DELETE SUCCESS', 'success');
                this.props.history.goBack();
            }
        ).catch(
            err => {
                this.props.notify('DELETE fail', 'error');
            }
        );
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
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
                    {
                        dataCollection.thumbnail!=null
                            && <img
                                src={dataCollection.thumbnail}
                                className='img-fluid img-thumbnail'
                                alt='smartcity_product_name'
                            />
                    }
                </div>
                <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{ dataCollection.collectionName }</h3>
                    <div className='flex-inline'>
                        <Link
                            className='black pointer'
                            to={`/profile/my-datacollections/edit/${dataCollection.collectionId}`}>
                            <FaEdit /> Edit
                        </Link>
                        <div
                            className='pointer black'
                            style={{ marginLeft: '10px' }}
                            onClick={() => this.genTicket(dataCollection.collectionId)}
                        >
                            <FaTickets /> Gen Ticket
                        </div>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                            <DropdownToggle className='menu-more'>
                                <FaEllipsisV />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={ () => this.deleteDatacollection(dataCollection.collectionId) }>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className='product-header-description'>
                    <p><FaCalendarO color='#56b8db' />  { this.formatDate(dataCollection.createdAt) }</p>
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

const noImageAvialable = 'https://avatars1.githubusercontent.com/u/17084428?s=460&v=4';


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
