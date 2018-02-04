import React from 'react';
import {
    Container,
    Col,
    Row,
    Button,
    ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';

import api from '../../../constance/api.js';
import '../../product/product.css';


export default class ShowDataCollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {}
        }
        this.formatDate = this.formatDate.bind(this);
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

    createMarkup(text) {
        return {
            __html: text
        };
    };

    formatDate(date) {
        const value = new Date(date);
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }

    render() {
        const { dataCollection } = this.state;
        const text = `<h4><a href=''>Support html <i>text</i> </a></h4> Information and communication technology (ICT) is used to enhance quality, performance and interactivity of urban services, to reduce costs and resource consumption and to increase contact between citizens and government. Smart city applications are developed to manage urban flows and allow for real-time responses. A smart city may therefore be more prepared to respond to challenges than one with a simple 'transactional' relationship with its citizens. Yet, the term itself remains unclear to its specifics and therefore, open to many interpretations.  `;

        return (
            <Container>

                <div className='img-product'>
                    <img
                        src={ dataCollection.icon==null? noImageAvialable: dataCollection.icon }
                        className='img-fluid img-thumbnail'
                        alt='smartcity_product_name'
                    />
                </div>
                <h3 className='product-header'>{ dataCollection.collectionName }</h3>
                <div className='product-header-description'>
                    <p><FaCalendarO color='#56b8db' />  { this.formatDate(dataCollection.timestamp) }</p>
                    <p><FaUser color='#56b8db' /> { dataCollection.owner }</p>
                </div>
                <hr />

                <div dangerouslySetInnerHTML={this.createMarkup(text)} />
                <hr />

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


const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';
