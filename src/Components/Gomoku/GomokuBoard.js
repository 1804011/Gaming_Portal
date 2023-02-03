import React from 'react';
import Row from './Row';

const GomokuBoard = ({ position = "", width = 330, height = 330, onClick, special = [] }) => {
    let boardStatus = [];
    for (let i = 0; i < 15; i++) {
        let arr = [];
        for (let j = 0; j < 15; j++) {
            let char = parseInt(position[15 * i + j]);
            if (isNaN(char))
                char = 1;
            else char = parseInt(position[15 * i + j]);
            arr.push(char);

        }
        boardStatus.push(arr);

    }

    return (
        <div style={{
            border: "1px solid green",
            width
        }}>
            {
                boardStatus?.map((val, row) =>
                    <Row
                        row={row}
                        val={val}
                        width={width}
                        height={height / 15}
                        onClick={onClick}
                        special={special}
                        key={row}
                    />

                )
            }
        </div>
    );
};

export default GomokuBoard;