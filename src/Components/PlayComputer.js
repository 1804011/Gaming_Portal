import { Chess } from 'chess.js';
import React from 'react';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Promotion from './Chess/Promotion';
import Suggesion from './Chess/Suggesion';
import ChessGame from './ChessGame';
import moveSelf from '../Media/move-self.mp3'
import capture from '../Media/capture.mp3'
import { useEffect } from 'react';
const style = {
    display: "flex",
    alignItems: "center"
}


const PlayComputer = () => {
    const [firstTurn, setFirstTurn] = useState(0);
    const [start, setStart] = useState(false);
    const [checked, setChecked] = useState(false);
    const [game, setGame] = useState(new Chess());
    const [disabled, setDisabled] = useState(false);
    const [display, setDisplay] = useState(false)
    const [promoted, setPromoted] = useState(undefined)
    const [displayPromotion, setDisplayPromotion] = useState(false)
    const [dotted, setDotted] = useState([])
    const [sparsable, setSparsable] = useState([])
    const [result, setResult] = useState("");
    const [modal, setModal] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            if (!game.isGameOver()) {
                if (checked == 0 && game.turn() === "w") return;
                if (checked == 1 && game.turn() === "b") return;
                const newGame = new Chess(game.fen())
                const moves = newGame.moves()
                const move = moves[Math.floor(Math.random() * moves.length)]
                const result = newGame.move(move);
                if (result) {
                    setGame(newGame)
                }
            }
        }, 1000)
    }, [game, start])
    useEffect(() => {
        if (game.isCheckmate()) {
            if (game.turn() === "w") {
                checked == 0 ? setResult({ message: "Sorry!!", info: "Computer Won the game" }) : setResult({
                    message: "Congratulations!!",
                    info: "You Won the game"
                })
            }
            else {
                checked == 1 ? setResult({ message: "Sorry!!", info: "Computer Won the game" }) : setResult({
                    message: "Congratulations!!",
                    info: "You Won the game"
                })
            }
            setModal(true);
        }
        else if (game.isGameOver()) {
            setResult({ message: "Draw" })
            setModal(true);
        }
    }, [game])

    const onDrop = (source, target) => {
        setDisplay(false);
        setDisplayPromotion(false)
        if (!start) return;
        if (checked == 0 && game.turn() === "b") return;
        if (checked == 1 && game.turn() === "w") return;
        const newGame = new Chess(game.fen())
        const captured = newGame.get(target);
        const result = newGame?.move({
            from: source,
            to: target,
            promotion: promoted
        })
        console.log(result);
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

        }
        setPromoted(undefined)
    }
    const onClick = (square) => {

        setDisplay(true)
        setDisplayPromotion(false)
        setPromoted(undefined)
        const { type: piece, color } = game.get(square);
        console.log(piece)
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
        console.log(arr, squares);
        console.log(piece, square[1], game.turn());
        if (piece == 'p' && square[1] == '7' && game.turn() == 'w' && color == 'w') {
            setDisplayPromotion(true)
        }
        else if (piece == 'p' && square[1] == '2' && game.turn() == 'b' && color == 'b') {
            setDisplayPromotion(true)
        }

    }
    const onDragBegin = (piece, sourceSquare) => {
        setDisplay(false)
    }

    return (
        <div style={style}>
            <div className='mr-4'>
                <h6 className='text-[white] text-2xl'>Who moves first?</h6>
                <div className='flex items-center'>
                    <input type="checkbox" className="toggle my-2" checked={checked} onChange={() => setChecked((pre) => (!pre))} />
                    <span className='text-[white] ml-2 text-md font-[600]'>{checked ? "Computer" : "You"}</span>
                </div>
                <button className="btn btn-outline btn-accent btn-sm disabled:text-[gray]" onClick={() => {
                    setStart(true);
                    setDisabled(true);

                }} disabled={disabled}>Start Game</button>
            </div>
            <div className='text-[white]'>
                <div className='relative'>
                    <Chessboard
                        position={game.fen()}
                        boardWidth={450}
                        onPieceDrop={onDrop}
                        onPieceDragBegin={onDragBegin}
                        onSquareClick={onClick}
                        boardOrientation={checked ? "black" : "white"}
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

                    {display && <Suggesion sparsable={sparsable} dotted={dotted} rotate={checked ? "180deg" : "0deg"} />}


                </div>
            </div >
            <div>
                {/* The button to open modal */}
                {/* <label htmlFor="my-modal-3" className="btn">open modal</label> */}

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-3" className="modal-toggle" checked={modal} />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setModal(false)}>✕</label>
                        <h3 className="text-lg font-[900] text-center">{result?.message}</h3>
                        <p className="py-4 font-[700] text-3xl text-center">{result?.info}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayComputer;