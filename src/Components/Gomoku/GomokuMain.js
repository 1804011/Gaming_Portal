import React, { useEffect, useState } from 'react';
import Gomoku, { bestMoves } from './Gomoku';
import { Form } from 'react-bootstrap';
import GomokuBoard from './GomokuBoard';
import GameOver from '../../Media/GameOver.wav'
import Gomoku3, { optimalMove } from './Gomoku3';

const GomokuMain = () => {
    const [gomoku, setGomoku] = useState(new Gomoku());
    const [disable, setDisable] = useState(false);
    const [special, setSpecial] = useState(gomoku.special);
    const [clickAble, setClickAble] = useState(false);
    const [firstMove, setFirstMove] = useState(0);
    const [startPlay, setStartPlay] = useState(false);
    useEffect(() => {
        if (gomoku.isWin()) {
            setSpecial([...gomoku.special]);
            new Audio(GameOver).play();
            return;
        }
        else if (gomoku.isDraw()) {
            alert("Draw");
            return;
        }
        setTimeout(() => {
            if (startPlay && firstMove === gomoku.turn()) {

                setGomoku((pre) => {
                    console.log(pre.toBoardString());
                    const newGomku = new Gomoku3(pre.toBoardString());
                    console.log(newGomku.moves());
                    return pre;
                })
                setClickAble(true);

            }
        }, [100])

    }, [gomoku])
    useEffect(() => {
        if (startPlay && clickAble === false) {
            alert('play started')
            if (firstMove === 0) {
                const { i, j } = optimalMove(gomoku.toBoardString(), 4, 1);
                console.log(i, j);
                setGomoku(new Gomoku(gomoku.move(i, j)));
                setClickAble(true);
            }
            else {
                setClickAble(true);
            }
        }
    }, [startPlay])

    const onCellClick = (r, c) => {
        const result = gomoku.move(r, c);
        if (result) {
            setGomoku(new Gomoku(result));
            setClickAble(false)

        }
    }



    return (
        <div style={{ margin: "48px" }}>
            <div style={{ margin: "24px" }}>
                <h6>Who moves first!!</h6>
                <form name='move-select'>
                    <Form.Check
                        disabled={disable}
                        checked
                        type={"radio"}
                        name={'radio'}
                        value={0}
                        label={`Computer`}
                        onClick={(e) => {
                            setFirstMove(e.target.value)
                        }}

                    />
                    <Form.Check
                        disabled={disable}
                        type={"radio"}
                        name={"radio"}
                        label={`You`}
                        value={1}
                        onClick={(e) => {
                            setFirstMove(e.target.value)
                        }}

                    />
                    <input form='move-select'
                        disabled={disable}
                        onClick={() => {
                            setDisable(true);
                            setStartPlay(true);
                        }}
                        type={"submit"}
                        value="Start Play..."
                        className='btn btn-danger' />
                </form>

            </div>
            <GomokuBoard onClick={clickAble ? onCellClick : () => { }} position={gomoku.toBoardString()} special={special} />
        </div>
    );
};

export default GomokuMain;