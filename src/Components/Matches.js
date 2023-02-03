import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Match from './Match';

const Matches = ({ gameType }) => {
    const [matches, setMatches] = useState([]);
    const style = {
        dislay: "flex",




    }
    useEffect(() => {
        axios.get("https://gaming-portal-server-production.up.railway.app/matches/" + gameType)
            .then(({ data }) => {
                setMatches(data)
            })
    }, [])
    return (
        <div style={style}>
            {
                matches?.map(({ _id, gameType, duration, firstPlayer, secondPlayer, creator }) => <Match
                    gameType={gameType}
                    duration={duration}
                    firstPlayer={firstPlayer}
                    secondPlayer={secondPlayer}
                    creator={creator}
                    _id={_id}
                ></Match>)
            }
            {
                matches?.length == 0 && <p className='text-center text-[white] text-3xl my-8'>There is no match ongoing</p>
            }
        </div>
    );
};

export default Matches;