import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import Error from "./Error";
// NEW: import AuthContext
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // NEW: grab the value attribute from AuthContext.Provider
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    // This code executes if the request is successful
    if (response.status === 200) {
      const { jwt_token } = await response.json();
      console.log(jwt_token);
      // NEW: login!
      auth.login(jwt_token);
      navigate("/");
    } else if (response.status === 403) {
      setErrors(["Login failed."]);
    } else {
      setErrors(["Unknown error."]);
    }
  };

  return (
    <div>
      <div className="forest">
        <Card bg="dark">
      <h2 className="ms-4 mb-3">Login</h2>
      {errors.map((error, i) => (
        <Error key={i} msg={error} />
      ))}
      <form className="navhead" onSubmit={handleSubmit}>
        <div>
          {/* Includes for/id attributes for basic HTML accessibility ♿. */}
          <label className="ms-4 mb-3" htmlFor="username">Username:</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            id="username"
          />
        </div>
        <div>
          <label className="ms-4 mb-3" htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
        </div>
        <div>
          <Button className="ms-4 mb-3" type="submit" variant="outline-success">Login</Button>
        </div>
      </form>
      </Card>
      </div>
    </div>
  );
}
