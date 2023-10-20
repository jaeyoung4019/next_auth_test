import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {string} from "prop-types";

// @ts-ignore
// @ts-ignore
export default NextAuth({

  providers: [
    CredentialsProvider({
      type: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        let res = await axios.post("http://localhost:8080/test/token" , JSON.stringify(credentials) , {
          headers: { "Content-Type": "application/json" }
        } );

        const user = {id:"test" , token: res.data, username: "test" , role: "USER"};
        // const user = null;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your id" },
        password: { label: "Password", type: "password" }
      }
    })

  ],

  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 100000 // 세션 만료
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: '/auth/Signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, token, user }) {


      session.user.username = token.userId;

      session.user.token = token.accessToken;

      session.user.role = token.role;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if(user) {
        token.userId = user.username;
        token.role = user.role;
        token.accessToken = user.token;
      }

      return token
    }
  },
  events: {},
  debug: false,
})
