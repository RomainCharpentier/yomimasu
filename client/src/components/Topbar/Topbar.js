import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavItem } from "react-bootstrap";

export class Topbar extends React.Component {
    render() {
        return(
            <Navbar className="bg-dark navbar-dark navbar-expand-sm">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}