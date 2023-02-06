import { loginEndpoint } from "@/config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    try {
      const response = await fetch(loginEndpoint, {
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      const { access, refresh } = data;
      if (response.status == 200 && access && refresh) {
        //add authorization headers to the response
      }
    } catch (err) {
      return res.status(500).json("error in the server");
    }
  } else {
    return res
      .status(403)
      .json({ status: "error", message: `method ${req.method} isn't allowed` });
  }
};
export default login;
