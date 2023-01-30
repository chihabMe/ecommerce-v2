import { Spinner } from "@/components/ui/Spinner";
import { useUser } from "@/context/auth.context";
import React from "react";

const profile = () => {
  const { user, isLoading } = useUser();
  if (isLoading) return;
  <div className="w-full h-72 flex justify-center items-center">
    <Spinner size={40} color="blue" />
  </div>;

  return <div>{/* you are logged in {user?.email} {user?.name}{" "} */}</div>;
};

export default profile;
