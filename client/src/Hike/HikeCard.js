import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';


// follow Sighting.js guideline in React Security Lesson

function Card({ hike }) {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    return ( // react bootstrap has built in card import - https://react-bootstrap.github.io/components/cards/
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      
    </Card.Body>
    <Card.Body>
      <Card.Title>Test</Card.Title>
      {/* <Card.Title>{hiker.firstName + " " + hiker.lastName}</Card.Title> */}
      <Card.Text>
        {hike.description}
        <p>hi</p>
      </Card.Text>
    </Card.Body>
    <ListGroup className="hike-trail-info">
      {/* <ListGroup.Item>{trail.trailName}</ListGroup.Item> */}
      <ListGroup.Item>Trail Name Test</ListGroup.Item>
      <ListGroup.Item>{"Difficulty level: " + hike.hikeDifficulty}</ListGroup.Item>
      {/* <ListGroup.Item>{"Distance: " + trail.trailDistance}</ListGroup.Item> */}
      <ListGroup.Item>Trail Distance</ListGroup.Item>
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

export default Card;