import React from 'react'
import Divider from "@mui/material/Divider";
interface PropsTypes{
  title?: string,
  message?: string,
  success?:boolean,
  open?: boolean,
  onClick?: ()=> void
}
export default function Toastify({onClick,title,message,success,open}: any) {
  // const [open ,setOpen] = React.useState(props.open);
  // console.log(props)
  React.useEffect(() => {
    console.log(success)
    setInterval(() => {

      onClick();
    },4000)
  },[])
  return (
    <div className={`toastify ${open == false ? " translate-x-[120%]" : " translate-x-0 "} ease-linear transition-transform `}>
        <div className={` ${success == true ? "text-green-500" : "text-red-600 " } font-bold text-md flex justify-between`}><h1>{title}</h1>
         <span className='cursor-pointer' onClick={onClick}>X</span> </div>
        <Divider/>
        <p className={` ${success == true ? "text-green-500" : "text-red-500 " } text-md px-2`}>{message}</p>
    </div>
  )
}
