import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useForm } from 'react-hook-form';



function HikeForm({ messages, setMessages, makeId, parseResponseMessage, trails }) {
  //     {ask for state and trail before difficulty} Date > State > Trail (Selection) > Difficulty > Description > Submit

  const [ stateTrails, setStateTrails ] = useState([]);

  const { hikeId } = useParams();

  const auth = useContext(AuthContext);



  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    reset({
      state: "",
      hikeDate: "",
      hikeDifficulty: "",
      description: "",
      trailId: "",
    });
  }, [window.location.pathname]);

  useEffect(() => {
    if (hikeId) {
      fetch("http://localhost:8080/hike/" + hikeId, {
        headers: {
          Authorization: "Bearer " + auth.currentUser.token,
        },
      })
        .then(parseResponseMessage)
        .then((hike) => {

          if(hike) {
          setValue("hikeDate", hike.hikeDate);
          setValue("hikeDifficulty", hike.hikeDifficulty);
          setValue("description", hike.description);
          setValue("hikerId", hike.hikerId);

          const trailFinder = trails.find(tr => tr.trailId === hike.trailId)?.state;
          setValue("state", trailFinder);

          const matchingTrails = trails.filter(tr => tr.state == trailFinder);
          setStateTrails(() => {
            setValue("trailId", hike.trailId)
            return matchingTrails
          });
        } else {
          navigate("/HikeForm");
        }
      })  
        .catch((error) => {
            setMessages([
              ...messages,
              { id: makeId(), type: "failure", text: error.message },
            ]);
          
        });
      
    }
  }, []);

  const trailPopulator = (event) => {
    const matchingTrails = trails.filter(tr => tr.state == event.target.value);
    setStateTrails(matchingTrails);
  }


  const onSubmit = (hikeData) => {
    let revisedHikeData = { ...hikeData };

    if (hikeId) {
      revisedHikeData["hikeId"] = hikeId;

      fetch("http://localhost:8080/hike/" + hikeId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.currentUser.token,
        },
        body: JSON.stringify(revisedHikeData),
      })
        .then((response) => {
          debugger 
          
          return parseResponseMessage(response, revisedHikeData, "edited") 
        })  
        .then(() => navigate("/hikes"))
        .catch((error) =>
          setMessages([
            ...messages,
            { id: makeId(), type: "failure", text: error.message },
          ])
        );
    } else {
      revisedHikeData.hikerId = auth.currentUser.username;
      console.log("Token: ", auth.currentUser);
      console.log("Hike Data: ", revisedHikeData);
      fetch("http://localhost:8080/hike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.currentUser.token,
        },
        body: JSON.stringify(revisedHikeData),
      })
        .then((response) => (response.json()))
        .then((hikeData) => ("return response",console.log(hikeData)),
          setMessages([
            ...messages,
            {
              id: makeId(),
              type: "success",
              text: `Hike ${hikeData.hikeId} was successfully added.`,
            },
          ])
        )
        .then(() => navigate("/hikes"))
        .catch((error) =>
          setMessages([
            ...messages,
            { id: makeId(), type: "failure", text: error.message },
          ])
        );
    }
  };

  return (
    <>
    <div className="forest">
      <Card bg="dark">
      <Form id="hike-form" className="form col-lg-6 offset-lg-3 navhead" onSubmit={handleSubmit(onSubmit)}>
        <br></br>
        <Form.Group className="mt-6 ms-4" controlId="state">
          <Form.Label>State:</Form.Label>
          <Form.Select 
            id="state" 
            {...register("state", { required: "Must select a state.", onChange: (e) => {trailPopulator(e)}} )} 
          >
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="DC">Washington, District of Columbia</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Form.Select>
          <Form.Text className="form-error-message">
            {errors.state?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 mb-3 ms-4" controlId="trail">
          <Form.Label>Trail:</Form.Label>
          <Form.Select 
            id="trail"
            {...register("trailId", { required: "Must select a trail." })} 
          >
            {stateTrails.map(tr => (<option key={tr.trailId} value={tr.trailId}>{tr.trailName}</option>))}
          </Form.Select>
          <Form.Text className="form-error-message">
            {errors.trail?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 ms-4">
          <Form.Label htmlFor="hikeDate">
            Enter date of hike:
          </Form.Label>
          <Form.Control
            type="date"
            id="hikeDate"
            {...register("hikeDate", { required: "Must select a hike date." })}
          />
          <Form.Text className="form-error-message">
            {errors.hikeDate?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 ms-4">
          <Form.Label htmlFor="hikeDifficulty">
            How difficult did you feel this hike was?
          </Form.Label>
          <Form.Select placeholder="Choose how difficult the hike was:"
            {...register("hikeDifficulty", {
              required: "Must select hike difficulty.",
            })}
            >
            <option value="Easy">Easy</option>
            <option value="Easy/Intermediate">Easy/Intermediate</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Intermediate/Difficult">Intermediate/Difficult</option>
            <option value="Difficult">Difficult</option>
          </Form.Select>
          <Form.Text className="form-error-message">
            {errors.hikeDifficulty?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 ms-4">
          <Form.Label htmlFor="description">
            How was your hike?
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="description"
            {...register("description", {
              required: "Must select a hike description.",
            })}
          />
          <Form.Text className="form-error-message">
            {errors.description?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mt-3 ms-4">
        
        <Button variant="success" className="mt-3 mb-5" type="submit">{hikeId ? "Edit" : "Add"}</Button>
        <Button variant="danger" className="mt-3 ms-2 mb-5" type="button" onClick={() => navigate("/hikes")}>Cancel</Button>
        </Form.Group>
      </Form>
      </Card>
      </div>
    </>
  );
}

export default HikeForm;