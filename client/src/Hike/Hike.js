import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

// follow Sighting.js guideline in React Security Lesson

function Hike({ hike, hiker, trail, handleDelete }) {

    const auth = useContext(AuthContext);

    // (hike_id, hike_date, hike_difficulty, `description`, hiker_id, trail_id)
    return (
        <div>
        <p>{trail.trailName}</p>
        <p>{hiker.firstName} +" "+ {hiker.lastName}</p>
            <figure>
                {hike.imageUrl && (
                    <img
                        className="card-img-top"
                        src={hike.imageUrl}
                        alt={hike.hikeId}
                    />
                )}
                <p><time dateTime={hike.hikeDate}>{hike.hikeDate}</time></p>
                <p>{hike.description}</p>
                <p>How was the hike?: {hike.hikeDifficulty}</p>
                <p>{hike.description}</p>
            </figure>
            <footer>
            <div>
                {auth.currentUser ? (
                <Link to ={`/edit/${hike.hikeId}`}>Edit</Link>
                ) : null}
                {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
                    <button onClick={() => handleDelete(hike.hikeId)}>Delete</button>
                ) : null}
                </div>
            </footer>
        </div>
    );
}

export default Hike;