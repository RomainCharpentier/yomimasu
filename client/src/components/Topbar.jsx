import React, { useState, useRef } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import API from '../utils/API';

const TopBar = () => {

    const [isAuth, setIsAuth] = useState(API.isAuth());
    const [searchText, setSearchText] = useState('');
    const searchRef = useRef(null);
    const history = useHistory();

    const handleChange = event => {
        setSearchText(event.target.value);
    }

    const handleClick = () => {
        history.push(`/users/${searchText}`);
        // Clear the search value (state and input)
        setSearchText('');
        searchRef.current.value = '';
    }

    const handleKeyPress = event => {
        if (event.charCode === 13) {
            history.push(`/users/${searchText}`);
            // Clear the search value (state and input)
            setSearchText('');
            searchRef.current.value = '';
        }
    }

    const getPublicBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Accueil</Nav.Link>
                <Nav.Link href="/signup">Inscription</Nav.Link>
                <Nav.Link href="/signin">Connexion</Nav.Link>
            </Nav>
        );
    }

    const getPrivateBar = () => {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="/">Accueil</Nav.Link>
                <Nav.Link href="/profile">Profil</Nav.Link>
                <Nav.Link href="/book_list">Livres</Nav.Link>
                <Nav.Link href="/write">Écrire</Nav.Link>
                <Nav.Link href="/users">Utilisateurs</Nav.Link>
                <Nav.Link href="/signout">Déconnexion</Nav.Link>
            </Nav>
        );
    }

    let links;
    if (isAuth) {
        links = getPrivateBar();

    } else {
        links = getPublicBar();
        
    }

    return (
        <Navbar className="bg-dark navbar-dark navbar-expand-sm">
            <Navbar.Brand href="/">Yomimasu</Navbar.Brand>
            {links}
            <Form inline>
                <FormControl ref={searchRef} type="text" placeholder="Search" className="mr-sm-2" onChange={handleChange} onKeyPress={handleKeyPress} />
                <Button variant="outline-info" onClick={handleClick}>Search</Button>
            </Form>
        </Navbar>
    );
}

export default TopBar;