import React from 'react';
import { Card } from "react-bootstrap";

function CardImage() {
    
    const imageSwitcher = () => {
        const num = Math.floor(Math.random() * 9) + 1;

        switch (num) {
            case 1:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/desertWaterfall.svg"} />
            case 2:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/greenNatureHills.svg"} />
            case 3:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/greyMountains.svg"} />
            case 4:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/lakeReflection.svg"} />
            case 5:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/natureHike.svg"} />
            case 6:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/redMountainSnow.svg"} />
            case 7:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/sunsetLake.svg"} />
            case 8:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/treesInValley.svg"} />
            case 9:
                return <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images_random/waterfallGreen.svg"} />
            default:
                return null;   
        }
    }

    return imageSwitcher();
}    

export default CardImage;