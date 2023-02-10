import NextAuth,{NextAuthOptions} from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"; 
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import { clientPromise } from "../../../db/dbcon";
import User from "@/model/user.model";
import CryptoJs from "crypto-js";
// let {clientPromise} = await connectToDatabase()

const authOptions :NextAuthOptions  = {
  session:{
    strategy:"jwt"
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_SECRET
    }),
    FacebookProvider({
      clientId:process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    CredentialsProviders({
      type: 'credentials',
      credentials: {
        // email: {label : "Email", placeholder:"example@gmail.com"},
        // password : {label: "Password", type: "password"}
      },
     async authorize(credentials , req){
        const {email, password} = credentials as {
          email: string,
          password: string,
        };
        // console.log(email, password)
        // validate here your username and password
        let user : any = await User.findOne({email});
        // console.log(user)
        // if(user.password == password){
        //   return user
        // }
        // throw new Error("invalid credential!")
          let dcryptPassword = CryptoJs.AES.decrypt(user.password, process.env.AES_SECRET_KEY).toString(CryptoJs.enc.Utf8)
        if (password == dcryptPassword) {
          // throw new Error('invalid credentials');
          // console.log(logged_user)
          return {
            id: 1,
            name: user.firstname + " " + user.lastname,
            email: user.email,
            image: user.image
          }    
          
        }
        // confirmed users
        return {error: "invalid credentials"}
      
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise,{
    databaseName : "nextauth"
  }),
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/login",  
  } ,
  callbacks: {
    session({ session , token, user }: any) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
}
export default NextAuth(authOptions)

