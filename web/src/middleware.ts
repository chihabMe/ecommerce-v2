import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyEndpoint } from "./config/constances";
import { fetcher, refreshFetcher } from "./helpers/network/fetcher";

export const middleware = async (req: NextRequest) => {
  const response = NextResponse.next();
  let access = req.cookies.get("authorization")?.value;
  let refresh = req.cookies.get("refresh")?.value;

  const { data, refreshed, refreshResponse, status } = await fetcher({
    url: verifyEndpoint,
    method: "POST",
    tokens: {
      access,
      refresh,
    },
  });
  if (status != 200)
    return NextResponse.redirect(new URL("/auth/login", req.url));
  if (
    refreshResponse?.status == 200 &&
    refreshResponse?.access &&
    refreshResponse?.refresh
  ) {
    req.cookies.set("authorization", refreshResponse.access);
    req.cookies.set("refresh", refreshResponse.refresh);
    response.cookies.set("Authorization", refreshResponse.access);
    response.cookies.set("refresh", refreshResponse.refresh);
  }

  return response;
};

export const config = {
  matcher: ["/profile"],
};
