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
      className="hover:cursor group  px-px font-noto-sans text-sm font-bold uppercase text-black "
    >
      {/* <Link href={href} className="flex items-center"> */}
      {/* </Link> */}
      <button className=" relative px-4 py-2     ">
        <Typography className="font-tajawal text-[15px] font-bold  uppercase">
          {title}
        </Typography>
      </button>
      <div
        className="invisible  absolute top-6  left-0 right-0 z-50 min-h-[450px] min-w-[500px] translate-y-14
        transform   bg-white    
         opacity-0 shadow-xl  transition-all duration-200 ease-in-out group-hover:visible group-hover:translate-y-8  group-hover:transform group-hover:opacity-100  group-hover:duration-500"
      >
        <div className="relative z-50 mx-auto  h-[400px] w-full    max-w-screen-2xl p-6 pt-10 ">
          {children}
        </div>
      </div>
    </Typography>
  );
};

export default MenuItemWrapper;
