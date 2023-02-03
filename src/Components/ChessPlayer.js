import React from 'react';
import userImage from "../Media/userImage.svg"
const ChessPlayer = ({ player, img }) => {
    const style = {
        display: "flex",
        width: "450px",
        margin: "4px 0"


    }
    return (
        <div style={style}>
            <div className='flex '>
                <img src={img || userImage} width={48} height={48} />
                <div className='text-[white] ml-2 font-[600]'>
                    {player || "Waiting for player..."}
                </div>
            </div>
        </div>
    );
};

export default ChessPlayer;