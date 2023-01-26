import React, { Component } from 'react'
import { Image } from "react-bootstrap";

class ProfilePic extends Component {
    render() {
      return (
        <Image
          width="250em"
          height="250em"
          className="rounded d-block mb-3"
          src={process.env.PUBLIC_URL + "/images/forrestgumpprofilepic.svg"}
          alt='Profile picture for user @keeponrunning'
          fluid
        />
      );
    }
  }

export default ProfilePic;