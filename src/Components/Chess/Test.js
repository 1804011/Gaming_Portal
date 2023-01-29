import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Game, AI } from 'rsg-chess'
import Circle from "./Components/Circle";
import moveSelf from './Media/move-self.mp3'
import capture from './Media/capture.mp3'
import notify from './Media/notify.mp3'
import Suggesion from "./Components/Suggesion";
import Promotion from "./Components/Promotion";
import Gomoku from "./GameObjects/Gomoku";
import alphaBeta from "./GameObjects/AI";
import GomokuMain from "./Components/Gomoku/GomokuMain";
import Dot from "./Components/Gomoku/Dot";
import GomokuBoard from "./Components/Gomoku/GomokuBoard";
const _ = require('loadash')
const Test = () => {
    const [game, setGame] = useState(new Chess());
    const [display, setDisplay] = useState(false)
    const [draggable, setDraggable] = useState(true)
    const [promoted, setPromoted] = useState(undefined)
    const [displayPromotion, setDisplayPromotion] = useState(false)
    const [dotted, setDotted] = useState([])
    const [sparsable, setSparsable] = useState([])

    useEffect(() => {
        if (game.inCheck()) {
            new Audio(notify).play()

        }
    }, [game])
    const onDrop = (source, target) => {
        console.log(source, target);

        setDisplayPromotion(false)
        const newGame = _.cloneDeep(game)
        const captured = newGame.get(target)
        let promotion = undefined
        console.log(newGame);
        const moveObject = { from: source, to: target, promotion: promoted }

        const result = newGame?.move(
            moveObject
        );

        console.log('moveResult', result);
        if (result != null) {
            if (captured)
                new Audio(capture).play()
            else new Audio(moveSelf).play()
            newGame.put({ type: moveObject.promotion || result.piece, color: result.color }, target);

            setDraggable(false)
            setGame(newGame)

        }
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
        console.log('drag', piece, sourceSquare)

    }










    return (
        <>

          
            <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ border: "2px solid green", position: "relative", width: "560px", height: "560px" }}>
          {
            displayPromotion && <Promotion color={game.turn()}
              setDisplayPromotion={setDisplayPromotion}
              setPromoted={setPromoted} />
          }
          <div style={
            {
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              top: "0px",
              left: "0px"

            }

          }>

            <Chessboard position={game.fen()}
              onPieceDrop={onDrop}
              onSquareClick={onClick}
              onPieceDragBegin={onDragBegin}
              arePremovesAllowed={true}
            />

          </div>
          {display && <Suggesion sparsable={sparsable} dotted={dotted} />}
        </div>



      </div>



        </>
    );
};

export default Test;