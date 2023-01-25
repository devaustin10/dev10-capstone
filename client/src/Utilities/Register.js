import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Username set name event must also be used for the Hike 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // need a fetch request for POST hiker that is run before app_user POST

        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name,
                password
            })
        });

        if (response.status === 201) {
            navigate("/login");
        } else if (response.status === 400) {
            console.log("Error sending...");
        } else {
            console.log("Weird error!");
        };
    }

    return (
        <>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user-name">Username:</label>
                <input type="name" id="user-name" onChange={(event) => setName(event.target.value)} />
                <label htmlFor="user-password">Password</label>
                <input type="password" id="user-password" onChange={(event) => setPassword(event.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default Register;