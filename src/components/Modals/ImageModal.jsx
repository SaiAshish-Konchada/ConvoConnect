import React, { useEffect } from "react";
import PropTypes from "prop-types";
const ImageModal = ({ isOpen, imageSrc, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={onClose}
      role="dialog" // Adding dialog role for accessibility
      aria-labelledby="image-modal-title"
      tabIndex={0} // Makes div focusable for keyboard events
      onKeyDown={handleKeyDown} // Supports keyboard navigation
    >
      <div
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
      >
        <img
          src={imageSrc}
          alt="Fullscreen"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Optionally, add buttons for next/previous navigation */}
      <button
        onClick={onPrev}
        aria-label="Previous Image"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
      >
        Prev
      </button>
      <button
        onClick={onNext}
        aria-label="Next Image"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
      >
        Next
      </button>
    </div>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Whether the modal is open or closed
  imageSrc: PropTypes.string.isRequired, // The source URL of the image to display
  onClose: PropTypes.func.isRequired, // Function to handle closing the modal
  onPrev: PropTypes.func, // Function to handle going to the previous image (optional)
  onNext: PropTypes.func, // Function to handle going to the next image (optional)
};

export default ImageModal;
