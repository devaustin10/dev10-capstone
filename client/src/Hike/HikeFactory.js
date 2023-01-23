import { useEffect, useContext } from 'react';
import Hike from "./Hike";
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";


//modeled from FA react bootstrap
function HikeFactory({ hike, trail, hiker, hikes, setHikes, messages, setMessages, makeId, parseResponseMessage}) {


    // const auth = useContext(AuthContext);
  
    // const navigate = useNavigate();
  
    // useEffect(() => {
    //   fetch("http://localhost:8080/hike")
    //     .then((response) => response.json())
    //     .then((data) => setHikes(data));
    // }, []); // this will happen only once when the component is loaded

    // const handleEdit = (hikeId) => {
    //     fetch("http://localhost:8080/hike/" + hikeId, {
    //       method: "EDIT",
    //       headers: {
    //         Authorization: "Bearer " + auth.currentUser.token
    //       }
    //     })
    //     .then(response => {
    //       if (response.status === 204) {
    //         navigate("/confirmation", { state: { msg: "👍🏾 Edit Successful" }});
    //       } else if (response.status === 403) {
    //         navigate("/error", { state: { msg: "👎🏾 Not Authorized for this action." }});
    //       } else if (response.status === 404) {
    //         navigate("/error", { state: { msg: "👎🏾 No Hike to edit at this address." }});
    //       } else if (response.status === 412) {
    //         navigate("/error", { state: { msg: "👎🏾 Action could not be completed." }});
    //       } else {
    //         navigate("/error", { state: { msg: "👎🏾 Weird error! Go back to home!" }});
    //       }
    //     })
    //     .catch(err => navigate("/error", { state: { msg: "👎🏾 " + err.msg }}));
    //   };
  
    // const handleDelete = (hikeId) => {
    //   fetch("http://localhost:8080/hike/" + hikeId, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: "Bearer " + auth.currentUser.token
    //     }
    //   })
    //   .then(response => {
    //     if (response.status === 204) {
    //       navigate("/confirmation", { state: { msg: "👍🏾 Delete Successful" }});
    //     } else if (response.status === 403) {
    //       navigate("/error", { state: { msg: "👎🏾 Not Authorized for this action." }});
    //     } else if (response.status === 404) {
    //       navigate("/error", { state: { msg: "👎🏾 No Hike to delete at this address." }});
    //     } else if (response.status === 412) {
    //       navigate("/error", { state: { msg: "👎🏾 Action could not be completed." }});
    //     } else {
    //       navigate("/error", { state: { msg: "👎🏾 Weird error! Go back to home!" }});
    //     }
    //   })
    //   .catch(err => navigate("/error", { state: { msg: "👎🏾 " + err.msg }}));
    // };
    // return hikes.map((hikes) => (
    //   <Hikes key={hikes.hikesId} hikes={hikes} 
    //     handleDelete={handleDelete} />
    // ));
    
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      getHikes();
    }, []);

    const getHikes = () => {
      fetch("http://localhost:8080/hike", {
        headers: {
          Authorization: "Bearer " + auth.currentUser.token
        }
      })
      .then(response => parseResponseMessage(response))
      .then(data => data ? setHikes(data) : null)
      .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
    }

    const showHikes = () => {
      return hikes.map(hike => <Hike key={hike.hikeId} hike={hike} />);
    }

    return ( // react bootstrap has built in card import - https://react-bootstrap.github.io/components/cards/
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        {showHikes()}
      </Card.Body>
      <Card.Body>
        <Card.Title>{hiker.firstName + " " + hiker.lastName}</Card.Title>
        <Card.Text>
          {hike.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="hike-trail-info">
        <ListGroup.Item>{trail.trailName}</ListGroup.Item>
        <ListGroup.Item>{"Difficulty level: " + hike.hikeDifficulty}</ListGroup.Item>
        <ListGroup.Item>{"Distance: " + trail.trailDistance}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
          {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
            <>
            <button className="btn btn-info" onClick={() => navigate("/hike/edit/" + hike.hikeId)}>Edit</button>
            <button className="btn btn-danger ms-2" onClick={() => navigate("/hike/delete/" + hike.hikeId)}>Delete</button>
            </>
             ) : null}
      </Card.Body>
    </Card>
  );
}

export default HikeFactory;