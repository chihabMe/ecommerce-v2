import { Spinner } from "@/components/ui/Spinner";
import { currentUserEndpoint } from "@/config/constances";
import { useUser } from "@/context/auth.context";
import { fetcher } from "@/helpers/network/fetcher";
import React, { ReactNode } from "react";

// const getUserProfile = async () =>
//   await fetcher({
//     method: "GET",
//     url: currentUserEndpoint,
//   });
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();
  if (isLoading)
    return (
      <div className="w-full h-72 flex justify-center items-center">
        <Spinner color="blue" size={40} />
      </div>
    );

  return <>{children}</>;
};

export default AuthWrapper;
