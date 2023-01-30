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
  const { get, post, data, success, loading } = useFetch();
  const loadUser = () => {
    get({
      url: currentUserEndpoint,
    });
  };

  useEffect(() => {
    if (!loading && success) {
      setIsLoading(false);
      setUser(data);
    }
    if (!loading && !success) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, [loading, success, setIsLoading, setUser]);
  const logout = () => {
    post({
      url: "/api/auth/logout",
    });
  };

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
