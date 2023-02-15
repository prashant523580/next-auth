import { UserTypes } from "@/types/user";
import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { 
    credentialLogin,
     credentialRegister } from "../slices/user.slices"

 const loginUser = (user : UserTypes) => async (dispatch : Dispatch<AnyAction>) => {
        try{
        
            let {data} = await axios.post("/api/login", user,{
                headers:{
                    "Content-Type" : "application/json"
                }
            });
            console.log(data.user)
            dispatch(credentialLogin({type: "user/credentialLogin", payload: {user :data.user, token: data.token}}))
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", JSON.stringify(data.token))
        }catch(error:any){
            
        }
        
    }
    
    const registerUser = (user:UserTypes) => async (dispatch : Dispatch<AnyAction>) => {
        try{
            
            let {data} = await axios.post("/api/register", user,{
                headers:{
                    "Content-Type" : "application/json"
                }
            });
            // console.log(data.user)
            dispatch(credentialRegister({type: "user/credentialRegister", payload: data.user}))
            dispatch(credentialLogin({type: "user/credentialLogin", payload:  {user :data.user, token: data.token}}))
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.token));
        // dispatch(credentialLogin())
    }catch(error:any){

    }
}
const isUserLoggedIn = () => (dispatch: Dispatch<AnyAction>) =>{
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        
        if(user) user = JSON.parse(user)
        if(token && user){
            dispatch(credentialLogin({type: "user/credentialLogin", payload:  {user : user, token: token}}))
            console.log(token,user)
        }
    }

const logout = () => async (dispatch:Dispatch<AnyAction>) => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        dispatch({
            type:"credentialLogout"
        })
}
    export {
    loginUser,registerUser,
     isUserLoggedIn,
     logout
}