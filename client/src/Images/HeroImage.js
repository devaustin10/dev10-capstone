import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class HeroImage extends Component {
    render() {
      return (
        <Image
          width="75%"
          height="75%"
          className="shadow rounded mx-auto d-block mb-3"
          src="/images/lo_hero.svg" 
          fluid
        />
      );
    }
  }

export default HeroImage;