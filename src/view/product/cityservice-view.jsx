import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import ReactJson from 'react-json-view';
import axios from 'axios';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import ProfileMenu from '../profile/profileMenu/profileMenu.jsx';
import MainRightPanel from '../share/component/right-panel.jsx';
import './cityservice-view.css';
import api from '../../constance/api.js';


class ViewCityservice extends React.Component {

    constructor() {
        super()
        this.state = {
            cityService: {},
        }
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
                console.log('CANNOT GET CITY SERVICE');
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
        const { cityService } = this.state;

        return (
            <Container className='fullscreen' style={{ paddingTop: 50 }}>
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
                        </div>
                        <div className='product-header-description'>
                            <p><FaUser color='#56b8db' /> { cityService.owner }</p>
                            <p><FaCalendarO color='#56b8db' />  { this.formatDate(cityService.createdAt) }</p>
                        </div>
                        <hr />

                        <p>{ cityService.description }</p>
                        <hr />

                        {
                            cityService.appLink
                                && <div>
                                    <h3>Application Link</h3>
                                    <a href={cityService.appLink} >{cityService.appLink}</a>
                                </div>
                        }
                        <br />

                        {
                            cityService.videoLink
                                && <div>
                                    <iframe
                                        width='560'
                                        height='315'
                                        src={'https://www.youtube.com/embed/' + cityService.videoLink}
                                        frameborder='0'
                                        allow='autoplay; encrypted-media'
                                        allowfullscreen></iframe>
                                </div>
                        }

                        {
                            cityService.swagger!=undefined
                                && <div>
                                    <div id="swaggerContainer" className='swagger' />
                                    <hr />
                                </div>
                        }

                        {
                            cityService.sampleData!=undefined
                                && <div>
                                    <h3>Sample API</h3>
                                    <br />
                                    <ReactJson src={cityService.sampleData} />
                                </div>
                        }


                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(state => state)(ViewCityservice);
