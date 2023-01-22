import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// follow Sighting.js guideline in React Security Lesson

function Hike({ hike, hiker, trail }) {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

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
                {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
                    <>
                    <button className="btn btn-info" onClick={() => navigate("/hikes/edit/" + hike.hikeId)}>Edit</button>
                    <button className="btn btn-danger ms-2" onClick={() => navigate("/hikes/delete/" + hike.hikeId)}>Delete</button>
                    </>
                ) : null}
                </div>
            </footer>
        </div>
    );
}

export default Hike;