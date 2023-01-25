import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class FourOhFourImage extends Component {
    render() {
      return (
        <Image
          width="413px"
          height="180px"
          className="rounded mx-auto d-block mt-5"
          src="/images/lo_404.svg" 
          fluid
        />
      );
    }
  }

export default FourOhFourImage;