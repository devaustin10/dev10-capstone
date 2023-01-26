import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import "../index.scss";
import ProfilePic from "../Images/ProfileImage";

const Profile = () => {
    return (
        <div className="forest">
            <div className="profile-container text-left">
            <Card bg="dark" style={{ width: '80%', height: '40em' } }>
                <Card.Body>
                <ProfilePic></ProfilePic>
                <h1><strong>Forrest Gump</strong></h1>
                <span className="welcome">
                <p><span className="h4 me-3">@keeponrunning</span><span className="title mb-3 small"><i>Greenbow, Alabama, United States of America</i></span></p>
                <hr></hr>
                <p>So I ran to the end of the road.<br></br>
                And when I got there, I thought maybe I'd run to the end of town.<br></br>
                And when I got there, I thought maybe I'd just run across Greenbow county.<br></br>
                And I figured, since I run this far, maybe I'd just run across the great state of Alabama.</p>
                <Button variant="primary" className="friendRequest mt-4">Send Friend Request</Button>
                <Button variant="secondary" className="directMessage mt-4 ms-3">Direct Message</Button>
                <Button variant="secondary" className="block mt-4 ms-3">Block</Button>
                </span>
                </Card.Body>
            </Card>
        </div>     
        </div>    
    )
};
export default Profile;

//        <Button variant="secondary" className="mt-3 ms-2 mb-5" type="button" onClick={() => navigate("/hikes")}>Cancel</Button>


//     <div>
//     <img className="img-fluid mt-5" src={process.env.PUBLIC_URL + "/images/rengoku.png"} alt="Home page" />
//         <h1>John Doe</h1>
//         <p class="title">CEO & Founder, Example</p>
//         <p>Harvard University</p>
//         <p><button>Contact</button></p>
//     </div>    
// }
// }
// export default Profile;
//after second p tag
//line 3 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

//under contact         <a href="#"><i class="fa fa-dribbble"></i></a>
        // <a href="#"><i class="fa fa-twitter"></i></a>
        // <a href="#"><i class="fa fa-linkedin"></i></a>
        // <a href="#"><i class="fa fa-facebook"></i></a>