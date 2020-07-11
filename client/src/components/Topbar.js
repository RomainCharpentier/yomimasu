import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import API from '../utils/API';

export class Topbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth : API.isAuth(),
            searchText: ''
        };
        this.searchRef = React.createRef();
        this.handleChange.bind(this);
        this.handleClick.bind(this);
    }

    handleChange = event => {
        this.setState({searchText: event.target.value});
    }

    handleClick = () => {
        console.log(this.state.searchText);
        // Clear the search value (state and input)
        this.setState({searchText: ''});
        this.searchRef.current.value = '';
    }

    getPublicBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Accueil</Nav.Link>
                <Nav.Link href="/signup">Inscription</Nav.Link>
                <Nav.Link href="/signin">Connexion</Nav.Link>
            </Nav>
        );
    }

    getPrivateBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Accueil</Nav.Link>
                <Nav.Link href="/profile">Profil</Nav.Link>
                <Nav.Link href="/book_list">Book List</Nav.Link>
                <Nav.Link href="/write">Write</Nav.Link>
                <Nav.Link href="/signout">Déconnexion</Nav.Link>
            </Nav>
        );
    }

    render() {
        const isAuth = this.state.isAuth;
        var links;
        if (isAuth) {
            links = this.getPrivateBar();

        } else {
            links = this.getPublicBar();
            
        }

        return (
            <Navbar className="bg-dark navbar-dark navbar-expand-sm">
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                {links}
                <Form inline>
                    <FormControl ref={this.searchRef} type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange} />
                    <Button variant="outline-info" onClick={this.handleClick}>Search</Button>
                </Form>
            </Navbar>
        );
    }
}