import React from "react";
import PropTypes from "prop-types";

const FullScreenImageModal = ({ fullscreenImage, closeFullScreen }) => {
  if (!fullscreenImage) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-0 m-0"
      onClick={closeFullScreen}
      style={{ cursor: "pointer" }}
      aria-label="Close fullscreen image"
    >
      <img
        src={fullscreenImage}
        alt="Fullscreen"
        className="max-w-full max-h-full object-contain pointer-events-none"
      />
    </button>
  );
};

FullScreenImageModal.propTypes = {
  fullscreenImage: PropTypes.string,
  closeFullScreen: PropTypes.func.isRequired,
};

export default FullScreenImageModal;
