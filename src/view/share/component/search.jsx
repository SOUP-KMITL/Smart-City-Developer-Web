import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    InputGroup,
    ButtonGroup,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { StyledText, Form, Radio, RadioGroup, StyledSelect, NestedForm } from 'react-form';

// Icons
import MdSearch from 'react-icons/lib/md/search';

export default class MainSearchBar extends React.Component {

    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            dropdownButtonName: 'City service',
            keyword: null,
            urlsearch: 'cityservice'
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    setDropdownButtonName(name) {
        if (name == 'Data collection')
            this.setState({ urlsearch: 'datacollection', dropdownButtonName: name  });
        else
            this.setState({ urlsearch: 'cityservice', dropdownButtonName: name  });
    }

    submitSearch(value) {
        if (value.keyword)
            this.setState({
                keyword: value.keyword,
            });
    }

    render() {
        const { dropdownButtonName, keyword, urlsearch } = this.state;

        if (keyword)
            return <Redirect push from='/' to={`/search/${urlsearch}/${keyword}/page/1`} />;
        else
            return (
                <Form onSubmit={submittedValues => this.submitSearch(submittedValues)}>
                    { formApi => (
                        <form onSubmit={formApi.submitForm} style={{ float: 'right' }}>
                            <InputGroup style={{ marginBottom: '50px' }}>
                                <ButtonGroup>
                                    <StyledText placeholder='Search...' field='keyword' className='text-input login-input' style={{ width: '100%' }} />
                                    <ButtonDropdown
                                        isOpen={this.state.dropdownOpen}
                                        toggle={this.toggle}>
                                        <DropdownToggle caret className='btn-info' style={{ height: 46 }}>
                                            { dropdownButtonName }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={ () => this.setDropdownButtonName('City service') }>City service</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={ () => this.setDropdownButtonName('Data collection') }>Data collection</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                    <Button type='submit' style={{ height: 46, width: 46 }} className='btn-smooth btn-info pointer'><MdSearch /></Button>
                                </ButtonGroup>
                            </InputGroup>
                        </form>
                    )}
                </Form>
            );
    }
}


