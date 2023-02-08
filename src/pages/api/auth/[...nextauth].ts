import NextAuth,{NextAuthOptions} from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"; 
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
        // validate here your username and password
        if(email == 'user@gmail.com' && password == "user") {
          // throw new Error('invalid credentials');
          return {id: 1, name: 'User', email: 'user@gmail.com'}
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
    session({ session , token, user }: any) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
}
export default NextAuth(authOptions)

