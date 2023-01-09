import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
