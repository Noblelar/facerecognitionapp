import React from "react";


const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute nt2">
                <img
                    src={imageUrl}
                    alt={"Finding Face Image"}
                    width="500px"
                    height={'auto'}
                />
            </div>
        </div>
    )
}


export default FaceRecognition;