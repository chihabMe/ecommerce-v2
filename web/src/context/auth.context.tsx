import { currentUserEndpoint } from "@/config/constances";
import useFetch from "@/hooks/useFetch";
import User from "@/interfaces/user.interface";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthContextInterface = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [user, setUser] = useState(initialState.user);
  const { get, data, success, loading } = useFetch();

  useEffect(() => {
    setIsLoading(loading);
    if (!loading && success) {
      setUser(data);
    }
  }, [loading, setIsLoading, setUser]);

  useEffect(() => {
    get({
      url: currentUserEndpoint,
    });
  }, []);
  const values: AuthContextInterface = {
    isLoading,
    isAuthenticated,
    user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
