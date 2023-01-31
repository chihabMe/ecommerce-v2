import NavBar from "@/components/layout/NavBar/NavBar";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "@/context/auth.context";
import AuthWrapper from "@/wrappers/AuthWrapper";
import NextProgressBar from "nextjs-progressbar";
import { NextPageContext } from "next";
import { fetcher } from "@/helpers/network/fetcher";
import User from "@/interfaces/user.interface";
import cookie from "cookie";
import { currentUserEndpoint } from "@/config/constances";
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

export default MyApp;
