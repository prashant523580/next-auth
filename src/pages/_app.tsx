import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import React from 'react';
import Loader from '@/components/Loader';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
export default function App({ Component, pageProps }: AppProps) {
  const [loading,setLoading] = React.useState(true);
    React.useEffect(() => {
        // setLoading(true);
        setInterval(() => {
            setLoading(false)
        },1500);
    },[])
  return  (
     <SessionProvider
       session={pageProps.session}
    >
      <Provider store={store}>

      <Component {...pageProps} />
      {
        // loading ? <Loader/> : 
      }
      </Provider>
     </SessionProvider>
 
    )
}
