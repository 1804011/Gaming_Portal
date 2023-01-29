import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Match = ({ _id, creator, gameType, firstPlayer, secondPlayer, duration }) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate("");
    return (
        <div className="indicator mx-4 my-6">
            <span className="indicator-item badge badge-primary">{gameType}</span>
            <div style={{ borderRadius: "12px" }}
                className="grid text-center p-4 w-[200px] h-[200px] rounded-3 bg-[rgba(255,255,255,0.03)] text-[white] place-items-center">
                <p>Creator: {creator}</p>
                <p>Duration:{`${duration} minutes` || "unlimited"}</p>
                <p>
                    {firstPlayer ?
                        "You are black" : "You are white"
                    }
                </p>
                <button className="btn btn-outline btn-sm btn-warning disabled:text-[gray]" disabled={creator === user?.displayName} onClick={() => navigate("/Chess/friend/playing/" + _id)}>Join Game</button>
            </div>
        </div>
    );
};

export default Match;