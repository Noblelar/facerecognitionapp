import React from "react";
import Boxes from "./boxes";
import './FaceRecognition.css';



const FaceRecognition = ({ imageUrl, boxe }) => {

    return (
        <div className="center ma">
            <div className="absolute nt2">
                <img
                    id={"faceImg"}
                    src={imageUrl}
                    alt={"Finding Face Image"}
                    width="500px"
                    height={'auto'}
                />


                <Boxes boxes={{boxe}} />

            </div>
        </div>
    )
}


export default FaceRecognition;