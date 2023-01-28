import NavBar from "@/components/layout/NavBar/NavBar";
import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <NavBar />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};
export default MyApp;
