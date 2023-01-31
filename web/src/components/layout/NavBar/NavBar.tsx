import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useUser } from "@/context/auth.context";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const { isAuthenticated, user } = useUser();

  const navList = (
    <ul className="mb-4 mt-2 flex  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        clor="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link href={"/"}>
          <Typography
            as="p"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span>Home</span>
          </Typography>
        </Link>
        <div className=" lg:block">{navList}</div>
        <div className="flex space-x-2  ">
          {user ? <AuthUserLinks /> : <NonAuthUserLinks />}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;

const NonAuthUserLinks = () => {
  return (
    <>
      <Link href="/auth/register">
        <Button variant="filled" size="sm" className=" lg:inline-block">
          <span>sign up</span>
        </Button>
      </Link>
      <Link href="/auth/login">
        <Button variant="gradient" size="sm" className=" lg:inline-block">
          <span>login</span>
        </Button>
      </Link>
    </>
  );
};
const AuthUserLinks = () => {
  const { logout } = useUser();
  return (
    <>
      <Button
        variant="filled"
        size="sm"
        className=" lg:inline-block !bg-red-400 !text-white"
        onClick={logout}
      >
        <span>logout</span>
      </Button>
      <Link href="/profile">
        <Button variant="filled" size="sm" className=" lg:inline-block">
          <span>profile</span>
        </Button>
      </Link>
    </>
  );
};
