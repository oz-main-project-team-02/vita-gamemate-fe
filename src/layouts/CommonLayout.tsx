import React, { Suspense } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import Spinner from '@/components/Common/Spinner';
import { useChatModalStore } from '../config/store';
import { Outlet } from 'react-router-dom';

const ChatModal = React.lazy(() => import('@/components/Common/ChatModal') as Promise<{ default: () => JSX.Element }>);

export default function CommonLayout() {
  const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);

  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main className='relative flex-grow' style={{ minHeight: 'calc(100dvh-381px)' }}>
        <Outlet />
      </main>
      <Footer />
      {isChatModalOpen && (
        <Suspense fallback={<Spinner />}>
          <ChatModal />
        </Suspense>
      )}
    </div>
  );
}
