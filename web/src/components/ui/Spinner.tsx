import React from "react";
import { MoonLoader } from "react-spinners";

export const Spinner = ({ color, size }: { color?: string; size?: number }) => {
  return <MoonLoader color={color ?? "white"} size={size ?? 12} />;
};
