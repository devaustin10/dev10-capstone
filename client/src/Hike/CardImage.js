import React from 'react';
import { Card } from "react-bootstrap";

function CardImage() {
    
    const imageSwitcher = () => {
        const num = Math.floor(Math.random() * 18) + 1;

        switch (num) {
            case 1:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card001.jpg"} />
            case 2:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card002.jpg"} />
            case 3:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card003.jpg"} />
            case 4:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card004.jpg"} />
            case 5:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card005.jpg"} />
            case 6:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card006.jpg"} />
            case 7:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card007.jpg"} />
            case 8:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card008.jpg"} />
            case 9:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card009.jpg"} />
            case 10:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card010.jpg"} /> 
            case 11:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card011.jpg"} /> 
            case 12:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card012.jpg"} /> 
            case 13:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card013.jpg"} /> 
            case 14:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card014.jpg"} /> 
            case 15:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card015.jpg"} /> 
            case 16:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card016.jpg"} />   
            case 17:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card017.jpg"} />
            case 18:
                return <Card.Img className="cardImage img-fluid" variant="top" src={process.env.PUBLIC_URL + "/images_random/card018.jpg"} />                                   
            default:
                return null;   
        }
    }

    return imageSwitcher();
}    

export default CardImage;