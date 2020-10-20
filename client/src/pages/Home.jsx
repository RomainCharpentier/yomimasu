import React from 'react';
import { Jumbotron } from "react-bootstrap";

export class Home extends React.Component {
    
    render() {
        return (
            <Jumbotron >
                <h1>Fluid jumbotron</h1>
                <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                </p>
            </Jumbotron>
        );
    }
}