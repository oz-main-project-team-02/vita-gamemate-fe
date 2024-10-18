import ChatModal from '../components/Common/ChatModal';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';
import { useChatModalStore } from '../config/store';

type Props = {
    children: React.ReactNode;
};

export default function CommonLayout({ children }: Props) {
    const isChatModalOpen = useChatModalStore((state) => state.isChatModalOpen);
    return (
        <div>
            {isChatModalOpen && <ChatModal />}
            <Header />
            {children}
            <Footer />
        </div>
    );
}
