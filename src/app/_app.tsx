import { AppProps } from "next/app";
import { useRouter } from "next/router";
import RootLayout from "./layout";
import AuthLayout from "./(app)/auth/layout";
import { RouterProvider } from "@/context/routerContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthRoute = router.pathname.startsWith("/auth");

  const Layout = isAuthRoute ? AuthLayout : RootLayout;

  return (
    <RouterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RouterProvider>
  );
}

export default MyApp;
