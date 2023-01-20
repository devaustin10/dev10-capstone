// NEW: Import the useEffect hook
// npm install bootstrap@5.2.3



import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Confirmation from "./Utilities/Confirmation";
import Error from "./Utilities/Error";
import Home from "./Utilities/Home";
import NavBar from "./Utilities/NavBar";
import NotFound from "./Utilities/NotFound";
import HikeForm from "./Utilities/HikeForm";
import Login from "./Utilities/Login";
import AuthContext from "./Context/AuthContext";

// NEW: Define a variable for the localStorage token item key
const LOCAL_STORAGE_TOKEN_KEY = "hikeHikingToken";

function App() {

  const [hikes, setHikes] = useState([]);

  const [user, setUser] = useState(null);
  // NEW: Define a state variable to track if 
  // the restore login attempt has completed
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  // NEW: Define a useEffect hook callback function to attempt
  // to restore the user's token from localStorage
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    // NEW: set the token in localStorage
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    // Decode the token
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);
  
    // Split the authorities string into an array of roles
    const roles = authoritiesString.split(',');
  
    // Create the "user" object
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
  
    // Log the user for debugging purposes
    console.log(user);
  
    // Update the user state
    setUser(user);
  
    // Return the user to the caller
    return user;
  };
  
  const logout = () => {
    setUser(null);
    // NEW: remove the token from localStorage
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  // NEW: If we haven't attempted to restore the login yet...
  // then don't render the App component
  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/edit/:id" element={user ? <HikeForm /> : <Navigate to="/login" replace={true} />} />
          <Route path="/add" element={user ? <HikeForm /> : <Navigate to="/login" replace={true} />} />
          <Route path="/confirmation" element={<Confirmation />}/>
          <Route path="/error" element={<Error />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element ={!user ? <Login /> : <Navigate to="/" replace={true} />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
