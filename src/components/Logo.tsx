import { useState } from "react";

const LOGO_PNG = "/logo.png";
const LOGO_JPG = "/logo.jpg";

export function Logo({
  className,
  alt = "Peel Club logo",
}: {
  className?: string;
  alt?: string;
}) {
  const [src, setSrc] = useState(LOGO_PNG);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc(LOGO_JPG)}
    />
  );
}
