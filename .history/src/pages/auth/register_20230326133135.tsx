import { Button, Grid, Stack, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import type { NextPage } from 'next';
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import Loader from '@/components/Loader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Toastify from '@/components/Toastify';
import { UserTypes } from '@/types/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser } from "@/redux/actions/index"
const Register: NextPage = () => {
    const [user, setUser] = React.useState<UserTypes>({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = React.useState(true);
    const [passwordError, setPasswordError] = React.useState(false);
    const [firstnameError, setFirstnameError] = React.useState(false);
    const [lastnameError, setLastnameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [cPasswordError, setCPasswordError] = React.useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(null);
    const [responseMessage, setResponseMessage] = React.useState('');

    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        // setLoading(true);
        setInterval(() => {
            setLoading(false)
        }, 500);
    }, [])
    const inputEvent = (e: any) => {
        let { name, value } = e.target;
        setUser((pre: any) => {
            return {
                ...pre,
                [name]: value
            }
        })

    }
    const isEmpty = () => {
        (user.firstname === "") ? setFirstnameError(true) : setFirstnameError(false);
        (user.lastname === "") ? setLastnameError(true) : setLastnameError(false);
        (user.email === "") ? setEmailError(true) : setEmailError(false);
        (user.phone === "") ? setPhoneError(true) : setPhoneError(false);
        (user.password === "") ? setPasswordError(true) : setPasswordError(false);
        (user.cpassword === "") ? setCPasswordError(true) : setCPasswordError(false);

    }
    const handleRegisterUser = async (e: any) => {
        // e.preventDefault();
        isEmpty()
        if (user.password !== user.cpassword) {
            setConfirmPasswordError(true)
            return false
        } else {
            setConfirmPasswordError(false)
        }
        if (!(user.firstname || user.lastname || user.phone || user.email || user.password || user.cpassword)) {
            return false
        }

        //  setLastnameError(false)
        // setEmailError(false)
        //  setPasswordError(false)
        //  setCPasswordError(false)
        // console.log(user)
        // let config = {
        //     headers:{
        //         "Content-Type": "application/json"
        //     }
        // }
        dispatch(registerUser(user))
        router.push("/")
        // let res = await fetch("/api/register",{
        //     headers:{
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(user),
        //     method:"POST"
        // });
        // let data = await res.json();
        //     if(data.success){
        //         router.push("/auth/login")
        //         setResponseMessage(data.message)
        //         setSuccess(data.success)
        //         setOpen(true)
        //         setUser({
        //             email:"",
        //             firstname:"",
        //             lastname:"",
        //             phone:"",
        //             password:"",
        //             cpassword:""
        //         })
        //     }


    }
    return (
        // loading ? <Loader /> :
        <Layout sx={{
            padding: "6px 0"
        }}>
            <Toastify onClick={() => setOpen(false)} open={open} succes={success} title="Register" message={responseMessage} />

            {/* {error && <Toastify title="Register" message={responseMessage}/>} */}
            {/* <h1>Login form</h1> */}
            {/* <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <BaseCard title="Login Form" sx={{
                        width: 400,
                        margin: "0 auto"
                    }}>
                        <Stack spacing={0}>

                            <TextField
                                value={user.name}
                                label="Name"
                                variant='filled'
                                type={'text'}
                                id={'name-basic'}
                                onChange={inputEvent}
                                name="name"
                            />
                            <TextField
                                value={user.phone}
                                label="Phone"
                                variant='filled'
                                type={'number'}
                                id={'phone-basic'}
                                onChange={inputEvent}
                                name="phone"
                            />
                            <TextField
                                value={user.email}
                                label="Email"
                                variant='filled'
                                type={'email'}
                                id={'email-basic'}
                                onChange={inputEvent}
                                name="email"
                            />
                            <TextField
                                value={user.password}
                                label="Password"
                                variant='filled'
                                type={'password'}
                                id={'password-basic'}
                                onChange={inputEvent}
                                name="password"
                            />
                            <Button onClick={loginUser} style={{ background: "var(--darkblue)", color: "white", margin: "6px 0" }} type='submit'>Login</Button>
                        </Stack>
                        <div className="">
                            <Divider sx={{ my: 1 }} component={"div"}  >Or </Divider></div>
                        <Stack sx={{
                            margin: ".3em 0"
                        }}>

                            <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><GoogleIcon /><span className='mx-2'>Login with Google</span></div></Button>
                            <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><GitHubIcon /><span className='mx-2'>Login with Github</span></div></Button>
                            <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center"><FacebookIcon /><span className='mx-2'>Login with Facebook</span></div> </Button>
                        </Stack>
                        <Divider />
                        <Link href="/auth/login">Already a member?</Link>
                    </BaseCard>
                </Grid>
            </Grid> */}
            <div className="container mx-auto ">
                <div className="flex justify-center  px-6 my-2">

                    <div className="w-full xl:w-1/4 bg-white rounded-xl  flex flex-wrap shadow-xl">
                        <div className="w-full bg-white  rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <div className="px-6 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <TextField
                                            error={firstnameError}
                                            value={user.firstname}
                                            label="Firstname"
                                            variant='standard'
                                            type={'text'}
                                            id={'fname-basic'}
                                            onChange={inputEvent}
                                            name="firstname"
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <TextField
                                            error={lastnameError}
                                            value={user.lastname}
                                            label="Lastname"
                                            variant='standard'
                                            type={'text'}
                                            id={'lname-basic'}
                                            onChange={inputEvent}
                                            name="lastname"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <TextField
                                        fullWidth
                                        error={phoneError}
                                        value={user.phone}
                                        label="Phone"
                                        variant='standard'
                                        type={'phone'}
                                        id={'phone-basic'}
                                        onChange={inputEvent}
                                        name="phone"
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextField

                                        error={emailError}
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
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">

                                        <TextField
                                            error={passwordError}
                                            value={user.password}
                                            label="Password"
                                            variant='standard'
                                            type={'password'}
                                            id={'password-basic'}
                                            onChange={inputEvent}
                                            name="password"
                                        />
                                        {
                                            confirmPasswordError &&
                                            <p className="text-xs italic text-red-500">Password does not match.</p>
                                        }
                                    </div>
                                    <div className="md:ml-2">
                                        <TextField
                                            error={cPasswordError}
                                            value={user.cpassword}
                                            label="Confirm Password"
                                            variant='standard'
                                            type={'password'}
                                            id={'cpassword-basic'}
                                            onChange={inputEvent}
                                            name="cpassword"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        onClick={handleRegisterUser}
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                {/* <hr className="mb-6 border-t" /> */}

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
                                        href="/auth/login"
                                    >
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full h-auto lg:block lg:w-5/12 bg-contain  bg-no-repeat bg-center rounded-l-lg"
                        // style={{ backgroundImage: "url('/images/form.jpg')" }}
                        >
                            <h3 className="pt-4  max-lx:pt-0 text-2xl text-center">Social Login!</h3>
                            <div className='className="px-6 pt-6 pb-8 mb-4 max-xl:pt-2 bg-white rounded"'>

                                <Stack sx={{
                                    my: 2,
                                    textALign: "left",
                                    px: 3
                                }} spacing={.3}>
                                    <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex justify-start items-center w-full"><GoogleIcon /><span className='mx-2'>Login with Google</span></div></Button>
                                    <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex justify-start items-center w-full"><GitHubIcon /><span className='mx-2'>Login with Github</span></div></Button>
                                    <Button size='small' style={{ background: "var(--lightblue)", color: "white", margin: "1px 0", textTransform: "capitalize", }}> <div className="flex  justify-start items-center w-full"><FacebookIcon /><span className='mx-2'>Login with Facebook</span></div> </Button>
                                </Stack>
                            </div>
                        </div> */}


                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default Register