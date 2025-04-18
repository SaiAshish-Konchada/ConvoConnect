import React, { useEffect } from 'react';

const ImageModal = ({ isOpen, imageSrc, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center" onClick={onClose}>
      <img
        src={imageSrc}
        alt="Fullscreen"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default ImageModal;