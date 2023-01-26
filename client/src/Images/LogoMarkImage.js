import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class LogoMarkImage extends Component {
    render() {
      return (
        <Image
          width="25%"
          height="25%"
          className="rounded mx-auto d-block mb-3"
          src="/images/lo_logomark.svg" 
          fluid
        />
      );
    }
  }

export default LogoMarkImage;