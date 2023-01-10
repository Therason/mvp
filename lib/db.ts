import { MongoClient } from "mongodb";

// db helper function to export a connection
export default async function connect() {
  const conn = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/mvp?retryWrites=true&w=majority"
  );
  return conn;
}
