import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io("http://localhost:5000")
const PlayChess = () => {
    socket.emit('send', { message: "hello" })
    console.log(socket);
    return (
        <div className='text-[white] text-center'>
            Playing chess
        </div>
    );
};

export default PlayChess;