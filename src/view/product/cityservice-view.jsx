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
import FaTickets from 'react-icons/lib/fa/ticket';
import FaCopy from 'react-icons/lib/fa/copy';

import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainRightPanel from '../share/component/right-panel.jsx';
import './cityservice-view.css';
import api from '../../constance/api.js';
import Loading from '../share/component/loading.jsx';


class ViewCityservice extends React.Component {

    constructor() {
        super()
        this.state = {
            cityService: {},
            loading: true,
            thumbnail: null,
            copy: 'Copy',
            modalOpen: false,
        }
        this.formatDate = this.formatDate.bind(this);
        this.setWordCopy = this.setWordCopy.bind(this);
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.requestCityService(this.props.match.params);
    }

    requestUserThumbnail(serviceOwner) {
        axios.get(api.users + serviceOwner + '/thumbnail')
            .then(({ status }) => {
                this.setState({ thumbnail: status });
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    requestCityService({ serviceId }) {
        axios.get(api.cityService + '/' + serviceId)
            .then(({ data }) => {
                if (data.sampleData!=undefined)
                    data.sampleData = data.sampleData;
                this.setState({ cityService: data });
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
                console.log('CANNOT GET CITY SERVICE');
            });
    }

    genTicket(serviceId) {
        const { accessToken } = this.props.userData;
        const body = {
            serviceId: serviceId,
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
            const value = new Date(date * 1000);
            return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
        }
        else
            return '-';
    }


    render() {
        const { cityService, loading, thumbnail, ticket, copy, modalOpen } = this.state;

        if (loading == true)
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
                                    cityService.thumbnail
                                        && <img
                                            src={cityService.thumbnail}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={cityService.serviceName}
                                        />
                                }
                                {
                                    !cityService.thumbnail && thumbnail!=200
                                        && <Blockies
                                            seed={cityService.owner}
                                            size={7}
                                            scale={30}
                                            color='#DC90DD'
                                            bgColor='#F0F0F0'
                                            spotColor='#77C5D4'
                                        />
                                }
                                {
                                    !cityService.thumbnail && thumbnail==200
                                        && <img
                                            src={api.users + cityService.owner + '/thumbnail'}
                                            className='img-fluid'
                                            style={{ maxWidth: 210, maxHeight: 210 }}
                                            ref={ (t) => this.t = t }
                                            alt={cityService.serviceName}
                                        />
                                }
                            </div>
                            <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{ cityService.serviceName }</h3>
                                <div class="flex-inline">
                                    <div
                                        className='pointer black'
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => this.genTicket(cityService.serviceId)}>
                                        <FaTickets /> Gen Ticket
                                    </div>
                                </div>
                            </div>
                            <div className='product-header-description'>
                                <p><FaUser color='#56b8db' /> { cityService.owner }</p>
                                <p><FaCalendarO color='#56b8db' />  { this.formatDate(cityService.createdAt) }</p>
                            </div>
                            <small>serviceId: <i>{ cityService.serviceId }</i></small>
                            <hr />

                            <p>{ cityService.description }</p>
                            <hr />

                            <div>
                                <h4>Application link</h4>
                                <br />
                                {
                                    cityService.appLink
                                        ? <a href={cityService.appLink} >{cityService.appLink}</a>
                                        : <p>No data</p>
                                }
                            </div>
                            <hr />

                            <div>
                                <h4>Review</h4>
                                <br />
                                {
                                    cityService.videoLink
                                        ? <iframe
                                            width='560'
                                            height='315'
                                            src={'https://www.youtube.com/embed/' + cityService.videoLink}
                                            frameborder='0'
                                            allow='autoplay; encrypted-media'
                                            allowfullscreen></iframe>
                                        : <p>No data</p>
                                }
                            </div>
                            <hr />

                            <div>
                                <h4>Swagger</h4>
                                <br />
                                {
                                    cityService.swagger!=undefined
                                        ? <div id="swaggerContainer" className='swagger' />
                                        : <p>No data</p>
                                }
                            </div>
                            <hr />

                            <div>
                                <h4>Sample API</h4>
                                <br />
                                {
                                    cityService.sampleData!=undefined
                                        ? <ReactJson src={cityService.sampleData} />
                                        : <p>No data</p>
                                }
                            </div>


                        </Col>
                    </Row>
                </Container>
            );
    }
}

export default connect(state => state)(ViewCityservice);


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
