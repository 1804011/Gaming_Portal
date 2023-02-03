import { Link } from 'react-router-dom';
import React from 'react';
import GameBox from './GameBox';

const GameSelection = () => {
    return (

        <div>
            <h2 className='text-4xl font-[900] text-center text-[white] mt-4'>Play Games</h2>
            <div style={{
                display: "flex",
                marginTop: "36px",
                justifyContent: "center"
            }}>
                <GameBox text={"Chess"} game="chess" />
                <GameBox text={"Gomoku"} game="gomoku" />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <GameBox text={"Space Invader"} game="Space-Invader" />

            </div>
        </div>

    );
};

export default GameSelection;