import React from "react";
import { MoonLoader } from "react-spinners";

export const Spinner = ({ color, size }: { color?: string; size?: number }) => {
  return <MoonLoader color={color ?? "#D5A64E"} size={size ?? 12} />;
};
