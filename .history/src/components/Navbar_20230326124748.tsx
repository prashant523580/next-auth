import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { logout } from '@/redux/actions';
export default function Navbar() {
  const {data :session} = useSession();
  const {user,token} = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch<any>();
  // const [user,setUser] = React.useState(() => {
    //  if(typeof window != "undefined"){

    //    let user = localStorage.getItem("user")
    //    user ? user = JSON.parse(user) : null
    //    return user
    //   }
  // })
 
  const handleSignOut = async () => {
      if(session){
        return signOut()
      }else{

        
        // localStorage.clear("token");
        // localStorage.clear("user");
        dispatch(logout())
        window.location.reload();
      }
  }
  return (
    <nav>
      <header className="text-gray-600 body-font shadow-sm bg-white sticky top-0">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link href={"/"} className="mr-5 hover:text-gray-900">Home</Link>
      {/* <Link href={"/auth/login"} className="mr-5 hover:text-gray-900">Login</Link> */}
    </nav>
    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <Image src={"/images/nextauth.png"} alt="logo" width={30} height={30} />
      <span className="ml-3 text-xl">Next Auth</span>
    </a>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      {/* <Lv */}
    {
      session || token  ? 
      <div>
          <h1>{user.firstname}</h1>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      :
      <button onClick={() => signIn()}>Login</button>
    }
    </div>
  </div>
</header>
    </nav>
  )
}
