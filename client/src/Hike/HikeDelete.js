import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

function HikeDelete( { hike }) {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

  return (
    // this needs to be a Card that is deleted if authorization allows
    // edit and delete button

    // (hike_id, hike_date, hike_difficulty, `description`, hiker_id, trail_id)
  )
}

export default HikeDelete