import React from 'react';

const CardImage = () => {
    return (
        <>
    const num = Math.floor(Math.random() * 9) + 1;
    switch (num) {
        <div>
        case 1:
            return <img src={process.env.PUBLIC_URL + "/images_random/desertWaterfall.svg"} />
        case 2:
            return <img src={process.env.PUBLIC_URL + "/images_random/greenNatureHills.svg"} />
        case 3:
            return <img src={process.env.PUBLIC_URL + "/images_random/greyMountains.svg"} />
        case 4:
            return <img src={process.env.PUBLIC_URL + "/images_random/lakeReflection.svg"} />
        case 5:
            return <img src={process.env.PUBLIC_URL + "/images_random/natureHike.svg"} />
        case 6:
            return <img src={process.env.PUBLIC_URL + "/images_random/redMountainSnow.svg"} />
        case 7:
            return <img src={process.env.PUBLIC_URL + "/images_random/sunsetLake.svg"} />
        case 8:
            return <img src={process.env.PUBLIC_URL + "/images_random/treesInValley.svg"} />
        case 9:
            return <img src={process.env.PUBLIC_URL + "/images_random/waterfallGreen.svg"} />
        default:
            break;   
        </div>
    }
    </>
    )
}    

export default CardImage;    