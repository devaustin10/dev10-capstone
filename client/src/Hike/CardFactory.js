import { useEffect, useContext } from 'react';
import HikeCard from "./HikeCard";
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "../index.scss";


//modeled from FA react bootstrap
function CardFactory({ hikes, setHikes, trails, hikers }) {
    
    const auth = useContext(AuthContext);
    // const navigate = useNavigate();

    useEffect(() => {
        getAllHikes();
    }, [hikers, trails]); // this will happen only once when the component is loaded

    const getAllHikes = () => {
        fetch("http://localhost:8080/hike")
        .then((response) => response.json())
        .then((hikes) => rebuildHikesWithTrails(hikes));
    }

  const rebuildHikesWithTrails = (hikes) => {
    let hydratedHikes = hikes.map(hikeObject => {
        let foundTrail = trails.filter(trail => trail.trailId === hikeObject.trailId);
        let foundHiker = hikers.filter(hiker => hiker.hikerId === hikeObject.hikerId);
        hikeObject["trail"] = foundTrail[0];
        hikeObject["hiker"] = foundHiker[0];
        return hikeObject;
    });
    setHikes(hydratedHikes);
  }

  const createCardFactory = () => {
    if (hikes.length > 0) {
      return hikes.map(hikeObj => {
          return (<HikeCard key={hikeObj.hikeId} hike={hikeObj} />) //want to import hikeObj to HikeDelete for display
      });
    }
  }

  return (
    <>
    <div className="cardBG cardFactory" >
      <Container>
      <Row>
      {createCardFactory()}
      </Row>
      </Container>
    </div>
    </>
);

}

export default CardFactory;