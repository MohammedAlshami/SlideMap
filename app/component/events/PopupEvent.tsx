"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';

// Child component to be displayed
const DisplayComponent = () => {
    return <p>This is the PopupEvent component!</p>;
};

// Parent component with click functionality
const PopupEvent = () => {
    const [isDisplayed, setIsDisplayed] = useState(false);

    const handleClick = () => {
        setIsDisplayed(!isDisplayed);
    };

    return (
        <div>
            {isDisplayed && <DisplayComponent />}
            <button onClick={handleClick}>Click to Show PopupEvent</button>
        </div>
    );
};

export default PopupEvent;
