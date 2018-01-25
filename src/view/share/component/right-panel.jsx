import React from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

// Icons
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import FaUser from 'react-icons/lib/fa/user';



export default class MainRightPanel extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav tabs className='nav-tab'>
                    <NavItem>
                        <NavLink
                            className={({ active: this.state.activeTab === '1'})}
                            onClick={() => { this.toggle('1'); }}
                        >
                            {'popular'.toUpperCase()}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            { 'recent'.toUpperCase() }
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} className='tab-content'>
                    <TabPane tabId='1'>
                        <TabpaneMenu size={3} />
                    </TabPane>
                    <TabPane tabId='2'>
                        <TabpaneMenu size={2} />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const TabpaneMenu = ({ size }) => (
    [...Array(size)].map((item, i) => {
        return (
                    <div className={`media ${i!==size-1? 'media-border': ''} media-bordertop`}>
                        <img
                            src='https://us.123rf.com/450wm/bagotaj/bagotaj1606/bagotaj160600068/58298491-smart-city-design-concept-with-icons.jpg?ver=6'
                            className='img-thumbnail media-img'
                            alt=''
                        />

                    <div className='media-content'>
                        <strong>header</strong>
                        <p className='mymenu-header-footer'>
                            <FaCalendarO className='mymenu-icon'/>
                            <span style={{ marginRight: '16px' }}> 01/01/2018</span>
                            <FaUser className='mymenu-icon'/>
                            <span> Admin</span>
                        </p>
                    </div>
                </div>
        )
    })
)
