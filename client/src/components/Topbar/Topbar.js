import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import API from '../../utils/API';

export class Topbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth : API.isAuth()
        };
    }

    getPublicBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/signin">Signin</Nav.Link>
            </Nav>
        );
    }

    getPrivateBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/signout">Signout</Nav.Link>
            </Nav>
        );
    }

    render() {
        const isAuth = this.state.isAuth;
        var links;
        if (isAuth) {
            links = this.getPublicBar();

        } else {
            links = this.getPrivateBar();
            
        }

        return (
            <Navbar className="bg-dark navbar-dark navbar-expand-sm">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                {links}
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        );
    }
}