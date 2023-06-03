import React from "react";

const TheBox = ({ Top, Right, Left, Bottom }) => {
    return (

        < div className="bounding-box" style={{
            top: Top,
            right: Right,
            left: Left,
            bottom: Bottom,
        }}>

        </div >
    )

}

export default TheBox;