import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    const auth = useContext(AuthContext);


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
          <img
              src="/images/placeholder.svg"
              width="50%"
              height="50%"
              className="d-inline-block align-top ms-2"
              alt="LogOut Hiking"
            />
          </Navbar.Brand>
            <Container>
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <Nav.Link href="about">About</Nav.Link>
                <NavDropdown title="Hikes" id="basic-nav-dropdown">
                  <NavDropdown.Item href="hikes">All Hikes</NavDropdown.Item>
                  <NavDropdown.Item href="friendlist">Friend Hikes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="milestones">
                    Milestones
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="profile">Profile</Nav.Link>
              </Nav>
          </Container>
        </Navbar>
      );
    }






//     return (
//         <>
//         <Navbar bg="light">
//             <Container>
//                 <Navbar.Brand href="#home"> LogOut </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             {auth.currentUser ? (
//                         <LinkContainer to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                             <Nav.Link>
//                                 About
//                             </Nav.Link>
//                         </LinkContainer>
//                     ) : null}
//               {auth.currentUser ? (
//                         <Nav.Link href="/hike" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} id="basic-nav-dropdown">
//                             <NavDropdown.Item href="/hikes">All Hikes</NavDropdown.Item>
//                             <NavDropdown.Item href="/myhikes">My Hikes</NavDropdown.Item>
//                             <NavDropdown.Item href="/add">Add Hike</NavDropdown.Item>
//                         </Nav.Link>
//                     ) : null}
//           </Nav>
//         </Navbar.Collapse>
//         </Container>
//         </Navbar>
//         </>
//     );
// }
export default NavBar;


// // NEW: import the useContext hook.
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// // NEW: import the AuthContext
// import AuthContext from "../Context/AuthContext";
//
// function NavBar() {
//   // NEW: grab the value attribute from AuthContext.Provider
//   const auth = useContext(AuthContext);
//
//   // NEW: If we have an auth.user, render an "Add" link,
//   // the user's username, and a logout button.
//   // If we don't have an auth.user, render "Login"
//   // and "Register" navigation.
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {auth.user ? (
//           <li>
//             <Link to="/add">Add</Link>
//           </li>
//         ) : (
//           <>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </>
//         )}
//       </ul>
//       {auth.user && (
//         <div>
//           Welcome {auth.user.username}!
//           <button onClick={() => auth.logout()}>Logout</button>
//         </div>
//       )}
//     </nav>
//   );
// }
//
// export default NavBar;