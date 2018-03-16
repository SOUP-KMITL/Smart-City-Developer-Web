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

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v';

import  './showCityservice.css';
import api from '../../../constance/api.js';
import '../../product/cityservice-view.css';


class ShowCityService extends React.Component {

    constructor() {
        super()
        this.state = {
            cityService: {},
            dropdownOpen: false
        }
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.requestCityService(this.props.match.params);
    }

    requestCityService({ serviceId }) {
        axios.get(api.cityService + '/' + serviceId)
            .then(({ data }) => {
                if (data.sampleData!=undefined)
                    data.sampleData = data.sampleData;
                this.setState({ cityService: data });
                if (data.swagger!=undefined)
                    this.getSwagger();
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
        const value = new Date(date);
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }

    render() {
        const { cityService } = this.state;

        return (
            <Container>

                <div className='img-product'>
                    {
                        cityService.thumbnail!==null &&
                            <img
                                src={ cityService.thumbnail }
                                className='img-fluid'
                                alt={ cityService.serviceName }
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
                </div>
                <hr />

                <p>{ cityService.description }</p>
                <hr />

                {
                    cityService.sampleData!=undefined
                        && <div>
                            <h3>Sample API</h3>
                            <br />
                            <ReactJson src={cityService.sampleData} />
                            <hr />
                        </div>
                }

                {
                    cityService.appLink
                        && <div>
                            <h3>Application Link</h3>
                            <a href={cityService.appLink} >{cityService.appLink}</a>
                            <hr />
                        </div>
                }

                {
                    cityService.videoLink
                        && <iframe
                            width='560'
                            height='315'
                            src={'https://www.youtube.com/embed/' + cityService.videoLink}
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowfullscreen></iframe>
                }

                {
                    cityService.swagger!=undefined
                        && <div id="swaggerContainer" className='swagger' />
                }

            </Container>
        );
    }
}


export default connect(state => state)(ShowCityService);
