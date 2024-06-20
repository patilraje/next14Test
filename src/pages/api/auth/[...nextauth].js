// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';
import { SamlStrategy } from '@node-saml/passport-saml';

export default NextAuth({
  providers: [
    OktaProvider({
      id: 'okta',
      name: 'Okta',
      type: 'saml',
      strategy: SamlStrategy,
      options: {
        entryPoint: process.env.OKTA_SAML_ENTRYPOINT,
        issuer: process.env.OKTA_SAML_ISSUER,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/okta`,
        cert: process.env.OKTA_SAML_CERT,
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
