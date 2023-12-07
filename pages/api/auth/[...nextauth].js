import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        // teamId: process.env.APPLE_TEAM_ID,
        // keyId: process.env.APPLE_KEY_ID,
      },
      redirectURI: 'http://localhost:3000/',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect(url, baseUrl) {
      // Ensure that url is a string before using startsWith
      const redirectUrl = typeof url === 'string' ? url : baseUrl;
      
      // Customize the redirect URL after sign-in
      // Example: Redirect to the home page of your site
      return redirectUrl;
    },
  },
}
export default NextAuth(authOptions)
