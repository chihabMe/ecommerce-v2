import React, { ReactNode } from "react";

const MegaCol = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="flex flex-col font-noto-sans  text-sm font-bold   capitalize text-gray-900 ">
      {children}
    </ul>
  );
};

export default MegaCol;
