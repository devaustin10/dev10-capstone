import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Register() {
    const [hikerId, setHikerId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const firstResponse = await fetch("http://localhost:8080/hiker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // switch order of the fetches

                // THIS MIGHT NOT BE NEEDED AND MIGHT NEED TO CHANGE TO ALLOW ANYONE TO ADD A HIKER (403 error, permission denied)
                // Authorization: "Bearer " + auth.currentUser.token, ()
            },
            body: JSON.stringify({
                hikerId: hikerId,
                firstName: firstName,
                lastName: lastName,
                age: age
            })
        });

        // MIGHT HAVE TO MAKE SEPARATE RESPONSES FOR EACH SCENARIO
        if (firstResponse.status === 201 && response.status === 201) {
            navigate("/login");
        } else if (firstResponse.status === 400 || response.status === 400) {
            console.log("Error sending...");
        } else {
            console.log("Weird error!");
        }
    }

    return (
        <>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

            <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={(event) => setUsername(event.target.value)} />

                <label htmlFor="hiker-id">Retype Username:</label>
                <input type="text" id="hiker-id" onChange={(event) => setHikerId(event.target.value)} />

                <label htmlFor="first-name">First Name:</label>
                <input type="text" id="first-name" onChange={(event) => setFirstName(event.target.value)} />

                <label htmlFor="last-name">Last Name:</label>
                <input type="text" id="last-name" onChange={(event) => setLastName(event.target.value)} />

                <label htmlFor="age">Age:</label>
                <input type="number" id="age" onChange={(event) => setAge(event.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default Register;
