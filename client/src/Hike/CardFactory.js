import { useEffect, useContext } from 'react';
import Hike from "./Card";
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";


//modeled from FA react bootstrap
function HikeFactory({ hike, trail, hiker, hikes, setHikes, trails, setTrails, hikers, setHikers}) {


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
    // const navigate = useNavigate();

    useEffect(() => {
        getHikes();
        getTrails();
        getHikers();
    }, []); // this will happen only once when the component is loaded

    // const showHikes = () => {
    //   return hikes.map(hike => <Hike key={hike.hikeId} hike={hike} />);
    // }

// FETCH
    // let hikes = [
    //     {hikeId: 1, trailId: 1, hikerId: 1, difficulty: 3},
    //     {hikeId: 2, trailId: 6, hikerId: 5, difficulty: 6},
    //     {hikeId: 3, trailId: 11, hikerId: 2, difficulty: 1}
    // ]

    const getHikes = () => {
        fetch("http://localhost:8080/hike")
        .then((response) => response.json())
        .then((data) => setHikes(data));
    }
    
    const getTrails = () => {
        fetch("http://localhost:8080/trail")
        .then((response) => response.json())
        .then((data) => setTrails(data));
    }

    const getHikers = () => {
        fetch("http://localhost:8080/hiker")
        .then((response) => response.json())
        .then((data) => setHikers(data));
    }
    
    // let trails = [
    //     {trailId: 1, state: "AL", name: "Funzo Trail"},
    //     {trailId: 6, state: "CA", name: "Hummingbird Trail"},
    //     {trailId: 11, state: "MD", name: "Patapsco Trail"}
    // ]
    // let hikers = [
    //     {hikerId: 1, name: "Oak"},
    //     {hikerId: 2, name: "Jess" },
    //     {hikerId: 5, name: "Austin"}
    // ]
    
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
          let hikeCardArray = hikes.map(hikeObj => {
              return (<Card key={hikeObj.hikeId} />)
          });
          return hikeCardArray;
  }

  return (
    <>
        <div className="row mt-4">
            {createCardFactory()}
        </div>
    </>
);

}

export default HikeFactory;