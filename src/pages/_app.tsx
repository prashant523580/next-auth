import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import React from 'react';
import Loader from '@/components/Loader';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import NextNProgress from "nextjs-progressbar"
import { useRouter } from 'next/dist/client/router';
export default function App({ Component, pageProps }: AppProps) {
  const [loading,setLoading] = React.useState(true);
  const [token,setToken] = React.useState<string>('');
  const [user,setUser] = React.useState<any>();
  const router = useRouter();
    React.useEffect(() => {
        // setLoading(true);
        // let tk : any = localStorage.getItem("token");
        // let user = localStorage.getItem("user");

        
        // if(user) user = JSON.parse(user)
        // setToken(tk)
        // setUser(user)
        setInterval(() => {
            setLoading(false)
        },1500);
    },[])
    React.useEffect(() => {

        let tk : any = localStorage.getItem("token");
        let user = localStorage.getItem("user");

        
        if(user) user = JSON.parse(user)
        setToken(tk)
        setUser(user)
      // setLoading(true); 
    },[router.query])
  return  (
     <SessionProvider
       session={pageProps.session}
    >
      <Provider store={store}>
      <NextNProgress color='#245'/>
      <Component user={user} token={token} {...pageProps} />
      {
        // loading ? <Loader/> : 
      }
      </Provider>
     </SessionProvider>
 
    )
}
