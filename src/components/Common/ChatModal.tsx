import { useChatModalStore } from '../../config/store';
import { IoMdClose } from 'react-icons/io';
import ChatDetailModal from './ChatDetailModal';

const ChatModal = () => {
    const { isChatModalOpen, setChatModalClose } = useChatModalStore();

    if (!isChatModalOpen) return null;

    return (
        <div className='fixed inset-0 z-50 bg-black/50'>
            <div className='fixed top-0 right-0 min-w-[780px] h-full bg-gray-100'>
                <div className='flex flex-col'>
                    <div className='flex gap-3 py-2 px-4 items-center'>
                        <span className='text-2xl cursor-pointer'>
                            <IoMdClose onClick={setChatModalClose} />
                        </span>
                        <span className='text-3xl font-semibold'>채팅</span>
                    </div>
                </div>
            </div>
            <div className='fixed top-0 right-0 min-w-[420px] h-full bg-skyGray'>
                <ChatDetailModal />
            </div>
        </div>
    );
};

export default ChatModal;
