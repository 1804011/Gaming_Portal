import React from 'react';
import Dot from './Dot';

const Row = ({ val, row, width, height, onClick, special }) => {
    const rowStyle = {
        width,
        height,
        display: "flex"
    }
    const cellStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid green",
        borderRight: "1px solid green",
        width: parseInt(width / 15),
        height


    }
    return (
        <div style={rowStyle}>
            {
                val?.map((value, col) =>
                    <div key={col} style={cellStyle} onClick={() => onClick(row, col)}>
                        {
                            // (special.includes(15 * row + col) && <Dot color='rgba(178,34,34,0.4)' />)
                            // ||
                            (value == 3 && <Dot color={special.includes(15 * row + col) ? "rgba(65, 105, 225,0.3)" : "rgb(65, 105, 225)"} />)
                            ||
                            (value == 2 && <Dot color={special.includes(15 * row + col) ? "rgba(255,99,71,0.3)" : "rgb(255, 99, 71)"} />)
                        }
                    </div>

                )
            }
        </div>
    );
};

export default Row;