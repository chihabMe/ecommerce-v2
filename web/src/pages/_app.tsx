import NavBar from "@/components/layout/NavBar/NavBar";
import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthContextProvider } from "@/context/auth.context";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <NavBar />
        <Component {...pageProps} />;
      </AuthContextProvider>
    </ThemeProvider>
  );
};
export default MyApp;
