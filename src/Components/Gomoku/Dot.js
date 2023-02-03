import React from 'react';

const Dot = ({ color = "royalblue" }) => {
    const dotStyle = {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: color
    }
    return (
        <div style={dotStyle}>

        </div>
    );
};

export default Dot;