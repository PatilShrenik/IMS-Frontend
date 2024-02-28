import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./Components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { AppContextProvider } from "./Components/AppContext";
import { ReactFlowProvider } from "reactflow";
import { useState, useEffect } from "react";
// import Theme from "./Components/Theme";
import { MsalProvider } from "@azure/msal-react";
import NextProgress from "next-progress";
import { PublicClientApplication } from "@azure/msal-browser";


export default function App({ Component, pageProps }: any) {
  // Use the layout defined at the page level, if available
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const pca = new PublicClientApplication({
    auth: {
      clientId: "60802651-5188-4bec-a75c-a52c10d93027",
      authority:
        "https://login.microsoftonline.com/f87a5f5e-f97e-4aec-bab8-6e4187ef4f1c",
      redirectUri: "/",
    },
  });
  if (Component.getLayout) {
    const getLayout = Component.getLayout || ((page: any) => page);
    return getLayout(
      <MsalProvider instance={pca}>
        <NextProgress options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </MsalProvider>
    );
  }
  else {
    return (
      <MsalProvider instance={pca}>
        <AppContextProvider>
          <ReactFlowProvider>
            <Layout>
            {/* <NextProgress options={{ showSpinner: false }} /> */}
              <Component {...pageProps} />
            </Layout>
          </ReactFlowProvider>
        </AppContextProvider>
      </MsalProvider>
    );
  }
}
