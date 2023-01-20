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

function HikeForm() {

  //     {ask for state and trail before difficulty} Date > State > Trail (Selection) > Difficulty > Description > Submit 

  
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
  )
}

export default HikeForm;