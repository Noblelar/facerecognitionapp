import React from "react";
import { Tilt } from "react-tilt";
import './logo.css'
import brain from '../../container/brain.png'


const Logo = () => {
    return (
        <div className="logo ma4 mt0">
            <Tilt className="Tilt br3 shadow-2" options={{ max: 55 }}>
                <div className="Tilt-inner">
                    <img src={brain} alt="Logo" />
                </div>
            </Tilt>
        </div>
    )
}


export default Logo;
