import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  message: string;
};

// API route to allow users to post images
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // this route only accepts POST requests
  if (req.method !== "POST") {
    res.status(422).json({ message: "Route not valid" });
    return;
  }

  // this is a protected route that requires user authentication
  const session = await unstable_getServerSession(req, res, authOptions);

  // check that session exists
  if (!session) {
    res.status(401).json({ message: "ERROR: No session found" });
    return;
  }

  // TODO: handle creating a new post
  res.status(200).json({ message: "Session valid" });
}
