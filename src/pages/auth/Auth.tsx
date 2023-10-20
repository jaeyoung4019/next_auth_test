import {AppProps} from "next/app";
import {SessionProvider, useSession} from "next-auth/react"
import SignIn from "@/pages/auth/Signin";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export const Auth = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    const [ content , setContent ] = useState();
    const router = useRouter();

    return <p>Signed in as</p>;

}
Auth.requireAuth = true;
export default Auth;
