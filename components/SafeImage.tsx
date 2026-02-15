import React from 'react';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK_SRC =
  'data:image/svg+xml;utf8,' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">' +
  '<rect width="800" height="800" fill="%23e5e7eb" />' +
  '<path d="M0 640L260 380L420 540L520 440L800 720V800H0Z" fill="%23cbd5e1" />' +
  '<circle cx="590" cy="230" r="70" fill="%23cbd5e1" />' +
  '<text x="400" y="680" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="%236b7280">Image</text>' +
  '</svg>';

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc);

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        if (onError) {
          onError(event);
        }
      }}
    />
  );
};

export default SafeImage;
