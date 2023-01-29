import { Chess } from 'chess.js';
import React from 'react';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import ChessGame from './ChessGame';



const PlayComputer = () => {
    const [firstTurn, setFirstTurn] = useState("you");
    const [start, setStart] = useState(false);
    const [game, setGame] = useState(new Chess())
    const handleChange = (e) => {
        setFirstTurn(e.target.value)

    }


    return (
        <div className='text-[white]'>


            <ChessGame />

        </div >
    );
};

export default PlayComputer;