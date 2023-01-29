import React from 'react';
import Matches from './Matches';

const JoinGame = () => {
    return (
        <div style={{ overflow: "hidden", width: "100%", }}>
            <h6 className='text-3xl text-center text-[white] font-[600]'>
                Join a game
            </h6>
            <div style={{ display: "flex", justifyContent: "center", margin: "16px 0px" }}>
                <Matches gameType={"Chess"} />
            </div>
        </div>
    );
};

export default JoinGame;