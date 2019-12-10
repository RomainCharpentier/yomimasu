import React from 'react';
import { FormGroup, FormControl, Image } from "react-bootstrap";

export class ImageInput extends React.Component {

    constructor(props) {
        super(props);
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