import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession ,signIn, signOut } from 'next-auth/react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout/Layout'
import Loader from '@/components/Loader'
import React from "react";
const  Home  : NextPage = () =>  {
  // const [session,setSession] = React.useState(false);
  const [loading,setLoading] = React.useState(true);
    React.useEffect(() => {
        // setLoading(true);
        setInterval(() => {
            setLoading(false)
        },300);
    },[])
const {data: session} = useSession();
  // if(session){
  //   console.log(session)
  //   return(
  //     <>
  //       Signed as {session?.user?.email} <br/>
  //       <button onClick={() => signOut()}> signout </button>
  //     </>
  //   )
  // }
  return (
    loading ? <Loader/> : 
    <Layout>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
   
        {/* <div className={styles.center}>
       
          <div className={styles.thirteen}>
            next-auth
          </div>
        </div> */}

        <div className={styles.grid}>
         <div>
          {
            session ?   <div>
            <p>Name: {session?.user?.name}</p>
              <p> Signed as {session?.user?.email} </p>
            <button className='bg-gray-800 text-white rounded-sm px-3 py-2' onClick={() => signOut()}> signout </button></div>
            :
          <button onClick={() => signIn()}>Login</button>
          }
         </div>
        </div>
      </main>
    </Layout>
   
  )
}

export default Home