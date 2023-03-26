import NextAuth,{NextAuthOptions} from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"; 
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import { clientPromise } from "../../../lib/mongodb";
import User from "@/model/user.model";
import CryptoJs from "crypto-js";
import connectToMongoDb  from "@/db/dbconn";
// let {clientPromise} = await connectToDatabase()
// import jwt from "jsonwebtoken"
const authOptions :NextAuthOptions  = {
  adapter: MongoDBAdapter(clientPromise,{databaseName:"nextauth"}),
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
      async authorize(credentials , req:any){
      connectToMongoDb()
        const {email, password} = credentials as {
          email: string,
          password: string,
        };
        
        let user  = await User.findOne({email});
        // console.log(user)
        // if(user.password == password){
        //   return user
        // }
        // throw new Error("invalid credential!")
          let dcryptPassword = CryptoJs.AES.decrypt(user.password, process.env.AES_SECRET_KEY).toString(CryptoJs.enc.Utf8)
        
          if (password == dcryptPassword) {
          // throw new Error('invalid credentials');
          // console.log(logged_user)
          // return user
          
          return {
            id: user._id,
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
 
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/login",  
  } ,
 
  callbacks: {
    async session({ session , token, user }) {
      // const encodedToken = jwt.sign(token, process.env.JWT_SECRET, { algorithm: 'HS256'});
      // session.id = token.id;
      // session.token = encodedToken;
      // return Promise.resolve(session);
      return session // The return type will match the one returned in `useSession()`
    },
  },
}
export default NextAuth(authOptions)

