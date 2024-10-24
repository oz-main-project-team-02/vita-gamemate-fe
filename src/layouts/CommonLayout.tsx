import React, { Suspense } from 'react';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import Spinner from '@/components/Common/Spinner';
import { useChatModalStore } from '../config/store';

const ChatModal = React.lazy(() => import('@/components/Common/ChatModal') as Promise<{ default: () => JSX.Element }>);

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout({ children }: Props) {
  const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);
  // const { isOrderModalOpen } = useOrderModalStore();

  return (
    <>
      <Header />
      {children}
      <Footer />
      {isChatModalOpen && (
        <Suspense fallback={<Spinner />}>
          <ChatModal />
          {/* FIXME: ChatModal 내부에서 조건부 렌더링, 의뢰하는 상대방 정보 mate를 프롭으로 받아야됨 */}
          {/* {isOrderModalOpen && <OrderModal mate={mate} />} */}
        </Suspense>
      )}
    </>
  );
}
