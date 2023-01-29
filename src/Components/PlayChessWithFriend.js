import React from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';
import ChessPlayer from './ChessPlayer';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Suggesion from './Chess/Suggesion';
import Promotion from './Chess/Promotion';
import moveSelf from '../Media/move-self.mp3'
import capture from '../Media/capture.mp3'
const style = {
    width: "450px",
}
const PlayChessWithFriend = () => {
    const [user, loading] = useAuthState(auth);
    const [match, setMatch] = useState(undefined);
    const { _id } = useParams();
    const [socket, setSocket] = useState(undefined);
    const [firstPlayer, setFirstPlayer] = useState(undefined);
    const [secondPlayer, setSecondPlayer] = useState(undefined);
    const [start, setStart] = useState(false);
    const [game, setGame] = useState(new Chess());
    const [display, setDisplay] = useState(false)
    const [draggable, setDraggable] = useState(true)
    const [promoted, setPromoted] = useState(undefined)
    const [displayPromotion, setDisplayPromotion] = useState(false)
    const [dotted, setDotted] = useState([])
    const [sparsable, setSparsable] = useState([])

    useEffect(() => {
        // alert(game.isCheckmate())
        if (game.isCheckmate()) {
            alert("end")
            alert(game.turn() === 'b' ? "white won" : "black won")
        }
        else if (game.isGameOver())
            alert("Draw")
    }, [game])
    useEffect(() => {
        axios.get("https://gaming-portal-server-production.up.railway.app/match/" + _id)
            .then(({ data }) => {
                const { firstPlayer, secondPlayer, status, boardState } = data
                setFirstPlayer(firstPlayer)
                setSecondPlayer(secondPlayer)
                if (status === "running") {
                    setStart(true);
                }

            })
    }, [start])
    useEffect(() => {
        setSocket(io("https://gaming-portal-server-production.up.railway.app/Chess", {
            extraHeaders: {
                client: user?.displayName,
                roomNo: _id
            }
        }))

    }, [user])
    // alert(start)
    useEffect(() => {
        socket?.on('join', (data) => {
            alert(JSON.stringify(data))
            if (data?.joined)
                setStart(true);
        })
        socket?.on('move', ({ boardState }) => setGame(new Chess(boardState)))
    }, [socket])

    const onDrop = (source, target) => {
        setDisplay(false);
        setDisplayPromotion(false)
        if (!start) return;
        const client = user?.displayName;
        const movable = (client === firstPlayer && game.turn() === "w")
            || (client === secondPlayer && game.turn() === "b")
        if (!movable) return;
        const newGame = new Chess(game.fen())
        const captured = newGame.get(target);
        const result = newGame?.move({
            from: source,
            to: target,
            promotion: promoted
        })

        if (result) {
            const { piece, color } = result;
            const status = newGame.put({
                type: promoted || piece,
                color
            }, target)
            console.log(status);

            setGame(newGame)

            if (captured)
                new Audio(capture).play()
            else new Audio(moveSelf).play()
            socket?.emit("move", {
                gameType: "Chess",
                boardState: newGame.fen()
            })

        }
        setPromoted(undefined)
    }
    const onClick = (square) => {

        setDisplay(true)
        setDisplayPromotion(false)
        setPromoted(undefined)
        const { type: piece, color } = game.get(square);
        const squares = game.moves({ square, verbose: true })
        const arr = [];
        const size = squares.length
        for (let i = 0; i < size; i++) {
            arr.push(squares[i].to)

        }
        let arr1 = [], arr2 = []
        for (let i = 0; i < arr.length; i++) {

            if (game.get(arr[i]))
                arr2.push(arr[i])
            else arr1.push(arr[i])


        }
        setDotted(arr1); setSparsable(arr2)
        console.log(piece, square[1], game.turn());
        if (piece == 'p' && square[1] == '7' && game.turn() == 'w' && color == 'w') {
            setDisplayPromotion(true)
        }
        else if (piece == 'p' && square[1] == '2' && game.turn() == 'b' && color == 'b') {
            setDisplayPromotion(true)
        }

    }
    const onDragBegin = (piece, sourceSquare) => {
        setDisplay(false);

    }
    return (
        <div style={style}>
            <ChessPlayer player={user?.displayName === firstPlayer ? secondPlayer : firstPlayer} />
            <div className='relative'>
                <Chessboard
                    position={game.fen()}
                    boardWidth={450}
                    onPieceDrop={onDrop}
                    onPieceDragBegin={onDragBegin}
                    onSquareClick={onClick}
                    boardOrientation={
                        (user?.displayName === firstPlayer) ? "white" : "black"
                    }

                />

                {
                    displayPromotion &&
                    <Promotion
                        dotted={dotted}
                        sparsable={sparsable}
                        color={game.turn()}
                        setPromoted={setPromoted}
                        setDisplayPromotion={setDisplayPromotion}
                    />
                }

                {display && <Suggesion
                    sparsable={sparsable}
                    dotted={dotted}
                    rotate={(firstPlayer === user?.displayName ? "0deg" : "180deg")}
                />}


            </div>
            <ChessPlayer player={user?.displayName} />
        </div>
    );
};

export default PlayChessWithFriend;