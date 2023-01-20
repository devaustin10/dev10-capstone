import React from 'react'

function HikeFactory( { hike, setHikes, messages, setMessages, makeId, parseResponseMessage} ) {

    const auth = useContext(AuthContext);
    
    useEffect(() => {
        getHikes();
    }, []);

    const getHikes = () => {
        fetch("http://localhost:8080/hike", {
            headers: {
                Authorization: "Bearer " + auth.currentUser.token
            }
        })
        .then(response => parseResponseMessage(response))
        .then(data => data ? setHikes(data) : null)
        .catch(error => setMessages([...messages, { id: makeId(), type: "failure", text: error.message }]));
    }

    const showHikes = () => {
        return hike.map(hike => <Hike key={hike.hikeId} hike={hike} />);
    }

    return (
        // (hike_id, hike_date, hike_difficulty, `description`, hiker_id, trail_id)
        // make the card here

        // {showHikes()}
    );
}

export default HikeFactory;