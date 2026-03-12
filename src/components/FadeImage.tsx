"use client";

import Image, { ImageProps } from "next/image";
import { useState, useCallback } from "react";

export default function FadeImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <Image
      {...props}
      className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={handleLoad}
    />
  );
}
