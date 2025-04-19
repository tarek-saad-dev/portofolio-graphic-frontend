import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
    return (
        <Typewriter 
            options={{
                strings: [
                    "Graphic Designer",
                    "Logo & Visual Identity Designer",
                    "Educational Content Designer",
                    "Web Designer",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
            }} 
        />
    );
}

export default Type;
