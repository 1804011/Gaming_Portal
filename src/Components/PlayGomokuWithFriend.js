import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import ChessPlayer from './ChessPlayer';
import Gomoku from './Gomoku/Gomoku';
import User from "../Media/User.png"
import GomokuBoard from './Gomoku/GomokuBoard';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const PlayGomokuWithFriend = () => {
    const [user] = useAuthState(auth);
    const { _id } = useParams();
    const [gomoku, setGomoku] = useState(new Gomoku());
    const [socket, setSocket] = useState(undefined);
    const [start, setStart] = useState(false);
    const [firstPlayer, setFirstPlayer] = useState(undefined);
    const [secondPlayer, setSecondPlayer] = useState(undefined);
    const [special, setSpecial] = useState([]);
    const [result, setResult] = useState(undefined);
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        if (gomoku.isWin() === 1) {
            setSpecial([...gomoku.special])
            user?.displayName === firstPlayer ?
                setResult({
                    message: "Congrtulations!!",
                    info: "You won the game"
                }) :
                setResult({
                    message: "Sorry!!",
                    info: "You lost the game"
                })
            setChecked(true)
        }
        else if (gomoku.isWin() === 2) {
            setSpecial([...gomoku.special])
            user?.displayName === secondPlayer ?
                setResult({
                    message: "Congrtulations!!",
                    info: "You won the game"
                }) :
                setResult({
                    message: "Sorry!!",
                    info: "You lost the game"
                })
            setChecked(true);
        }
        else if (gomoku.isDraw()) {
            setResult({ message: "Draw" })
            setChecked(true)
        }
    }, [gomoku])
    useEffect(() => {
        socket?.on('join', (data) => {
            if (data?.joined)
                setStart(true);
        })
        socket?.on('move', ({ boardState }) => setGomoku(new Gomoku(boardState)))
    }, [socket])
    useEffect(() => {
        const result = axios.get("https://gaming-portal-server-production.up.railway.app/match/" + _id)
            .then(({ data }) => {
                const { firstPlayer, secondPlayer, status, boardState } = data
                setFirstPlayer(firstPlayer)
                setSecondPlayer(secondPlayer)
                if (status === "running") {
                    setStart(true);
                }
                setGomoku(new Gomoku(boardState))





            })


    }, [])
    useEffect(() => {
        setSocket(io("https://gaming-portal-server-production.up.railway.app/Gomoku", {
            extraHeaders: {
                client: user?.displayName,
                roomNo: _id
            }
        }))

    }, [user])
    useEffect(() => {
        axios.get("https://gaming-portal-server-production.up.railway.app/match/" + _id)
            .then(({ data }) => {
                const { firstPlayer, secondPlayer, status, boardState } = data
                setFirstPlayer(firstPlayer)
                setSecondPlayer(secondPlayer)

            })
    }, [start])
    const onCellClick = (r, c) => {
        const result = gomoku.move(r, c);
        if (result) {
            setGomoku(new Gomoku(result));
            socket.emit("move", {
                gameType: "Gomoku",
                boardState: result
            })
        }
    }
    // alert("" + start + " " + gomoku.turn());
    return (
        <div>
            <ChessPlayer player={user?.displayName === firstPlayer ? secondPlayer : firstPlayer} img={User} />
            <GomokuBoard
                width={450}
                height={450}
                onClick={start && ((gomoku.turn() === 0 && user?.displayName === firstPlayer) || (gomoku.turn() === 1 && user?.displayName === secondPlayer)) ? onCellClick : () => { }}
                position={gomoku.toBoardString()}
                special={special}
            />
            <ChessPlayer img={User} player={user?.displayName}></ChessPlayer>
            <div>
                {/* The button to open modal */}
                {/* <label htmlFor="my-modal-3" className="btn">open modal</label> */}

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" checked={checked} />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setChecked(false)}>✕</label>
                        <h3 className="text-lg font-[900] text-center">{result?.message}</h3>
                        <p className="py-4 font-[700] text-3xl text-center">{result?.info}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayGomokuWithFriend;