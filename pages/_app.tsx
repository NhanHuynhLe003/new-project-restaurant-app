import { EmptyLayout } from "../components/layouts/empty";
import { AuthProvider } from "../contexts/AuthContext";
import { AppPropsWithLayout } from "../models";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout lightMode={false}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Layout>
  );
}
export default MyApp;
