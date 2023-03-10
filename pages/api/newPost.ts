import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import connect from "../../lib/db";

type Data = {
  message: string;
};

// API route to allow users to POST images, protected route
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

  // ensure request body contains a url
  const { url, description, username } = req.body;
  if (!url || url === "") {
    res.status(422).json({ message: "ERROR: Malformed request" });
    return;
  }

  // connect to the DB
  const conn = await connect();
  const db = conn.db();

  // create new post
  const status = await db.collection("posts").insertOne({
    url,
    description,
    username,
  });

  conn.close();

  res.status(200).json({ message: "Post created!", ...status });
}
