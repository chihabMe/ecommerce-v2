import React from "react";
import PotsAndPans from "./PotsAndPans";

const NavMenu = () => {
  return (
    <div className=" lg:block">
      <ul className="mb-4  mt-2 flex  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <PotsAndPans />
      </ul>
    </div>
  );
};

export default NavMenu;
