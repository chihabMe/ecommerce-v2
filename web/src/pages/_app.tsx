import NavBar from "@/components/layout/NavBar/NavBar";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "@/context/auth.context";
import AuthWrapper from "@/wrappers/AuthWrapper";
import NextProgressBar from "nextjs-progressbar";
import theme from "@material-tailwind/react/theme";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NextProgressBar color="#D5A64E" />
        <AuthWrapper>
          <NavBar />
          <Component {...pageProps} />;
        </AuthWrapper>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
