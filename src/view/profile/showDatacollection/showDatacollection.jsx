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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import Blockies from 'react-blockies';

// Icons
//import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v';
import FaTickets from 'react-icons/lib/fa/ticket';
import FaObjectGroup from 'react-icons/lib/fa/object-group';
import FaToggleOff from 'react-icons/lib/fa/toggle-off';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';

import api from '../../../constance/api.js';
import '../../product/cityservice-view.css';
import Loading from '../../share/component/loading.jsx';


class ShowDataCollection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataCollection: {},
            modalOpen: false,
            ticket: '',
            dropdownOpen: false,
            copy: 'Copy',
            thumbnail: null,
            loading: true,
        }
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setWordCopy = this.setWordCopy.bind(this);
        this.requestDatacollection(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData != undefined)
            this.requestDatacollection(props);
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

    requestDatacollection(props) {
        const dataCollection = props.match.params.collectionId;
        axios.get(api.dataCollection + dataCollection + '/meta', {}, {
            headers: {
                'Authorization': props.userData.accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(({ data }) => {
                this.setState({ dataCollection: data });
                if (data.thumbnail != undefined)
                    setTimeout(() => {
                        this.setState({ loading: false });
                    }, 1000);
                else
                    this.requestUserThumbnail();
            })
            .catch(({ err }) => {
                this.props.notify('CANNOT GET DATA', 'WARNING');
            })
    }

    deleteDatacollection(collectionId) {
        axios.delete(api.dataCollection + collectionId, {
            headers: {
                'Authorization': this.props.userData.accessToken
            }
        })
            .then(({ data }) => {
                this.props.notify('DELETE SUCCESS', 'success');
                this.props.history.goBack();
            })
            .catch(({ response }) => {
                this.props.notify('DELETE UNSUCCESS', 'error');
            });
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


    formatDate(date) {
        if (date != null) {
            const value = new Date(date);
            return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
        }
        else
            return '-';
    }

    setWordCopy() {
        // Set word copy to copied
        this.setState({ copy: 'Copied!' });
    }

    render() {
        const { dataCollection, modalOpen, ticket, copy, thumbnail, loading } = this.state;

        if (loading === true)
            return ( <Loading /> )
        else
            return (
                <Container>

                    <ModalComponent
                        isOpen={modalOpen}
                        toggle={this.closeModal}
                        ticket={ticket}
                        copy={copy}
                        setwordCopy={this.setWordCopy}
                    />

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
                    <div className='flex-inline'>
                        <Link
                            className='black pointer'
                            to={`/profile/my-datacollections/edit/${dataCollection.collectionId}`}>
                            <FaEdit /> Edit
                        </Link>
                        <div
                            className='pointer black'
                            style={{ marginLeft: '10px' }}
                            onClick={() => this.genTicket(dataCollection.collectionId)}>
                            <FaTickets /> Gen Ticket
                        </div>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                            <DropdownToggle className='menu-more'>
                                <FaEllipsisV />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={ () => this.deleteDatacollection(dataCollection.collectionId) }
                                    className='pointer'>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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

            </Container>
            );
    }
}

export default connect(state => state)(ShowDataCollection);


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
