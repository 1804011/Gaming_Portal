import { Button, Checkbox, Form, Input } from 'antd';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Spinner from './Spinner';
const Login = () => {
    const [signedIn: user, userLoading, userError] = useAuthState(auth);
    const navigate = useNavigate("")
    const location = useLocation();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const validator = require('validator');


    let from = location.state?.from?.pathname || "/";
    if (user) {
        navigate(from, { replace: true });
    }

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
                            <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
                            <p class="text-gray-500">Please sign in to your account.</p>
                        </div>
                        <form onSubmit={handleSubmit(({ email, password }) => {
                            signInWithEmailAndPassword(email, password)
                        })}>
                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input
                                        {...register("email", {
                                            required: true,
                                            validate: (val) => validator.isEmail(val)
                                        })}
                                        className={["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", errors?.email || error?.toString()?.includes("user") ? "border-red-400" : "focus:border-green-400"].join(' ')}

                                        type="email" placeholder="mail@gmail.com" />
                                    <p className='text-xs  text-[firebrick] font-[600]'>
                                        {
                                            errors?.email?.type === "required" &&
                                            "*Email is required"
                                        }
                                        {
                                            errors?.email?.type === "validate" &&
                                            "*Email is invalid"
                                        }
                                        {
                                            error?.toString()?.includes("user") && "*Email does not exist"
                                        }


                                    </p>
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                        Password
                                    </label>
                                    <input
                                        {...register("password", {
                                            required: true,
                                        })}
                                        className={["w-full", "text-base", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", (!errors?.email && errors?.password) || error?.toString()?.includes('password') ? "border-red-400" : "focus:border-green-400"].join(' ')}
                                        type="password" placeholder="Enter your password" />
                                    <p className='text-xs  text-[firebrick] font-[600]'>
                                        {
                                            (!(errors?.email) && errors?.password?.type) === "required" &&
                                            "*Password is required"
                                        }{
                                            error?.toString()?.includes('password') && "*Wrong password"
                                        }

                                    </p>
                                </div>
                                <div class="flex items-center justify-between">

                                    <div class="text-sm">
                                        <Link to="/forgot-password" className="text-green-400 hover:text-green-500">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                                <div >
                                    <button type="submit" class="w-full flex items-center justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Sign in
                                        <span className='ml-2'>
                                            {loading && <Spinner color={"white"} />}
                                        </span>


                                    </button>
                                    <p className='text-center text-gray-500 text-small mt-[6px]'>
                                        New to this site?
                                        <Link to="../register" className="text-green-400 hover:text-green-500 ml-[2px]">Register</Link>
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
export default Login;