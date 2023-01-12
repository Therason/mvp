import { MongoClient } from "mongodb";

// db helper function to export a connection
export default async function connect() {
  const conn = await MongoClient.connect(process.env.MONGO_STRING);
  return conn;
}
