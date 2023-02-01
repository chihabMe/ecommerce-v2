import Typography from "@material-tailwind/react/components/Typography";
import Link from "next/link";
import React, { ReactNode } from "react";

const MenuItemWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="hover:cursor group relative p-1 font-noto-sans text-sm font-bold uppercase text-black hover:opacity-80"
    >
      {/* <Link href={href} className="flex items-center"> */}
      {/* </Link> */}
      <button className=" px-4 py-2 ">{title}</button>
      <div
        className="invisible absolute top-0 -left-1/2 z-50
        min-w-[500px] translate-y-0  transform 
        opacity-0 shadow-xl duration-300 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform  group-hover:opacity-100"
      >
        {children}
      </div>
    </Typography>
  );
};

export default MenuItemWrapper;
