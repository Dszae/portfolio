"use client";

import Image from 'next/image';

export default function ScrollPreviewImage({ className = '', ...imageProps }) {
  return (
    <div className="project-preview-observer absolute inset-0">
      <Image {...imageProps} className={className} />
    </div>
  );
}
