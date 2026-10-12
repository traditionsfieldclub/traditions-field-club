type PictureProps = {
  name: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

// Serves /media/<name>.webp with a JPG fallback for older browsers.
export default function Picture({ name, alt, className = "", imgClassName = "", priority = false }: PictureProps) {
  return (
    <picture className={className}>
      <source srcSet={`/media/${name}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/media/${name}.jpg`}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
