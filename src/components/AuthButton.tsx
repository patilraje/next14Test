'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButton: React.FC = () => {
  const { data: session } = useSession();

  const handleSignIn = () => signIn('okta');
  const handleSignOut = () => signOut();

  return (
    <div>
      {!session ? (
        <>
          <h1>Not signed in</h1>
          <button onClick={handleSignIn}>Sign in with Okta</button>
        </>
      ) : (
        <>
          <h1>Signed in as {session?.user?.email}</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
