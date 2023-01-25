import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavBar() {

    const auth = useContext(AuthContext);

    return (
      <>
        <Navbar sticky="top" className="navhead shadow-lg" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
          <img
              src="/images/lo_logo.svg"
              width="75%"
              height="75%"
              className="d-inline-block align-top ms-2"
              alt="LogOut Hiking"
            />
          </Navbar.Brand>
            <Container>
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link href="about">About</Nav.Link>
                {auth.currentUser ? (
                <>
                <NavDropdown title="Hikes" id="basic-nav-dropdown">
                  <NavDropdown.Item href="hikes">All Hikes</NavDropdown.Item>
                  <NavDropdown.Item eventKey="disabled" href="friendlist">Friend Hikes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="add">Add Hike</NavDropdown.Item>
                  <NavDropdown.Item href="milestones">
                    Milestones
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="profile">Profile</Nav.Link>
                </>  
                ) : null}

                {auth.currentUser ? ( 
                <Button className= "ms-2" variant="outline-success" onClick={() => auth.logout()}>
                  Logout
                </Button> ) : ( 
                <Link to="/login">
                  <Button className= "ms-2" variant="outline-success"> Login </Button>
                </Link> )}

                {auth.currentUser ? ( 
                null ) : ( 
                <Link to="/register">
                  <Button className= "ms-2" variant="outline-success"> Register </Button>
                </Link> )}
              
              </Nav>
          </Container>
        </Navbar>
        </>
      );
    }

export default NavBar;
