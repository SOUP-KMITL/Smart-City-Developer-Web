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

import '../../product/product.css';


export default class ShowDataCollection extends React.Component {


    createMarkup(text) {
        return {
            __html: text
        };
    };


    render() {
        const text = `<h4><a href=''>Support html <i>text</i> </a></h4> Information and communication technology (ICT) is used to enhance quality, performance and interactivity of urban services, to reduce costs and resource consumption and to increase contact between citizens and government. Smart city applications are developed to manage urban flows and allow for real-time responses. A smart city may therefore be more prepared to respond to challenges than one with a simple 'transactional' relationship with its citizens. Yet, the term itself remains unclear to its specifics and therefore, open to many interpretations.  `;
        const json ={ time: "04:36:42 PM", milliseconds_since_epoch: 1516725402998, date: "01-23-2018" };

        return (
            <h1>Hello</h1>
        );
    }
}
