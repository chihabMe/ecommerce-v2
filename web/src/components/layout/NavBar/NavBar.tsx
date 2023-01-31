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

  const navList = (
    <ul className="mb-4  mt-2 flex  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {links.map((link) => (
        <Typography
          key={link.id}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-noto-sans font-bold uppercase text-sm text-black"
        >
          <Link href={link.href} className="flex items-center">
            {link.title}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-2xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-6 text-gray-900  ">
          <Typography as="h4" className="capitalize font-medium text-sm">
            blog
          </Typography>
          <Typography as="h4" className="capitalize text-sm font-medium">
            our story
          </Typography>
          <Typography as="h4" className="capitalize text-sm font-medium">
            contact
          </Typography>
        </div>
        <div>
          <Typography
            as="h1"
            className="text-3xl  font-bold uppercase text-black font-noto-sans  "
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
        <div className=" lg:block">{navList}</div>

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
