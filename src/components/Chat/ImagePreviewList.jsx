import React from "react";
import { X } from "lucide-react"; // Assuming you're using Lucide icons
import PropTypes from "prop-types";
const ImagePreviewList = ({ imagePreviews, openFullScreen, removeImage }) => {
  return (
    <div className="mb-3 flex gap-2">
      {imagePreviews.map((preview, index) => (
        <div className="relative" key={preview}>
          {" "}
          {/* Use the image preview as the unique key */}
          <button
            type="button"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            onClick={() => openFullScreen(preview, index)} // Open full-screen when clicked
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openFullScreen(preview, index); // Trigger full-screen on Enter or Space
              }
            }}
            aria-label={`Open full-screen image ${index + 1}`}
            tabIndex={0} // Make the image focusable
          >
            <img
              src={preview}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded-lg border border-zinc-700"
            />
          </button>
          <button
            onClick={() => removeImage(index)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            type="button"
            aria-label="Remove image"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

ImagePreviewList.propTypes = {
  imagePreviews: PropTypes.arrayOf(PropTypes.string).isRequired,
  openFullScreen: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default ImagePreviewList;
