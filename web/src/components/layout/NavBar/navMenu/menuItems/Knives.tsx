import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import MegaCol from "./MegaCol";
import MegaColItem from "./MegaColItem";
import MenuItemWrapper from "./MenuItemWrapper";
const materials = [
  { title: "Copper", id: 4 },
  { title: "Sets", id: 2 },
  { title: "Carbon Steel", id: 3 },
];
const typesTitles = [
  { title: "Frying Pans", id: 1 },
  { title: "Sets", id: 2 },
  { title: "Roasting", id: 3 },
  { title: "Woks", id: 4 },
  { title: "Dutch Ovens", id: 5 },
  { title: "Stock Pots", id: 6 },
  { title: "Saute and Sauce Pans", id: 7 },
  { title: "Grill PanGrill Pans", id: 8 },
];
const brands = [
  { title: "STAUB", id: 1 },
  { title: "Great Jones", id: 2 },
  { title: "Field Company", id: 3 },
  { title: "All-Clad", id: 4 },
  { title: "Misen", id: 5 },
  { title: "SMEG", id: 6 },
];
const Knives = () => {
  return (
    <MenuItemWrapper title="knives">
      <div className=" grid  h-full w-full grid-cols-5  ">
        <div className="  flex flex-col gap-2">
          <h1 className=" pb-2.5 font-serif text-xl font-bold capitalize text-primary">
            Material
          </h1>
          <MegaCol>
            {materials.map((item) => (
              <MegaColItem key={item.id} children={item.title} />
            ))}
          </MegaCol>
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
