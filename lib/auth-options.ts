import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./mongoose";
import Admin from "@/models/admin.model";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await Admin.findOne({ email: credentials?.email });

        if (user) {
          const isPasswordValid = await compare(
            credentials?.password || "",
            user.password
          );

          if (isPasswordValid) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await dbConnect();
      const isExistingUser = await Admin.findOne({
        email: session.user?.email,
      });

      (session as any).user = {
        _id: isExistingUser?._id,
        email: isExistingUser?.email,
        name: isExistingUser?.name,
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
