import React from 'react'

function HikeFactory() {

    const [sightings, setSightings] = useState([]);

    const auth = useContext(AuthContext);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:8080/hike")
        .then((response) => response.json())
        .then((data) => setSightings(data));
    }, []); // this will happen only once when the component is loaded
  
    const handleDelete = (sightingId) => {
      fetch("http://localhost:8080/sighting/" + sightingId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.currentUser.token
        }
      })
      .then(response => {
        if (response.status === 204) {
          navigate("/confirmation", { state: { msg: "👍🏾 Delete Successful" }});
        } else if (response.status === 403) {
          navigate("/error", { state: { msg: "👎🏾 Not Authorized for this action." }});
        } else if (response.status === 404) {
          navigate("/error", { state: { msg: "👎🏾 No bug to delete at this address." }});
        } else if (response.status === 412) {
          navigate("/error", { state: { msg: "👎🏾 Action could not be completed." }});
        } else {
          navigate("/error", { state: { msg: "👎🏾 Weird error! Go back to home!" }});
        }
      })
      .catch(err => navigate("/error", { state: { msg: "👎🏾 " + err.msg }}));
    };

    const handleEdit = (hikeId) =>

    return hikes.map((hike) => (
      <Hike key={hike.hikeId} hike={hike} 
        handleDelete={handleDelete} handleEdit={handleEdit}/>
    ));
  }
  
    return sightings.map((sighting) => (
      <Sighting key={sighting.sightingId} sighting={sighting} 
        handleDelete={handleDelete} />
    ));
  }

export default HikeFactory;