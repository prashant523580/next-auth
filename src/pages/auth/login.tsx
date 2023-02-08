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
const Login: NextPage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const {data :session} = useSession();
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();
    React.useEffect(() => {
        // setLoading(true);
        if(session){
            router.push('/')
        }
        
        setInterval(() => {
            setLoading(false)
        }, 500);
    }, [])
    const inputEvent = (e: any) => {
        let { name, value } = e.target;
        console.log(name, value)
        setUser((pre: any) => {
            return { ...pre, [name]: value }
        })
    }
    const loginUser = async (e: any) => {
        e.preventDefault();
        console.log(user)
        const res = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false
        })
        console.log(res)
    }
    async function handleGoogleLogin(){
        signIn("google",{callbackUrl:"http://localhost:3000"})
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

                        <div className="w-full xl:w-3/4 bg-white rounded-xl lg:w-11/12 flex shadow-xl">
                            <div className="w-full h-auto hidden lg:block lg:w-5/12 bg-contain bg-no-repeat bg-center rounded-l-lg"
                                style={{ backgroundImage: "url('/images/form.jpg')" }}></div>

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
                                    <div className="">
                                        <Divider sx={{ my: 1 }} component={"div"}  >Or </Divider></div>
                                    <Stack sx={{
                                        margin: ".3em 0"
                                    }}>

                                        <Button onClick={handleGoogleLogin} size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><GoogleIcon /><span className='mx-2'>Login with Google</span></div></Button>
                                        <Button onClick={handleGithubLogin} size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><GitHubIcon /><span className='mx-2'>Login with Github</span></div></Button>
                                        <Button onClick={handleFacebookLogin} size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><FacebookIcon /><span className='mx-2'>Login with Facebook</span></div> </Button>
                                    </Stack>
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
                        </div>

                    </div>
                </div>

            </Layout>
    )
}

export default Login