import { currentUserEndpoint, logoutEndpoint } from "@/config/constances";
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
  const { get, data, success, error, loading, status } = useFetch();
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
      setIsAuthenticated(true);
      // setIsLoading(false);
    }
    if (!loading && !success) {
      setIsAuthenticated(false);
      setUser(null);
      // setIsLoading(false);
    }
  }, [loading, success, setIsLoading, setUser]);
  useEffect(() => {
    if (!user && error) setIsLoading(false);
    if (user && success) setIsLoading(false);
  }, [user, success, error, setIsLoading]);
  //stop loading after after the user is (fully loaded or not 'the user might be null the the user is not authenticated")
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
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
