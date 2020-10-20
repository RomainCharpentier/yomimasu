import React from 'react';
import { FormGroup, FormControl } from "react-bootstrap";

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