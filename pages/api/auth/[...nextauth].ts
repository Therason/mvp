import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import connect from "../../../lib/db";
import { verify } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/userAuth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
        console.log(user);
        return { username: user.username, id: user._id.toString() };
      },
    }),
  ],
});
