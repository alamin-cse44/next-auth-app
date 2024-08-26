import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          label: "Email address",
          type: "email",
          required: true,
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!credentials) {
          return null;
        }
        if (email) {
          const currentUser = users.find((user) => user.email === email);
          if (currentUser) {
            return currentUser;
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
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
};

const handler = nextAuth(authOptions);

const users = [
  { id: 1, email: "a@gmail.com", name: "amin", type: "user" },
  { id: 2, email: "b@gmail.com", name: "babul", type: "admin" },
  { id: 3, email: "m@gmail.com", name: "chunnu", type: "moderator" },
];

export { handler as GET, handler as POST };
