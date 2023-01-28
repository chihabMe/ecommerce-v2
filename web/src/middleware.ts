import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const response = NextResponse.next();
  const access = req.cookies.get("authorization")?.value;
  if (!access) return NextResponse.redirect(new URL("/auth/login", req.url));

  return response;
};

export const config = {
  matcher: ["/profile"],
};
