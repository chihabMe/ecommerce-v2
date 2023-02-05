import { useUser } from "@/context/auth.context";
import React from "react";

const AdminPage = () => {
  const { user, logout } = useUser();
  return (
    <div className="">
      {user?.email}
      <button
        onClick={logout}
        className="cursor-pointer bg-red-300 p-2 text-white"
      >
        logout
      </button>
    </div>
  );
};

AdminPage.hideHeader = true;
export default AdminPage;
