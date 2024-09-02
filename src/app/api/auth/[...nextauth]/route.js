import connectDB from "@/lib/connectDB";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 15 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          // label: "Email address",
          // type: "email",
          // required: true,
          // placeholder: "Enter your email",
        },
        password: {
          // label: "Password",
          // type: "password",
          // required: true,
          // placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        console.log("currentUser", currentUser);
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );

        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        console.log("account", account);
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const existUser = await userCollection.findOne({ email });
          if (!existUser) {
            const res = await userCollection.insertOne({
              ...user,
              type: "user",
            });
            return res;
          } else {
            return user;
          }
        } catch (error) {
          console.log("error", error);
        }
      } else {
        return user;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.type = user.type;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.type = token.type;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = nextAuth(authOptions);

const users = [
  { id: 1, email: "a@gmail.com", name: "amin", type: "user" },
  { id: 2, email: "b@gmail.com", name: "babul", type: "admin" },
  { id: 3, email: "m@gmail.com", name: "chunnu", type: "moderator" },
];

export { handler as GET, handler as POST };
