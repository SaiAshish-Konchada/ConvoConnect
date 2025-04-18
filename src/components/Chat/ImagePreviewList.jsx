import React from "react";
import { X } from "lucide-react";

const ImagePreviewList = ({ imagePreviews, openFullScreen, removeImage }) => {
  return (
    <div className="mb-3 flex gap-2">
      {imagePreviews.map((preview, index) => (
        <div className="relative" key={index}>
          <img
            src={preview}
            alt={`preview-${index}`}
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700 cursor-pointer"
            onClick={() => openFullScreen(preview, index)} // Open full-screen when clicked
          />
          <button
            onClick={() => removeImage(index)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewList;
