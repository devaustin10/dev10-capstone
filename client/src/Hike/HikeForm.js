import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Follow SightingForm.js file from React Security lms lesson

// const DEFAULT_HIKE = {
//   hikeId - Auto-Generated
//   hikeDate - Date data type - calendar selector 
//   hikeDifficulty - Prompt: "How difficult did you feel this hike was?" - Selection, not text box

//   description - Text area

//   hikerId - Needs to be tied to current user / Except when an ADMIN is editing 
//   Ask for State
// Pick trail from dropdown filtered by state
//   trailId - Dropdown Menu to select Trail by Name, which passes appropriate ID to fetch request
// }

function HikeForm({ messages, setMessages, makeId, parseResponseMessage }) {

  //     {ask for state and trail before difficulty} Date > State > Trail (Selection) > Difficulty > Description > Submit 

  const { hikeId } = useParams();

    const auth = useContext(AuthContext);

    const { 
        register, 
        handleSubmit,
        setValue, 
        reset,
        formState: { errors } 
    } = useForm();

    const navigate = useNavigate();

    // this.hikeId = hikeId;
    // this.hikeDate = hikeDate;
    // this.hikeDifficulty = hikeDifficulty;
    // this.description = description;
    // this.hikerId = hikerId;
    // this.trailId = trailId;

    useEffect(() => {
        reset({ 
            hikeDate: '',
            hikeDifficulty: '',
            description: '',
            hikerId: '',
            trailId: ''
        });
    }, [window.location.pathname]);

    useEffect(() => {
        if (hikeId) {
            fetch("http://localhost:8080/hike/" + hikeId, {
                headers: {
                    Authorization: "Bearer " + auth.user.token
                }
            })
            .then(response => parseResponseMessage(response))
            .then(hike => {
                setValue("hikeDate", hike.hikeDate);
                setValue("hikeDifficulty", hike.hikeDifficulty);
                setValue("description", hike.description);
                setValue("hikerId", hike.hikerId);
                setValue("trailId", hike.trailId);
            })
            .catch(error => {
                // If a user tries to access an hike by an ID that doesn't exist in the database...
                if (error.message === "Unexpected end of JSON input") {
                    navigate("/404");
                } else {
                    setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]);
                }
            });
        }
    }, []);

    const onSubmit = (hikeData) => {
        let revisedHikeData = {...hikeData};

        if (hikeId) {
            revisedHikeData["hikeId"] = hikeId;

            fetch("http://localhost:8080/hike/" + hikeId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.user.token
                },
                body: JSON.stringify(revisedHikeData)
            })
            .then(response => parseResponseMessage(response, revisedHikeData, "edited"))
            .then(() => navigate("/hikes"))
            .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
        } else {
            console.log("Token: ", auth.user)
            console.log("Hike Data: ", revisedHikeData)
            fetch("http://localhost:8080/hike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.user.token
                },
                body: JSON.stringify(revisedHikeData)
            })
            .then(response => parseResponseMessage(response))
            .then(hikeData => setMessages([...messages, { id: makeId(), type: "success", text: `Hike ${hikeData.hikeId} was successfully added.` }]))
            .then(() => navigate("/hikes"))
            .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
        };
    };

  
  return (
    <Form> 
      <Form.Group className="mb-3" controlId="formDate">
      <Form.Label>Date of hike:</Form.Label>
      <Form.Control type="date" placeholder="Enter date of hike:" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formDifficulty"></Form.Group>
      <Form.Label>How difficult did you feel this hike was?</Form.Label>
      <Form.Select placeholder="Choose how difficult the hike was:">
            <option>Easy</option>
            <option>Easy/Intermediate</option> //intermediate, intermediate/difficult, difficult
            <option>Intermediate</option>
            <option>Intermediate/Difficult</option>
            <option>Difficult</option>
      </Form.Select>

      <Form.Group className="mb-3" controlId=""
  
      onSubmit={handleSubmit}>
      <h2>{hike.hikeId ? "Edit Hike" : "Add Hike"}</h2>
      <div>
      <label htmlFor="hikeDate"></label>
      <input
       type="date"
       id="hikeDate"
       required
       value={hike.hikeDate}
       name="hikeDate"
       onChange={handleChange}
       />
      </div>
      
      <div>
      <label htmlFor="hikeDifficulty"></label>
      <select
      type=""
      id="hikeDifficulty"
      required
      value={hike.hikeDifficulty}
      name="hikeDifficulty"
      onChange={handleChange}
      />
      <label htmlFor="description">
      <input 
      type ="textarea"
      id="description"
      required
      value={hike.description}
      name="description"
      onChange={handleChange}
      />
      </label>
      </div>
    <div>HikeForm</div>
    </Form>
  );
};

export default HikeForm;