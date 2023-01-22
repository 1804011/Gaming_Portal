import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const ChessOption = ({ icon1, icon2, text1, text2, route1, route2 }) => {
    const style = {
        backgroundColor: "#262421",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
    return (
        <div style={style}>
            <h2 className='text-[white] text-3xl my-5'>Please choose a option</h2>
            <Link to={route1}>
                <button className="btn gap-2 btn-wide"
                    style={
                        { backgroundColor: "rgba(255,255,255,0.05)" }
                    }
                >
                    <FontAwesomeIcon icon={icon1} size="2x"></FontAwesomeIcon>
                    {text1}
                </button>
            </Link>
            <Link to={route2}>
                <button className="btn gap-2 btn-wide my-3"
                    style={
                        { backgroundColor: "rgba(255,255,255,0.05)" }
                    }
                >
                    <FontAwesomeIcon icon={icon2} size="2x"></FontAwesomeIcon>
                    {text2}
                </button>
            </Link>
        </div >
    );
};

export default ChessOption;