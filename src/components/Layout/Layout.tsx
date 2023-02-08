import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout (props:any) {
    return(
        <>
            <Navbar/>
            <div className="body" style={props.sx}>

            {props.children}
            </div>
            <Footer/>
        </>
    )
}