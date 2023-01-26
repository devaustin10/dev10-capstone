import React from 'react';
import { Card } from "react-bootstrap";
import HeroImage from '../Images/HeroImage';
import LogoMarkImage from '../Images/LogoMarkImage';

function Home() {

  return (
    <div className="forest">
      <div className="container text-center">
        <Card className="shadow-lg" bg="dark" style={{ width: '35rem' } }>
          <Card.Body>
            <HeroImage />
            <span className='welcome mb-3'>
            <h2 className= 'welcomesting mt-3 mb-3'> We've all been a little distracted lately.</h2>
            Connecting with the natural world was already an adventure.
            We didn't need to gamify it and make it more fun - 
            but have you ever really seen anyone complain about something being MORE fun?
            <br></br>
            <br></br>
            No, not really. So we decided to do it anyways. Our goal is to give hikers like you a place
            to share your journeys, connect with other trailblazers, and be rewarded for hiking through badges and milestones.
            </span>

            <h1 className='mt-3 mb-3'>It's time to LogOut.</h1>
            <LogoMarkImage />

          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
