import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyEndpoint } from "./config/constances";
import { fetcher } from "./helpers/network/fetcher";

export const middleware = async (req: NextRequest) => {
  const response = NextResponse.next();
  let access = req.cookies.get("authorization")?.value;
  let refresh = req.cookies.get("refresh")?.value;

  const { refreshResponse, data, status } = await fetcher({
    url: verifyEndpoint,
    method: "POST",
    tokens: {
      access,
      refresh,
    },
  });
  console.log(status);
  console.log(data);
  console.log(refreshResponse);
  if (status != 200)
    return NextResponse.redirect(new URL("/auth/login", req.url));
  if (
    refreshResponse?.status == 200 &&
    refreshResponse?.access &&
    refreshResponse?.refresh
  ) {
    req.cookies.set("authorization", "Bearer " + refreshResponse.access);
    req.cookies.set("refresh", refreshResponse.refresh);
    response.cookies.set("authorization", "Bearer " + refreshResponse.access);
    response.cookies.set("refresh", refreshResponse.refresh);
  }

  return response;
};

export const config = {
  matcher: ["/profile", "/admin"],
};
