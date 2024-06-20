/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      OKTA_SAML_ENTRYPOINT: string;
      OKTA_SAML_ISSUER: string;
      OKTA_SAML_CERT: string;
    }
  }
  