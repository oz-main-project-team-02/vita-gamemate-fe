import React, { Suspense, useEffect } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import Spinner from '@/components/Common/Spinner';
import { useChatModalStore } from '../config/store';
import { Outlet, useLocation } from 'react-router-dom';

const ChatModal = React.lazy(() => import('@/components/Common/ChatModal') as Promise<{ default: () => JSX.Element }>);

export default function CommonLayout() {
  const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main className='relative flex flex-grow flex-col' style={{ minHeight: 'calc(100dvh)' }}>
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
