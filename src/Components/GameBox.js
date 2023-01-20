import React from 'react';
import { Link } from 'react-router-dom';

const GameBox = ({ text, game }) => {
    const style = {
        borderRadius: "16px",
        backgroundColor: "#050505",
        display: "flex",
        justifyContent: "center",
        color: "white",
        padding: "8px 0px",
        width: "250px",
        display: "flex",
        alignItems: "center",
        margin: "16px"
    }
    return (
        <Link to={`/${game}`}>
            <div style={style} className="text-2xl">
                <span className='text-[48px]'>  {`\u2658`}  </span>
                {text}
            </div></Link >
    );
};

export default GameBox;