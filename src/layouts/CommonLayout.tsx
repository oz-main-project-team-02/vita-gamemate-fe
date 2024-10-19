import React, { Suspense } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import { useChatModalStore } from '../config/store';

const ChatModal = React.lazy(() => import('../components/Common/ChatModal'));

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout({ children }: Props) {
  const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);

  return (
    <>
      <Header />
      {children}
      <Footer />
      {isChatModalOpen && (
        <Suspense fallback={<div>Loading chat...</div>}>
          <ChatModal />
        </Suspense>
      )}
    </>
  );
}
