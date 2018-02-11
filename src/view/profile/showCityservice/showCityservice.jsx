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
    }

    componentDidMount() {
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: 'none',
        });
        this.requestCityService(this.props.match.params);
    }

    requestCityService({ serviceId }) {
        fetch(api.cityService + '/' + serviceId, {
            method: 'GET',
        }).then(response => response.json()).then(
            res => {
                this.setState({ cityService: res });
            },
            err => {
                console.log('CANNOT GET DATA');
            }
        )
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
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
                    <img
                        src={ cityService.thumbnail }
                        className='img-fluid'
                        alt={ cityService.serviceName }
                    />
                </div>
                <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{ cityService.serviceName }</h3>
                    <div className='flex-inline'>
                        <div> <FaEdit /> Edit </div>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                            <DropdownToggle className='menu-more'>
                                <FaEllipsisV />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Delete</DropdownItem>
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
                    cityService.sampleData!=undefined && <h3>Sample API</h3> && <ReactJson src={cityService.sampleData} /> && <hr />
                }

                <div id="swaggerContainer" />

            </Container>
        );
    }
}


const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';
