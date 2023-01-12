import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import connect from "../../lib/db";

type Data = {
  message: string;
};

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

  // parse req body
  const { username, postId } = req.body;
  if (!username || !postId) {
    res.status(422).json({ message: "ERROR: Malformed request" });
    return;
  }

  console.log(req.body);

  // connect to the DB
  // const conn = await connect();
  // const db = conn.db();

  res.status(200).json({ message: "Post saved!" });
}
