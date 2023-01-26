import React from 'react';
import { Card } from "react-bootstrap";
import LogoMarkImage from '../Images/LogoMarkImage';

const About = () => {
    return (
    <div className='forest'>
        <div className="about-container text-left">
        <Card className="shadow-lg" bg="dark" style={{ width: '35rem' } }>
          <Card.Body>
          <h1>About Us</h1>
          <span className='welcome'>
            <p><strong>LogOut Hiking</strong> was created to encourage users to explore nature.
                <br></br>We enabled sharing in hopes that this will allow users to connect to other hikers near them,<br></br> 
                as well as to see others' experiences and find new trails. <br></br>
                <br></br>We are currently building features to bookmark hike entries the user enjoys, for easy access later.</p><br></br>
            <p>Please reach out to us at <strong>getOut@LogOut.com</strong> for any features you would like to see added,<br></br> or any errors you experience while using our app.</p>
            </span>
          </Card.Body>
        </Card>
        </div>
    </div>
    );
}

export default About;
