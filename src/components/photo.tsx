import type { PhotoData } from "../data/images";
export function Photo({
  image,
  priority = false,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  image: PhotoData;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={"/images/" + image.name + "-1280.webp"}
      srcSet={
        "/images/" +
        image.name +
        "-640.webp 640w, /images/" +
        image.name +
        "-1280.webp " +
        Math.min(image.width, 1280) +
        "w"
      }
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
