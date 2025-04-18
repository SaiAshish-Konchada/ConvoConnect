import React from "react";

const FullscreenImageModal = ({
  fullscreenImage,
  closeFullScreen,
  openFullScreen,
  imagePreviews,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  return (
    fullscreenImage && (
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
        onClick={closeFullScreen}
      >
        <img
          src={fullscreenImage}
          alt="Fullscreen"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    )
  );
};

export default FullscreenImageModal;
