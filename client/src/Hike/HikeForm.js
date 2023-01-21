import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Follow SightingForm.js file from React Security lms lesson

// const DEFAULT_HIKE = {
//   hikeId - Auto-Generated
//   hikeDate - Date data type - calendar selector
//   hikeDifficulty - Prompt: "How difficult did you feel this hike was?" - Selection, not text box

//   description - Text area

//   hikerId - Needs to be tied to current currentUser / Except when an ADMIN is editing
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
    formState: { errors },
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
      hikeDate: "",
      hikeDifficulty: "",
      description: "",
      hikerId: "",
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
        .then((response) => parseResponseMessage(response))
        .then((hike) => {
          setValue("hikeDate", hike.hikeDate);
          setValue("hikeDifficulty", hike.hikeDifficulty);
          setValue("description", hike.description);
          setValue("hikerId", hike.hikerId);
          setValue("trailId", hike.trailId);
        })
        .catch((error) => {
          // If a currentUser tries to access an hike by an ID that doesn't exist in the database...
          if (error.message === "Unexpected end of JSON input") {
            navigate("/404");
          } else {
            setMessages([
              ...messages,
              { id: makeId(), type: "failure", text: error.message },
            ]);
          }
        });
    }
  }, []);

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
        .then((response) =>
          parseResponseMessage(response, revisedHikeData, "edited")
        )
        .then(() => navigate("/hikes"))
        .catch((error) =>
          setMessages([
            ...messages,
            { id: makeId(), type: "failure", text: error.message },
          ])
        );
    } else {
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
        .then((response) => parseResponseMessage(response))
        .then((hikeData) =>
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
      <Form id="hike-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>State:</Form.Label>
          <Form.Select placeholder="State">
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
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3" htmlFor="hikeDate">
            Enter date of hike:"
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

        <Form.Group>
          <Form.Label className="mt-3" htmlFor="hikeDifficulty">
            How difficult did you feel this hike was?
          </Form.Label>
          <Form.Select placeholder="Choose how difficult the hike was:">
            <option value="1">Easy</option>
            <option value="2">Easy/Intermediate</option>
            <option value="3">Intermediate</option>
            <option value="4">Intermediate/Difficult</option>
            <option value="5">Difficult</option>
            {...register("hikeDifficulty", {
              required: "Must select hike difficulty.",
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3" htmlFor="hikeDescription">
            How was your hike?
          </Form.Label>
          <Form.Control
            type="text"
            id="hikeDescription"
            {...register("hikeDescription", {
              required: "Must select a hike description.",
            })}
          />
          <Form.Text className="form-error-message">
            {errors.hikeDescription?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3" htmlFor="hikePhoto">
            Attach photo of hike:
          </Form.Label>
          <Form.Control
            type="file"
            id="hikePhoto"
            accept=".jpg,.png,.jpeg"
            {...register("hikePhoto", {
              required: "Must select a hike photo.",
            })}
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default HikeForm;
