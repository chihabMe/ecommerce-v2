import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const refreshToken = req.cookies["refresh"];

    console.log(refreshToken);
    res.setHeader("Set-Cookie", [
      cookie.serialize("authorization", "", {
        maxAge: 0,
      }),
      cookie.serialize("refresh", "", {
        maxAge: 0,
      }),
    ]);
    return res.status(200).json("logged out");
  } else {
    res.status(403).json(`method ${req.method} is not allowed`);
  }
};
export default logout;
