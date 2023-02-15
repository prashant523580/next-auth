import { isUserLoggedIn } from "@/redux/actions";
import { AppDispatch } from "@/redux/store/store";
import React from "react";
import { useDispatch } from "react-redux";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout (props:any) {
    const dispatch = useDispatch<AppDispatch>();
    React.useEffect(() => {
            dispatch(isUserLoggedIn());
    },[])
    return(
        <div className="flex flex-col h-[100vh]">
            <Navbar/>
            {/* <div className="body" style={props.sx}> */}

            {props.children}
            {/* </div> */}
            <Footer/>
        </div>
    )
}