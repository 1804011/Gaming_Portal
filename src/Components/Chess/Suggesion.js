import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import Circle from './Circle';
import Promotion from './Promotion';
import Rowcell from './Rowcell';
import Sparsable from './Sparsable';
const rowStyle = {

    width: "450px",
    height: "56.25px",
    display: "flex",
}

const Suggesion = ({ dotted = [], sparsable = [], rotate = "0deg", display = true }) => {

    return (
        <div style={
            {

                top: 0,
                left: 0,
                width: "450px",
                height: "450px",
                rotate: rotate,
                position: "absolute",
                backgroundColor: "rgba(255,255,255,0.04)"

            }
        }>
            <div style={rowStyle}>

                <Rowcell cell={"a8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g8"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h8"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g7"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h7"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g6"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h6"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g5"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h5"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g4"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h4"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g3"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h3"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g2"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h2"} sparsable={sparsable} dotted={dotted} />
            </div>
            <div style={rowStyle}>
                <Rowcell cell={"a1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"b1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"c1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"d1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"e1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"f1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"g1"} sparsable={sparsable} dotted={dotted} />
                <Rowcell cell={"h1"} sparsable={sparsable} dotted={dotted} />
            </div>





        </div>
    );
};

export default Suggesion;