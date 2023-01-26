import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class DeleteIco extends Component {
    render() {
        return (
        <Image
          width="20em"
          height="20em"
          className="mx-auto d-block"
          src="/card_icons/trash-alt.svg" 
          fluid
        />
        )
    }
  }

export default DeleteIco;