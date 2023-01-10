import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import connect from "../../../lib/db";
import { verify } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const conn = await connect();
        const users = conn.db().collection("users");

        const user = await users.findOne({
          username: credentials?.username,
        });

        if (!user) {
          await conn.close();
          throw new Error("User not found");
        }

        const valid = await verify(credentials?.password, user.password);
        if (!valid) {
          await conn.close();
          throw new Error("Invalid password");
        }

        await conn.close();
        return { username: user.username, id: user.id };
      },
    }),
  ],
});
