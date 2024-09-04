import React from "react";

interface ThumbnailProps {
  gradientStyle: string; // Define a prop to receive the gradient style
}

/**
 * Thumbnail to render for each Deck in Sidebar Workspace
 */
const Thumbnail: React.FC<ThumbnailProps> = ({ gradientStyle }) => {
  return (
    <div
      className='w-8 h-8 rounded-sm mx-auto'
      style={{ background: gradientStyle }}
    />
  );
};

export default Thumbnail;
