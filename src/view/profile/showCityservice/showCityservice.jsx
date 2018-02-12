import React from 'react';
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

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEllipsisV from 'react-icons/lib/fa/ellipsis-v';

import  './showCityservice.css';
import api from '../../../constance/api.js';
import '../../product/product.css';


export default class ShowCityService extends React.Component {

    constructor() {
        super()
        this.state = {
            cityService: {},
            dropdownOpen: false
        }
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.getSwagger = this.getSwagger.bind(this);
    }

    componentDidMount() {
        this.requestCityService(this.props.match.params);
    }

    requestCityService({ serviceId }) {
        fetch(api.cityService + '/' + serviceId, {
            method: 'GET',
        }).then(response => response.json()).then(
            res => {
                if (res.sampleData!=undefined)
                    res.sampleData = res.sampleData;
                this.setState({ cityService: res });
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }

    deleteCityService(serviceId) {
        fetch(api.cityService + '/' + serviceId, {
            method: 'DELETE',
        }).then(response => response.json()).then(
            res => {
                // ADD alert / notification here
                this.props.history.goBack();
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        );
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getSwagger(swagger) {
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: 'none',
        });
    }

    formatDate(date) {
        const value = new Date(date);
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }

    render() {
        const { cityService } = this.state;
        if (cityService.swagger !== undefined)
            this.getSwagger;


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
                    cityService.swagger!=undefined
                        && <div id="swaggerContainer" />
                }

                {
                    cityService.appLink
                        && <div>
                            <h3>Application Link</h3>
                            <a href={cityService.appLink} >{cityService.appLink}</a>
                            <hr />
                        </div>
                }

            </Container>
        );
    }
}


const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';
