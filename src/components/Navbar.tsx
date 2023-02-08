import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
export default function Navbar() {
  return (
    <nav>
      <header className="text-gray-600 body-font bg-white sticky top-0">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link href={"/"} className="mr-5 hover:text-gray-900">Home</Link>
      <Link href={"/auth/login"} className="mr-5 hover:text-gray-900">Login</Link>
    </nav>
    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <Image src={"/images/nextauth.png"} alt="logo" width={30} height={30} />
      <span className="ml-3 text-xl">Next Auth</span>
    </a>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      {/* <Lv */}
    </div>
  </div>
</header>
    </nav>
  )
}
