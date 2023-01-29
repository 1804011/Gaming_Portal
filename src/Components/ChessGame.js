import { Chess } from 'chess.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Promotion from './Chess/Promotion';
import Suggesion from './Chess/Suggesion';
import moveSelf from '../Media/move-self.mp3'
import capture from '../Media/capture.mp3'
const ChessGame = ({ firstTurn }) => {
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
    const onDrop = (source, target) => {
        setDisplay(false);
        setDisplayPromotion(false)

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
        <div className='relative'>
            <Chessboard
                position={game.fen()}
                boardWidth={450}
                onPieceDrop={onDrop}
                onPieceDragBegin={onDragBegin}
                onSquareClick={onClick}
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

            {display && <Suggesion sparsable={sparsable} dotted={dotted} />}


        </div>
    );
};

export default ChessGame;