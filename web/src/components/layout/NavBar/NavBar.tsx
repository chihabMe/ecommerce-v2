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
    <Navbar className="mx-auto w-full max-w-screen-3xl  px-0 py-0   border-b-2 border-orange-900 rounded-none ">
      <div className="bg-primary py-1.5 flex justify-center ">
        <span className="text-xs  text-black capitalize font-medium">
          free shipping to the USA
        </span>
      </div>
      <div className="flex items-center w-full max-w-[1300px] mx-auto justify-between py-4 px-4">
        <div className="flex items-center gap-4 md:gap-8 text-gray-900   ">
          <Typography
            as="h4"
            className="capitalize text-sm cursor-pointer hover:text-primary transition-all duration-150 "
          >
            blog
          </Typography>
          <Typography
            as="h4"
            className="capitalize text-sm cursor-pointer hover:text-primary transition-all duration-150 "
          >
            our story
          </Typography>
          <Typography
            as="h4"
            className="capitalize text-sm cursor-pointer hover:text-primary transition-all duration-150 "
          >
            contact
          </Typography>
        </div>
        <div>
          <Typography
            as="h1"
            className="text-2xl md:text-3xl  font-bold uppercase text-black font-noto-sans  md:mr-20   "
          >
            pro chef cook
          </Typography>
        </div>
        <div className="flex items-center gap-6">
          <div className="cursor-pointer">
            <MagnifyingGlassIcon className="w-7 h-7 text-gray-900" />
          </div>
          <div className="cursor-pointer relative">
            <ShoppingBagIcon className="w-7 h-7 text-gray-900" />
            <span className="flex h-5 w-5   rounded-full bg-teal-300 text-white absolute top-0 -right-1/3 font-bold text-[11px] text-center justify-center  items-center ">
              4
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-center text-blue-gray-900 py-2">
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
        className=" lg:inline-block !bg-red-400 !text-white"
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
