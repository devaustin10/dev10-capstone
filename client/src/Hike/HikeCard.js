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
          <Col style={{display:'flex', justifyContent:'right'}}><span className="nameplate">{hike.hikeDate}</span></Col>
          </Row>
        </Card.Header>
        
        <CardImage></CardImage>
        
        <Card.Body>
          <span className="cardBody">
            <span className="cardDetails">
            {"Trail: " + hike.trail?.trailName} <br></br>
            {"Hike User Rating: " + hike.hikeDifficulty} <br></br>
            {"Trail Distance: " + hike.trail?.trailDistance + " miles" }
            </span>
            <hr></hr>
            {hike.description} 
          </span>
        </Card.Body>

        <Card.Footer  className="mx-auto d-block">
        {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
          <>
          <Row>
          <Col style={{display:'flex', justifyContent:'right'}} className="deleteButton" xs={6}></Col>
          <Col style={{display:'flex', justifyContent:'right'}} className="deleteButton"  xs={3}><button className="btn btn-info" onClick={() => navigate("/edit/" + hike.hikeId)}><EditIco></EditIco></button></Col>
          <Col style={{display:'flex', justifyContent:'right'}} className="deleteButton" xs={3}><button className="btn btn-danger" onClick={() => navigate("/delete/" + hike.hikeId)}><DeleteIco></DeleteIco></button></Col>
          </Row>
          </>
           ) : null}
        </Card.Footer>
      </Card>
      </Col>
);
}

export default HikeCard;