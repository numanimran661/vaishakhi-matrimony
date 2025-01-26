'use client'
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./styles/global.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  return (
    <html lang="en">
      <body>
        {!isAuthRoute && <Header />}
        <div>{children}</div>
        {!isAuthRoute && <Footer />}

        <div id="modal-root"></div>
      </body>
    </html>
  );
}
