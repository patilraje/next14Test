// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import { SAMLProvider } from 'next-auth/providers/saml';
import { SamlStrategy } from '@node-saml/passport-saml';

const options: AuthOptions = {
  providers: [
    SAMLProvider({
      id: 'okta',
      name: 'Okta',
      strategy: SamlStrategy,
      options: {
        entryPoint: process.env.OKTA_SAML_ENTRYPOINT!,
        issuer: process.env.OKTA_SAML_ISSUER!,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/okta`,
        cert: process.env.OKTA_SAML_CERT!,
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
};

export default NextAuth(options);
