import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// API route to create a new user
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // this route only accepts POST requests
  if (req.method !== "POST") {
    res.status(422).json({ message: "Route not valid" });
    return;
  }

  // parse req
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(422)
      .json({ message: "Please provide a username and a password" });
    return;
  }

  // mongo connection
  const conn = await MongoClient.connect(
    "mongodb+srv://localost:27017/mvp?retryWrites=true&w=majority"
  );
  const db = conn.db();

  // check if username is taken
  const userExists = await db
    .collection("users")
    .findOne({ username: username });

  if (userExists) {
    res.status(422).json({ message: "Username taken" });
    return;
  }

  // create user
  const status = await db.collection("users").insertOne({
    username,
    password: await hash(password, 12),
  });

  res.status(201).json({ message: "User created", ...status });
};

export default handler;
