import NavBar from "@/components/layout/NavBar/NavBar";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "@/context/auth.context";
import AuthWrapper from "@/wrappers/AuthWrapper";
import NextProgressBar from "nextjs-progressbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NextProgressBar color="#2196F3" />
        <AuthWrapper>
          <NavBar />
          <Component {...pageProps} />;
        </AuthWrapper>
      </AuthContextProvider>
    </ThemeProvider>
  );
};
MyApp.getInitialProps = async (appContext: AppContext) => {
  const data: AppInitialProps = await App.getInitialProps(appContext);
  return data;
};
export default MyApp;
