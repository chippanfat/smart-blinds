import { ReactElement } from "react";
import Nav from "app/components/nav";
import Footer from "app/components/footer";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-6 mt-6 mb-auto h-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
