import BaseCard from '@/components/BaseCard/Basecard';
import { Button, Grid, Stack, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import type { NextPage } from 'next';
import { signIn,useSession } from 'next-auth/react';
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import {useDispatch,useSelector} from "react-redux";
import { credentialLogin } from '@/redux/slices/user.slices';
import { RootState } from '@/redux/store/store';
const Login : NextPage = () => {
    const dispatch= useDispatch();
    const state = useSelector((state:RootState) => state.user);
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const {data :session} = useSession();
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();
    React.useEffect(() => {
    
        if(session){
            router.push('/')
        }
        
        setInterval(() => {
            setLoading(false)
        }, 500);
    }, [])
    React.useEffect(() => {
        // setLoading(true);
        console.log(state)
       
    }, [state])
    const inputEvent = (e: any) => {
        let { name, value } = e.target;
        // console.log(name, value)
        setUser((pre: any) => {
            return { ...pre, [name]: value }
        })
    }
    const loginUser = async (e: any) => {
        e.preventDefault();
        // console.log(user)
   
        // dispatch(credentialLogin(duser));
        // console.log(user)
        signIn("credentials", {email:user.email, password:user.password,callbackUrl:"http://localhost:3000"})
        // let res = await fetch("/api/login",{
        //     method:"POST",
        //     body: JSON.stringify(user),
        //     headers:{
        //         "Content-Type" :"application/json"
        //     }
        // })
        // let data = await res.json();
        // console.log(data.user);
        // localStorage.setItem("user", JSON.stringify(data.user))
        // const res = await signIn("credentials", {
        //     email: user.email,
        //     password: user.password,
        //     redirect: false
        // })
        // console.log(res)
    }
    async function handleGoogleLogin(){
        signIn("google",{callbackUrl:"http://localhost:3000"})
    // }   console.log(res)
    }
    const  handleGithubLogin = async() => {
        signIn('github', {callbackUrl:'http://localhost:3000'})
    }
    const  handleFacebookLogin = async() => {
        signIn('facebook', {callbackUrl:'http://localhost:3000'})
    }
    return (

      
            <Layout sx={{
                padding: "6px 0"
            }}>
                {/* <h1>Login form</h1> */}
                <div className="container mx-auto ">
                    <div className="flex justify-center  px-6 my-2">

                        <div className="w-full xl:w-3/4 bg-white rounded-xl lg:w-11/12 flex flex-wrap shadow-xl">
                        <div className="w-full lg:w-7/12 bg-white  rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 text-2xl text-center">Login!</h3>
                                <form onSubmit={loginUser} className="px-6 pt-6 pb-8 mb-4 bg-white rounded">


                                    <div className="mb-4">
                                        <TextField

                                            // error={emailError}
                                            fullWidth
                                            value={user.email}
                                            label="Email"
                                            variant='standard'
                                            type={'email'}
                                            id={'email-basic'}
                                            onChange={inputEvent}
                                            name="email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <TextField

                                            // error={emailError}
                                            fullWidth
                                            value={user.password}
                                            label="Password"
                                            variant='standard'
                                            type={'password'}
                                            id={'password-basic'}
                                            onChange={inputEvent}
                                            name="password"
                                        />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    {/* <hr className="mb-6 border-t" /> */}
                                    {/* <div className="">
                                        <Di/ider sx={{ my: 1 }} component={"div"}  >Or </Divider></div> */}
                                
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                            href="#"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                            href="/auth/register"
                                        >
                                            Don't have an account? Register!
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full h-auto lg:block lg:w-5/12 bg-contain  bg-no-repeat bg-center rounded-l-lg"
                                // style={{ backgroundImage: "url('/images/form.jpg')" }}
                                >
                                        <h3 className="pt-4  max-lx:pt-0 text-2xl text-center">Social Login!</h3>
                                        <div className='className="px-6 pt-6 pb-8 mb-4 max-xl:pt-2 bg-white rounded"'>

                                        <Stack sx={{
                                            my:2,
                                            textALign:"left",
                                            px:3
                                    }} spacing={.3}>


                                        <Button onClick={handleGoogleLogin} size='small' style={{ background: "var(--lightblue)", color: "white", textTransform: "capitalize", }}> <div className="flex justify-start w-full"><GoogleIcon /><span className='mx-2'>Login with Google</span></div></Button>
                                        <Button onClick={handleGithubLogin} size='small' style={{ background: "var(--lightblue)", color: "white", textTransform: "capitalize", }}> <div className="flex justify-start w-full"><GitHubIcon /><span className='mx-2'>Login with Github</span></div></Button>
                                        <Button onClick={handleFacebookLogin} size='small' style={{ background: "var(--lightblue)", color: "white", textTransform: "capitalize", }}> <div className="flex justify-start w-full"><FacebookIcon /><span className='mx-2'>Login with Facebook</span></div> </Button>
                                    </Stack>
                                            </div>
                            </div>

                           
                        </div>

                    </div>
                </div>

            </Layout>
    )
}

export default Login