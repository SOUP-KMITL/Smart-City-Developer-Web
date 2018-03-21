import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import SwaggerUi from 'swagger-ui';
import axios from 'axios';
import Blockies from 'react-blockies';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v';
import FaServer from 'react-icons/lib/fa/server';

import  './showCityservice.css';
import api from '../../../constance/api.js';
import '../../product/cityservice-view.css';
import Loading from '../../share/component/loading.jsx';


class ShowCityService extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cityService: {},
            dropdownOpen: false,
            thumbnail: null,
            loading: true
        }
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.formatDate = this.formatDate.bind(this);
        if (props.userData.accessToken != undefined)
            this.requestCityService(props);
    }

    componentWillReceiveProps(props) {
        if (props.userData.accessToken != undefined)
            this.requestCityService(props);
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

    requestCityService({ match, userData }) {
        const { serviceId } = match.params;
        const { accessToken } = userData;

        axios.get(api.cityService + '/' + serviceId, {
            headers: {
                'Authorization': accessToken
            }
        })
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
                this.props.notify('CANNOT GET CITY SERVICE', 'error');
            });
    }

    deleteCityService(serviceId) {
        axios.delete(api.cityService + '/' + serviceId, {
            headers: {
                'Authorization': this.props.userData.accessToken
            }
        })
            .then(res => {
                this.props.notify('DELETE SUCCESS', 'success');
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000);
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

    getSwagger() {
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: this.state.cityService.swagger,
        });
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
        const { cityService, thumbnail, loading } = this.state;

        if (loading === true)
            return ( <Loading /> )
        else
            return (
                <Container>

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
                        <div className='flex-inline'>
                            <Link to={`/profile/my-cityservices/edit/${cityService.serviceId}`} className='link black'>
                                <FaEdit /> Edit
                            </Link>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                <DropdownToggle className='menu-more'>
                                    <FaEllipsisV />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.deleteCityService(cityService.serviceId)}>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='product-header-description'>
                        <p><FaUser color='#56b8db' /> { cityService.owner }</p>
                        <p><FaCalendarO color='#56b8db' />  { this.formatDate(cityService.createdAt) }</p>
                        <p>
                            <FaServer color='#56b8db' /> { cityService.endpoint.length>0? cityService.endpoint[0].toUpperCase() + cityService.endpoint.substr(1): '-' }
                        </p>
                    </div>
                    <hr />

                    <p>{ cityService.description }</p>
                    <hr />

                    <div>
                        <h4>Demo link</h4>
                        <br />
                        {
                            cityService.appLink
                                ? <a href={cityService.appLink} >{cityService.appLink}</a>
                                : <p>No data</p>
                        }
                    </div>
                    <hr />

                    <div>
                        <h4>Video Review</h4>
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

                </Container>
            );
    }
}


export default connect(state => state)(ShowCityService);
