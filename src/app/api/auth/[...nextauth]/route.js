import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
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
};

const handler = nextAuth(authOptions);

const users = [
  { id: 1, email: "a@gmail.com" },
  { id: 2, email: "b@gmail.com" },
  { id: 3, email: "c@gmail.com" },
];

export { handler as GET, handler as POST };
