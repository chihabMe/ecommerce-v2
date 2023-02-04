import React, { ReactNode } from "react";

const MegaColItem = ({ children }: { children: ReactNode }) => {
  return <li className="py-1.5">{children}</li>;
};

export default MegaColItem;
