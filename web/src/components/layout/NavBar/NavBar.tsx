import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useUser } from "@/context/auth.context";
import useFetch from "@/hooks/useFetch";
import { logoutEndpoint } from "@/config/constances";
import { useRouter } from "next/router";
import NavMenu from "./navMenu/menuItems/NavMenu";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const { isAuthenticated, user, logout } = useUser();
  const router = useRouter();
  const { post, loading, success } = useFetch();
  const redirected = useRef(false);
  const logoutHandler = async () => {
    await post({
      url: logoutEndpoint,
    });
    logout();
  };
  useEffect(() => {
    if (!loading && success && !redirected.current) {
      router.push("/");
      redirected.current = true;
    }
  }, [loading, success, router]);

  const links = [
    { title: "pots and pans", href: "/", id: 1 },
    { title: "knives", href: "/", id: 2 },
    { title: "small appliances", href: "/", id: 3 },
    { title: "pizza ovens", href: "/", id: 4 },
    { title: "bbq", href: "/", id: 5 },
    { title: "accessories", href: "/", id: 6 },
  ];

  return (
    <Navbar className="max-w-screen-3xl mx-auto w-full  rounded-none border-b-[3px]   border-orange-900 px-0 py-0 ">
      <div className="flex justify-center bg-primary py-1.5 ">
        <span className="text-xs  font-medium capitalize text-black">
          free shipping to the USA
        </span>
      </div>
      <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between py-4 px-4">
        <div className="flex items-center gap-4 text-gray-900 md:gap-8   ">
          <Typography
            as="h4"
            className="cursor-pointer text-sm capitalize transition-all duration-150 hover:text-primary "
          >
            blog
          </Typography>
          <Typography
            as="h4"
            className="cursor-pointer text-sm capitalize transition-all duration-150 hover:text-primary "
          >
            our story
          </Typography>
          <Typography
            as="h4"
            className="cursor-pointer text-sm capitalize transition-all duration-150 hover:text-primary "
          >
            contact
          </Typography>
        </div>
        <div>
          <Typography
            as="h1"
            className="font-noto-sans text-2xl  font-bold uppercase text-black md:mr-20  md:text-3xl   "
          >
            pro chef cook
          </Typography>
        </div>
        <div className="flex items-center gap-6">
          <div className="cursor-pointer">
            <MagnifyingGlassIcon className="h-7 w-7 text-gray-900" />
          </div>
          <div className="relative cursor-pointer">
            <ShoppingBagIcon className="h-7 w-7 text-gray-900" />
            <span className="absolute top-0 -right-1/3   flex h-5 w-5 items-center justify-center rounded-full bg-teal-300 text-center text-[11px] font-bold  text-white ">
              4
            </span>
          </div>
        </div>
      </div>
      <div className="container relative mx-auto flex items-center justify-center py-2 text-blue-gray-900">
        <NavMenu />

        <div className="flex space-x-2  ">
          {/* {user ? (
            <AuthUserLinks logoutHandler={logoutHandler} />
          ) : (
            <NonAuthUserLinks />
          )} */}
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
const AuthUserLinks = ({ logoutHandler }: { logoutHandler: () => void }) => {
  const { user } = useUser();
  return (
    <>
      <Button
        variant="filled"
        size="sm"
        className=" !bg-red-400 !text-white lg:inline-block"
        onClick={logoutHandler}
      >
        <span>logout</span>
      </Button>
      <Link href="/profile">
        <Button variant="filled" size="sm" className=" lg:inline-block">
          <span>profile</span>
        </Button>
      </Link>
      <div>
        <Typography>{user?.name}</Typography>
      </div>
    </>
  );
};
