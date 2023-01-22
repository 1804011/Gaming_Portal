import React, { useState } from 'react';
const CreateGame = ({ gameType, name }) => {
    const [checked, setChecked] = useState(true)
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    return (
        <div style={{
            backgroundColor: "#262421",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        }}>


            <div class=" justify-center h-[400px]" style={{
                boxShadow: "16px 16px 40px rgba(0,0,0,0.25)",
                backgroundColor: "rgba(255,255,255,0.01)"
            }}>

                <div class="flex justify-center self-center  z-10"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.01)"
                    }}
                >
                    <div class="p-12  mx-auto rounded-2xl w-100 ">
                        <div class="mb-2">
                            <h3 class="font-semibold text-2xl text-[white]">Create a {gameType} game </h3>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();


                        }}>
                            <div class="space-y-1">
                                <div class="space-y-1">
                                    <label class="text-sm bg-transparent font-medium text-[white] tracking-wide">Game type</label>
                                    <input
                                        className=
                                        {["w-full", "text-[white]", "bg-transparent", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:border-green-400"].join(' ')}
                                        type="text" value={gameType} readOnly />


                                </div>
                                <div class="space-y-1">
                                    <label class="text-sm font-medium text-[white] tracking-wide">Name</label>
                                    <input

                                        className=
                                        {["w-full", "text-[white]", "bg-transparent", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:border-green-400"].join(' ')}
                                        type="text" value={name} readOnly />


                                </div>
                                <div className='space-y-1'>
                                    <label class="text-sm font-medium text-[white] tracking-wide">
                                        {
                                            gameType == "Chess" ?
                                                "Choose your Chracter" : "Who moved first"
                                        }
                                    </label>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <input type="checkbox" className="toggle my-1" checked={checked} onChange={() => setChecked((pre) => !pre)} />
                                        <span className='mx-1 text-[white] font-medium'>{
                                            gameType === "Chess" ?
                                                checked ? "White" : "Black"
                                                :
                                                checked ? "You" : "Opponent"
                                        }</span>
                                    </div>

                                </div>


                                <div>
                                    <button type="submit" class="w-full flex items-center justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3 mt-1 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Create
                                        {/* <span className='ml-2'>
                                            {(loading || updating) && <Spinner color={"white"} />}
                                        </span> */}


                                    </button>



                                </div>
                            </div>
                            <div class="pt-5 text-center text-gray-400 text-xs">
                                <span>
                                    Copyright © {new Date().getFullYear()}
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default CreateGame;