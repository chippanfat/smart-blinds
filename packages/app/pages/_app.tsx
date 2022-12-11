import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { SWRConfig } from "swr";
import Layout from "app/components/layout";
import { CLERK_API_KEY, GATEWAY_URL } from "app/config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={CLERK_API_KEY}>
      <SWRConfig
        value={{
          fetcher: (resource: string, init = {}) => {
            const sessionCookie = document.cookie
              .split(" ")
              .find((item) => item.includes("__session"))
              ?.replace("__session=", "");

            return fetch(
              GATEWAY_URL.concat(resource),
              Object.assign(
                {
                  headers: {
                    Authorization: `Bearer ${sessionCookie}`,
                    "x-forwarded-host": "localhost",
                    "x-forwarded-port": "3000",
                  },
                },
                init
              )
            ).then((res) => res.json());
          },
        }}
      >
        <SignedIn>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SignedIn>
        <SignedOut>
          <SignInButton afterSignInUrl="/device" afterSignUpUrl="/device" />
        </SignedOut>
      </SWRConfig>
    </ClerkProvider>
  );
}

export default MyApp;
