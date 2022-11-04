import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "app/components/layout";
import { CLERK_API_KEY } from "app/config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi={CLERK_API_KEY}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

export default MyApp;
