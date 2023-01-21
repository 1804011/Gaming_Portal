import React, { useRef, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../firebase.init';
import Spinner from './Spinner';

const ForgotPassword = () => {
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(
            auth
        );
    const validator = require("validator")
    const [emailError, setEmailError] = useState(0);
    const emailRef = useRef("")

    return (
        <div style={{
            width: "450px",
            boxShadow: "16px 16px 40px rgba(0,0,0,0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "16px",
            borderRadius: "16px"
        }}>


            <div class=" justify-center">

                <div class="flex justify-center self-center  z-10">
                    <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                        <div class="mb-4">
                            <h3 class="font-semibold text-2xl text-gray-800">Forget Password </h3>
                            <p class="text-gray-500">Please provide your email.

                            </p>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const email = emailRef.current.value;
                            if (validator.isEmail(email)) {
                                const result = await sendPasswordResetEmail(email, {
                                    url: "http://localhost:3000/login"
                                });
                                if (result) {

                                    toast.info("Email sent")
                                }
                            }
                            else {
                                alert('invalid')
                                setEmailError(1)
                            }
                        }}>
                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input
                                        ref={emailRef}
                                        className={["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", (error || emailError) ? "border-red-400" : "focus:border-green-400"].join(' ')}


                                        type="email" placeholder="mail@gmail.com" />
                                    <p className='text-xs  text-[firebrick] font-[600]'>
                                        {emailError.length > 0 && "*Email is invalid"
                                            (emailError === 1 && "*Email is invalid")
                                            ||
                                            (error?.message?.includes('user') &&
                                                "*User not found")
                                        }

                                    </p>
                                </div>

                                <div class="flex items-center justify-between">


                                </div>
                                <div >
                                    <button type="submit" class="w-full flex items-center justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Sent mail
                                        <span className='ml-2'>
                                            {sending && <Spinner color={"white"} />}
                                        </span>


                                    </button>
                                    <p className='text-center text-gray-500 text-small mt-[6px]'>
                                        Back to
                                        <Link to="../login" className="text-green-400 hover:text-green-500 ml-[2px]">Sign in</Link>
                                    </p>
                                </div>
                            </div>

                        </form>
                        <div class="pt-5 text-center text-gray-400 text-xs">
                            <span>
                                Copyright © {new Date().getFullYear()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default ForgotPassword;