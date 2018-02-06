import React from 'react';
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
import ReactJson from 'react-json-view';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';
import FaCopy from 'react-icons/lib/fa/copy';

import api from '../../../constance/api.js';
import '../../product/product.css';


export default class ShowDataCollection extends React.Component {

    constructor() {
        super()
        this.state = {
            dataCollection: {},
            modalOpen: false
        }
        this.formatDate = this.formatDate.bind(this);
        this.genTicket = this.genTicket.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    closeModal() {
        this.setState({ modalOpen: false });
    }

    genTicket() {
        this.setState({ modalOpen: true });
    }


    formatDate(date) {
        const value = new Date(date);
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }

    render() {
        const { dataCollection, modalOpen } = this.state;

        return (
            <Container>

                <ModalComponent isOpen={modalOpen} toggle={this.closeModal} />

                <div className='img-product'>
                    <img
                        src={ dataCollection.icon==null? noImageAvialable: dataCollection.icon }
                        className='img-fluid img-thumbnail'
                        alt='smartcity_product_name'
                    />
                </div>
                <div className='product-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{ dataCollection.collectionName }</h3>
                    <div className='link'>
                        <Button
                            size='sm'
                            className='btn-smooth btn-raised-success right'
                            style={{ height: '34px' }}
                            onClick={this.genTicket}
                        >
                            Gen Ticket
                        </Button>
                    </div>
                </div>
                <div className='product-header-description'>
                    <p><FaCalendarO color='#56b8db' />  { this.formatDate(dataCollection.timestamp) }</p>
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


const noImageAvialable = 'http://www.freeiconspng.com/uploads/no-image-icon-6.png';


const ModalComponent = ({ isOpen, toggle }) => (
    <Modal size='lg' isOpen={isOpen} fade={true} toggle={toggle}>
        <ModalHeader toggle={this.toggle}>Generate Ticket Success</ModalHeader>
        <ModalBody>
            Your ticket is

            eyJkYXRhIjoiZmt5MWlZMGlyU3hQOFl6Rk5pWXlTVmE5NWg2cnZPZEthM29ma01kMzFSZTFKVFZGN2pTLUh0Mjlk
            VmpLZDNYWkRqblowMmxEUGdVR0h6VFhBMHEtaXl0dy00eTBUN1pwMloxdjlJRE5EWG5aSXYySnJmUGdpb2Zn
            RERFNmZDaUhCRnhtZVBuQ1VBalh5MkJ3d1BmVnUyUWhKZHF0YTl3U1UzajhLYjdaZ21ubkdHUTNpVjBvWEhZNz
            RiRkhFejcxMlItTVM1VGY4eVIyTVBCUm1sT2xPODRWbDdEdG5SdkdaVFEzOHNpbko4My1hY1k3dGRGakdHZEQ
            yWWdYZUFscmxEY08yRG9NRGUzR1hsamJqYjgybk93VkQyQW9QMkFKX0VHV0JMNGlBYWgzbzY1OUw0dFhqW
            EdXUU8zQUtLMWRpaElNbFVGczJkclZRN2F3dTJKLWJxUFdFWlloTnZLLVV5eFNhZnIwbTUtQ016T1VTYTVoYmZLe
            nBjNXNuNGE0ZnFoMjNERTlDYWRqVHdTbVYxYWtfemtQNVh1Rnp0TllFYzE0WjFzUzRZNHJCZlBfbkpRMDZkUz
            ZTZ2puTUtURWpnUWFxTG9ubUc0TGRHSG5zaU5WamhGUXpKdnJXMFVBWV9fZVZELUdqRGVKQ3dsS3RPbXFja
            3NiWTNmYTBfSnM4NmRmeEdvQjlVT1NVWndSM2daclF3PT0iLCJrZXkiOiJKcmNYWFhNQ1dNRmZrM
            jBRbERNdk1KWGZpcDMweG9kM2pLNWUxM1d1MlNoMFNUODFMaHRYU1RUSGN1M01oTzVfekw1ZTltSk
            01TUhTZGlRQndWdC1nY1BlS25VTXFfYmhyYnMzSE9qRk55anhaNThlX2d5QnhROVJ5QlNmdVRSSWpQQ
            mhqOEUtLXJGdWNXX2RndjJnU0RyWFloSmd4RDFlYWVQa2ExVkVWQjM3NVhWUUxzUlhUTzBOUTI2eS1jZ
            nRqVS02UXhNdjcyNG9DSHFydXFMTkRTODNlLW9HYlp3UkhlaDJCdDJpTzFjLW82T2lXR3NsS0tob1Yxekg
            xSy1HWU81VFQxQzM0Y1hLNTk3UnpJd1pTN01NX2JIdEtmX1lHOWNvUUhvR3NrQjZRRTBqZHVzeGR0eDlyY2Z0
            VlFqQl9zc2tuMFVNT0RBS1pfMXhnSTFyY2c9PSJ9
        </ModalBody>
        <ModalFooter className='link'>
            <Button className='btn-smooth btn-raised-info'> <FaCopy /> Copy</Button>
            <div className='btn-invisible' onClick={toggle}>
                Close
            </div>
        </ModalFooter>
    </Modal>
)
