import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                Authorization: "7zXnBjF5PBl7EzG/WhATQw==", // Authorization header
                "Content-Type": "application/json", // Content-Type header added here
              },
            }
          )
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error.response);
            throw new Error(error.response.data.message);
          }) || null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
