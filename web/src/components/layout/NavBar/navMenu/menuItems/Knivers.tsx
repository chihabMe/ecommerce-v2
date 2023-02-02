import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import MenuItemWrapper from "./MenuItemWrapper";
const Knives = () => {
  return (
    <MenuItemWrapper title="knives">
      <div className=" grid  h-full w-full grid-cols-5  ">
        <div className="  flex flex-col gap-2">
          <h1 className=" pb-2.5 font-serif text-xl font-bold capitalize text-primary">
            categories
          </h1>
          <ul className="flex flex-col font-noto-sans  text-sm font-bold   capitalize text-gray-900 ">
            <li className="py-1.5 ">Stainless Steel</li>
            <li className="py-1.5">Nonstick</li>
            <li className="py-1.5">Carbon Steel</li>
            <li className="py-1.5">Copper</li>
            <li className="py-1.5">Cast Iron</li>
          </ul>
        </div>
        <div className="  flex flex-col gap-2">
          <h1 className=" pb-2.5 font-serif text-xl font-bold capitalize text-primary">
            type
          </h1>
          <ul className="flex flex-col font-noto-sans  text-sm font-bold   capitalize text-gray-900 ">
            <li className="py-1.5 ">Paring</li>
            <li className="py-1.5">Japanese</li>
            <li className="py-1.5">Boning</li>
            <li className="py-1.5">Bread Knives</li>
            <li className="py-1.5">Knife Sets</li>
            <li className="py-1.5">Knife Sets Sharpening</li>
          </ul>
        </div>
        <div className="  flex flex-col gap-2">
          <h1 className=" pb-2.5 font-serif text-xl font-bold capitalize text-primary">
            brands
          </h1>
          <ul className="flex flex-col font-noto-sans  text-sm font-bold   capitalize text-gray-900 ">
            <li className="py-1.5 ">STAUB</li>
            <li className="py-1.5">Great Jones</li>
            <li className="py-1.5">Field Company</li>
            <li className="py-1.5">All-Clad</li>
            <li className="py-1.5">Misen</li>
            <li className="py-1.5">SMEG</li>
          </ul>
        </div>
        <div className="bg- col-span-2  flex justify-between gap-4">
          <div>
            <Image
              src="/images/navbar/knives/knife1.webp"
              alt="knife1 1 "
              className="rounded-lg"
              width={550}
              height={650}
            />
            <Typography className="pt-4 text-left font-noto-sans text-sm font-bold capitalize">
              Featured Brand: Dedfish
            </Typography>
          </div>
          <div>
            <Image
              src="/images/navbar/knives/knife2.webp"
              alt="knife2  "
              className="rounded-lg"
              width={550}
              height={650}
            />
            <Typography className="pt-4 text-left font-noto-sans text-sm font-bold capitalize">
              Timeless Ceramic Knives
            </Typography>
          </div>
        </div>
      </div>
    </MenuItemWrapper>
  );
};

export default Knives;
