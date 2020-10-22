import React from 'react';
import { FormGroup, FormControl } from "react-bootstrap";
import PropTypes from 'prop-types';

export class ImageInput extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <FormGroup controlId="avatar">
                <FormControl type="file" accept="image/*" onChange={this.props.action} />
            </FormGroup>
        );
    }
}

ImageInput.defaultProps = {
    action: ""
}

ImageInput.propTypes = {
    action: PropTypes.func
}