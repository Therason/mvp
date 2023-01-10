import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../lib/db";

type Data = {
  message: string;
};

// route to GET posts, not a protected route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // only accept GET requests
  if (req.method !== "GET") {
    res.status(422).json({ message: "Route not valid" });
    return;
  }

  // connect to the DB
  const conn = await connect();
  const db = conn.db();

  const docs = await db.collection("posts").find({}).toArray();
  console.log(docs);

  res.status(200).json({ message: "under construction" });
}
