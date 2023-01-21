import React from 'react';
import { useNavigate } from "react-router-dom";
import Hike from "./Hike";


function HikeFactory() {

    const [hikes, setHikes] = useState([]);

    const auth = useContext(AuthContext);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:8080/hike")
        .then((response) => response.json())
        .then((data) => setHikes(data));
    }, []); // this will happen only once when the component is loaded

    const handleEdit = (hikeId) => {
        fetch("http://localhost:8080/hike/" + hikeId, {
          method: "EDIT",
          headers: {
            Authorization: "Bearer " + auth.currentUser.token
          }
        })
        .then(response => {
          if (response.status === 204) {
            navigate("/confirmation", { state: { msg: "👍🏾 Edit Successful" }});
          } else if (response.status === 403) {
            navigate("/error", { state: { msg: "👎🏾 Not Authorized for this action." }});
          } else if (response.status === 404) {
            navigate("/error", { state: { msg: "👎🏾 No Hike to edit at this address." }});
          } else if (response.status === 412) {
            navigate("/error", { state: { msg: "👎🏾 Action could not be completed." }});
          } else {
            navigate("/error", { state: { msg: "👎🏾 Weird error! Go back to home!" }});
          }
        })
        .catch(err => navigate("/error", { state: { msg: "👎🏾 " + err.msg }}));
      };
  
    const handleDelete = (hikeId) => {
      fetch("http://localhost:8080/hike/" + hikeId, {
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
          navigate("/error", { state: { msg: "👎🏾 No Hike to delete at this address." }});
        } else if (response.status === 412) {
          navigate("/error", { state: { msg: "👎🏾 Action could not be completed." }});
        } else {
          navigate("/error", { state: { msg: "👎🏾 Weird error! Go back to home!" }});
        }
      })
      .catch(err => navigate("/error", { state: { msg: "👎🏾 " + err.msg }}));
    };
  
    return hikes.map((hikes) => (
      <Hikes key={hikes.hikesId} hikes={hikes} 
        handleDelete={handleDelete} />
    ));

}

export default HikeFactory;