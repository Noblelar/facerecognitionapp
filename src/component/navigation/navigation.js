import React from "react";


const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: "right" }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">  Sign Out </p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: "right" }}>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">  Register </p>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">  signin </p>
            </nav>
        )
    }


}


export default Navigation;
