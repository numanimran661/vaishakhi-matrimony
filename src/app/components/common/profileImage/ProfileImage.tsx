import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ProfileImageProps {
  src: StaticImageData;
  alt: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  active = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
      <Image
        src={src}
        alt={alt}
        className="rounded-full object-cover"
        fill
      />
      {active && (
        <div
          className={`absolute bottom-0 right-0 rounded-full ${
            size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-2.5 h-2.5' : 'w-4 h-4'
          } bg-green-500`}
        />
      )}
    </div>
  );
};

export default ProfileImage;