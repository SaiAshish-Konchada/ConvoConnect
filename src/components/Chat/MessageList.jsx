import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ImageModal from '../Modals/ImageModal';

const MessageList = ({
  messages,
  authUser,
  selectedUser,
  isTyping,
  avatars,
  getSenderName,
}) => {
  const [modal, setModal] = React.useState({ isOpen: false, src: null, index: 0, list: [] });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const openModal = (src, idx, list) => setModal({ isOpen: true, src, index: idx, list });
  const closeModal = () => setModal({ ...modal, isOpen: false, index: 0 });
  const nextImage = () => {
    const nextIdx = (modal.index + 1) % modal.list.length;
    setModal({ ...modal, index: nextIdx, src: modal.list[nextIdx] });
  };
  const prevImage = () => {
    const prevIdx = (modal.index - 1 + modal.list.length) % modal.list.length;
    setModal({ ...modal, index: prevIdx, src: modal.list[prevIdx] });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const isOwn = msg.senderId === authUser._id;
        return (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={isOwn}
            avatarSrc={avatars[msg.senderId]}
            senderName={getSenderName(msg.senderId)}
            onImageClick={(src, idx) => openModal(src, idx, msg.images)}
          />
        );
      })}

      {isTyping && <TypingIndicator avatarSrc={avatars[selectedUser._id]} />}

      <div ref={endRef} />

      <ImageModal
        isOpen={modal.isOpen}
        imageSrc={modal.src}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default MessageList;
