import React from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = ({ color }) => {
    return (
        <div>
            <BeatLoader color={color} size={6} />
        </div>
    );
};

export default Spinner;