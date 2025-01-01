import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "Ov23liEp1A3LGFlf5K2F",
      clientSecret: "b9f105d80e870e67e9ecede0b51ac8aa5fd657c1"
    }),
    // ...add more providers here
  ],
})

export {handler as POST , handler as GET}