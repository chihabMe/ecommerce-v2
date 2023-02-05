import { useUser } from "@/context/auth.context";
import React from "react";

const AdminPage = () => {
  const { user } = useUser();
  return <div>{user?.email}</div>;
};

AdminPage.hideHeader = true;
export default AdminPage;
