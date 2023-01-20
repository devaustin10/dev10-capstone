import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {

    const auth = useContext(AuthContext);

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavBar.Brand href="#home">NavBar</Navbar.Brand>
            </Container>
        </NavBar>








        </>
    );
}