import React from "react";
import Knives from "./Knivers";
import PotsAndPans from "./PotsAndPans";

const NavMenu = () => {
  return (
    <nav className="">
      <ul className=" mx-auto  flex   gap-0   ">
        <PotsAndPans />
        <Knives />
        <Knives />
        <Knives />
        <Knives />
        <Knives />
        <Knives />
      </ul>
    </nav>
  );
};

export default NavMenu;
