'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';

const AuthButton = dynamic(() => import('../components/AuthButton'), { ssr: false });

interface Props {
  session: Session | null;
}

const Home: React.FC<Props> = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <AuthButton />
    </SessionProvider>
  );
};

export default Home;
