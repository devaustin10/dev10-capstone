import { useEffect, useContext } from 'react';
import HikeCard from "./HikeCard";
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';


//modeled from FA react bootstrap
function CardFactory({ hike, trail, hiker, hikes, setHikes, trails, setTrails, hikers, setHikers}) {
    
    const auth = useContext(AuthContext);
    // const navigate = useNavigate();

    useEffect(() => {
        getAllHikes();
        getAllTrails();
        getAllHikers();
    }, []); // this will happen only once when the component is loaded

    const getAllHikes = () => {
        fetch("http://localhost:8080/hike")
        .then((response) => response.json())
        .then((data) => setHikes(data));
    }
    
    const getAllTrails = () => {
        fetch("http://localhost:8080/trail")
        .then((response) => response.json())
        .then((data) => setTrails(data));
    }

    const getAllHikers = () => {
        fetch("http://localhost:8080/hiker")
        .then((response) => response.json())
        .then((data) => setHikers(data));
    }
    
    let rebuiltHikesWithTrails = hikes.map(hike => {
        let foundTrail = trails.filter(trail => trail.trailId === hike.trailId);
        let foundHiker = hikers.filter(hiker => hiker.hikerId === hike.hikerId);
        hike["trail"] = foundTrail[0];
        hike["hiker"] = foundHiker[0];
        return hike;
    });
    //rebuiltHikesWithTrails => what does this return?

    //should we keep createCardFactory, and what should we use for a Card key?
        //map through rebuiltHikesWithTrails
        //Card key => make new Id for the hike object that has the trail and hiker arrays?

    const createCardFactory = () => {
          let hikeCardArray = rebuiltHikesWithTrails.map(hikeObj => {
              return (<HikeCard key={hikeObj.hikeId} hike={hike} />)
          });
          return hikeCardArray;
  }

  return (
    <>
      <Card>
        <div className="row mt-4">
            {createCardFactory()}
        </div>
      </Card>
    </>
);

}

export default CardFactory;