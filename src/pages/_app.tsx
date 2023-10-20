import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider, useSession} from "next-auth/react"
import React from "react";
import {ProtectedLayout} from "@/components/ProtectedLayout";
import {Suspense} from "preact/compat";
import Loading from "@/components/Loading";
type AppPropsWithAuth = AppProps & {
    Component: {
        requireAuth?: boolean;
    };
};
// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppPropsWithAuth) {
    return <SessionProvider session={pageProps.session}>
        {Component.requireAuth ? (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
        ) : (
            <Component {...pageProps} />
        )}
    </SessionProvider>;
}

