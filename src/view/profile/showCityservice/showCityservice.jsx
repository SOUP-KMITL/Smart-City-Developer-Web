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
        const json = {
            "object_or_array": "object",
            "empty": false,
            "parse_time_nanoseconds": 19608,
            "validate": true,
            "size": 1
        }

        return (
            <Container>

                <div className='img-product'>
                    <img
                        src='https://screenshotscdn.firefoxusercontent.com/images/819fa6de-0a20-4ff5-aeed-9bd26769a1fa.png'
                        className='img-fluid img-thumbnail'
                        alt='smartcity_product_name'
                    />
                </div>
                <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Crowd flow prediction</h3>
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
                    <p><FaCalendarO color='#56b8db' /> 1/2/2018</p>
                    <p><FaUser color='#56b8db' /> Kohpai</p>
                </div>
                <hr />

                <p>Traffic flow prediction heavily depends on historical and real-time traffic data collected
                    from various sensor sources, including inductive loops, radars, cameras, mobile Global
                    Po- sitioning System, crowd sourcing, social media, etc …</p>
                <hr />

                <h3>API</h3>
                {
                    <ReactJson src={json} />
                }
                <hr />

                <div id="swaggerContainer" />

            </Container>
        );
    }
}


const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';
