import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Layout from "app/components/layout";
import { CLERK_API_KEY } from "app/config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={CLERK_API_KEY}>
      <SignedIn>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/device" afterSignUpUrl="/device" />
      </SignedOut>
    </ClerkProvider>
  );
}

export default MyApp;
