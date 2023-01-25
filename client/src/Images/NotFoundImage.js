import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class FourOhFourImage extends Component {
    render() {
      return (
        <Image
          width="50%"
          height="50%"
          className="rounded mx-auto d-block mt-5"
          src="/images/lo_404.svg" 
          fluid
        />
      );
    }
  }

export default FourOhFourImage;