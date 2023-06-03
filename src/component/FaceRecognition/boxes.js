import React from "react";
import TheBox from "./box";


const Boxes = (boxes) => {
    return (
        <div>
            {

                boxes.boxes.boxe.map((box, b) => {

                    return (
                        <TheBox
                            key={b}
                            Top={box.topRow}
                            Right={box.rightCol}
                            Bottom={box.bottomRow}
                            Left={box.leftCol} />
                    )
                })
            }

        </div>
    )
}


export default Boxes;
