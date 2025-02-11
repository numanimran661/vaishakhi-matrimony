"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./styles/global.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
          {!isAuthRoute && <Header />}
          <div>{children}</div>
          {!isAuthRoute && <Footer />}

          <div id="modal-root"></div>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
