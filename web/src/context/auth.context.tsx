import { currentUserEndpoint } from "@/config/constances";
import useFetch from "@/hooks/useFetch";
import User from "@/interfaces/user.interface";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => void;
  loadUser: () => void;
}

const initialState: AuthContextInterface = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: () => {},
  loadUser: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [user, setUser] = useState(initialState.user);
  const { get, post, data, success, loading, status } = useFetch();
  const loadUser = () => {
    get({
      url: currentUserEndpoint,
    });
  };
  useEffect(() => {
    console.log("is laoding ", isLoading);
    if (!isLoading) {
      console.log(isAuthenticated);
      console.log(user);
    }
  }, [isLoading]);

  //load the user and set isAuth.. to true if the request success or set it to null
  useEffect(() => {
    if (!loading && data && success) {
      setUser(data);
    }
    if (!loading && !success) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [loading, success, setIsLoading, setUser]);
  //stop loading after after the user is (fully loaded or not 'the user might be null the the user is not authenticated")
  useEffect(() => {
    if (status != null) setIsLoading(false);
  }, [user, isAuthenticated, setIsLoading]);
  const logout = () => {
    post({
      url: "/api/auth/logout",
    });
  };

  //load the user data after the context is mounted
  useEffect(() => {
    loadUser();
  }, []);
  const values: AuthContextInterface = {
    isLoading,
    isAuthenticated,
    user,
    logout,
    loadUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
