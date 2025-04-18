// src/utils/imageUtils.js

export const validateImages = (files) => {
    return Array.from(files).every((file) => file.type.startsWith("image/"));
  };
  