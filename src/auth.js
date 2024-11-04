import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models/User";
import bcrypt from "bcryptjs";
import { findOrCreateUser } from "@/lib/findOrCreateUser";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const user = await User.findOne({
            email: credentials?.email,
          });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (!isMatch) {
              console.log("Tashi is wrong");
            }
            if (isMatch) {
              // return user;
              const userObject = {
                id: user._id.toString(),
                email: user.email,
                role: user.role,
                // Add any other properties from the user object you want in the session
              };
              console.log("User Object", JSON.stringify(userObject));
              return userObject;
            } else {
              throw new Error("Check your password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Store user data in the token when they log in
      if (user) {
        token.id = user.id; // Store user id in token
        token.email = user.email; // Store user email in token
        token.role = user.role; // Store user role in token
        // Add any other properties from the user object you want in the token
        const dbUser = await findOrCreateUser(user.email, { name: user.name });
        token.role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Populate session object with user data from token
      if (token) {
        session.user.id = token.id; // Assign user id to session
        session.user.email = token.email; // Assign user email to session
        session.user.role = token.role; // Assign user role to session
        // Assign any other properties from the token you want in the session
      }
      return session;
    },
  },
});
