import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class EditIco extends Component {
    render() {
        return(
        <Image
          width="20em"
          height="20em"
          className="mx-auto d-block"
          src="/card_icons/pen-to-square-solid.svg" 
          fluid
        />
        )
    }
  }

export default EditIco;