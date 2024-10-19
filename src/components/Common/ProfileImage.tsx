import React from 'react';
import { profileImgErrorHandler } from '../../utils/imageUtils';

interface ProfileImageProps {
  className: string;
  src: string | null;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, className = '' }) => {
  return <img className={className} src={src || '/favicon.png'} onError={profileImgErrorHandler} />;
};

export default ProfileImage;
