import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth'
import Spinner from './Spinner';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate("");
    const [duplicate, setDuplicate] = useState(0)
    const [signedIn: user, userLoading, userError] = useAuthState(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
    const validator = require('validator');
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);


    if (signedIn) {
        navigate("/")
    }
    console.log(duplicate);

    return (
        <div style={{
            width: "450px",
            boxShadow: "16px 16px 40px rgba(0,0,0,0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px"
        }}>


            <div class=" justify-center">

                <div class="flex justify-center self-center  z-10">
                    <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                        <div class="mb-2">
                            <h3 class="font-semibold text-2xl text-gray-800">Register </h3>
                            <p class="text-gray-500">Please register your new account</p>
                        </div>
                        <form onSubmit={handleSubmit(async ({ name, email, password }) => {
                            let flag = 0;
                            await axios.get("https://gaming-portal-server.vercel.app/user/" + name)
                                .then(({ data }) => {

                                    if (data?.name === name) {
                                        flag = 1;
                                    }
                                })
                            if (flag) {
                                setDuplicate(1)
                                return 0;
                            }


                            const result = await createUserWithEmailAndPassword(email, password);
                            await updateProfile({ displayName: name })

                            if (result) {
                                axios.post("https://gaming-portal-server.vercel.app/user", { name, email }).then(({ data }) => {
                                    if (data?.status === "success") {
                                        navigate("/login")
                                    }
                                })
                            }

                        })}>
                            <div class="space-y-4">
                                <div class="space-y-1">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Your Name</label>
                                    <input  {...register("name", {
                                        required: true,
                                        validate: (val) => {
                                            setDuplicate(0);
                                            return (val.trim().length >= 6 && val.trim().length <= 15)
                                        }



                                    })}
                                        className=
                                        {["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", errors?.name ? "border-red-400" : "focus:border-green-400"].join(' ')}
                                        type="text" placeholder="Your Name" />
                                    <p className='text-xs  text-[firebrick] font-[600]'>
                                        {
                                            errors?.name?.type === "required" &&
                                            "*Name is required"
                                        }
                                        {
                                            (errors?.name?.type === "validate" &&
                                                "*Name is between 6 and 15 character")

                                        }
                                        {
                                            (duplicate === 1) && "*Name is already taken"
                                        }



                                    </p>

                                </div>
                                <div class="space-y-1">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input
                                        {...register('email', {
                                            required: true,
                                            validate: (val) => {

                                                return validator.isEmail(val)
                                            }

                                        })}
                                        className=
                                        {["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", (!errors?.name && errors?.email) || (error?.message?.includes('email')) ? "border-red-400" : "focus:border-green-400"].join(' ')}
                                        type="email" placeholder="Your email" required={false} />

                                    <p className='text-xs font-[600] text-[firebrick]'>
                                        {
                                            (errors?.email &&
                                                (errors?.email?.type === "required" && "*Email is required") ||
                                                (errors?.email?.type === "validate" && "*Email is invalid"))
                                            ||
                                            (error?.message?.includes('email') && "*Email already in use")

                                        }


                                    </p>
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                        Password
                                    </label>
                                    <input
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 15
                                        })}
                                        className={["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", ((!errors?.name) && (!errors?.email) && errors?.password) ? "border-red-400" : "focus:border-green-400"].join(' ')}

                                        type="password" placeholder="Enter your password" />
                                    <p className='text-xs font-[600] text-[firebrick]'>
                                        {
                                            (errors?.name || errors?.email) ? "" :
                                                errors?.password?.type === "required" && "*Password is required" ||
                                                errors?.password?.type === "minLength" && "*Minimum 6 characters long" ||
                                                errors?.password?.type === "maxLength" && "*Maximum 15 characters long"

                                        }
                                    </p>
                                </div>

                                <div>
                                    <button type="submit" class="w-full flex items-center justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Register
                                        <span className='ml-2'>
                                            {(loading || updating) && <Spinner color={"white"} />}
                                        </span>


                                    </button>

                                    <p className='text-center text-gray-500 text-small mt-[6px]'>
                                        Already registered?
                                        <Link to="../login" className="text-green-400 hover:text-green-500 ml-[2px]">Sign in</Link>
                                    </p>

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

export default Register;