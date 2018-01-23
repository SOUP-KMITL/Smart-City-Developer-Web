import React from 'react';
import {
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

// Icons
import MdSearch from 'react-icons/lib/md/search';

export default class MainSearchBar extends React.Component {


    render() {
        return (
            <InputGroup>
                <Input placeholder="Search..." />
                <InputGroupAddon><MdSearch /></InputGroupAddon>
            </InputGroup>
        );
    }
}

