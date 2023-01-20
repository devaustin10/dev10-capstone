import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Hike from "./Hike";
import AuthContext from "../Context/AuthContext";

function Home() {
  const [hikes, setHikes] = useState([]);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const canEdit = auth.user !== null;
  const canDelete = auth.user && auth.user.hasRole("ADMIN");

  useEffect(() => {
    fetch("http://localhost:8080/hike")
      .then((response) => response.json())
      .then((data) => setHikes(data));
  }, []); // this will happen only once when the component is loaded

  const handleDelete = (hikeId) => {
    fetch(`http://localhost:8080/hike/${hikeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    }).then((response) => {
      if (response.status !== 204) {
        return Promise.reject("response is not 204 No Content");
      }
      return null;
    })
    .then(() => {
      navigate("/confirmation", { state: { msg: "👍🏾" }});
    })
    .catch(() => {
      navigate("/error", { state: { msg: "👎🏾" }});
    });
  };

export default Home;
