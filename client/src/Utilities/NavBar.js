import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    const auth = useContext(AuthContext);

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"> NavBar </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}
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