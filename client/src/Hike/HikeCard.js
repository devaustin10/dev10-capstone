import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';
import { Card } from "react-bootstrap";
import CardImage from "./CardImage.js";
import Avatar from '../Images/AvatarImage.js';
import HikeDelete from "./HikeDelete";
import "../index.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditIco from '../Images/CardFunction/EditIcon.js';
import DeleteIco from '../Images/CardFunction/DeleteIcon.js';



// follow Sighting.js guideline in React Security Lesson

function HikeCard({ hike }) {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    return (
      <Col sm={4}>
      <Card className="mx-auto d-block mb-4">
        <Card.Header className="cardHeader">
          <Row>
          <Col xs={1}><Avatar /></Col>
          <Col><span className="nameplate">{"@" + hike.hikerId}</span></Col>
          </Row>
        </Card.Header>
        
        <CardImage></CardImage>
        
        <Card.Body>
          <span className="cardBody">{hike.hikeDate} <br></br>
          {"Trail: " + hike.trail?.trailName} <br></br>
          {"How did the user find the hike?: " + hike.hikeDifficulty} <br></br>
          {"Trail Distance: " + hike.trail?.trailDistance + " miles" }
          <hr></hr>
          {hike.description} </span>
        </Card.Body>

        <Card.Footer>
        {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
          <>
          <button className="btn btn-info ms-5" onClick={() => navigate("/edit/" + hike.hikeId)}><EditIco></EditIco></button>
          <button className="btn btn-danger ms-2" onClick={() => navigate("/delete/" + hike.hikeId)}><DeleteIco></DeleteIco></button>
          </>
           ) : null}
        </Card.Footer>
      </Card>
      </Col>
);
}

export default HikeCard;