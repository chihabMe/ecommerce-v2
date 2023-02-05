import NavBar from "@/components/layout/NavBar/NavBar";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "@/context/auth.context";
import AuthWrapper from "@/wrappers/AuthWrapper";
import NextProgressBar from "nextjs-progressbar";
import theme from "@material-tailwind/react/theme";
import { NextComponentType, NextPage, NextPageContext } from "next";
type ComponentWithExtraAttrs = AppProps & {
  Component: AppProps["Component"] & {
    hideHeader: boolean | undefined;
  };
};
const MyApp = ({ Component, pageProps }: ComponentWithExtraAttrs) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NextProgressBar color="#D5A64E" />
        <AuthWrapper>
          {Component.hideHeader ? null : <NavBar />}
          <Component {...pageProps} />;
        </AuthWrapper>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
