import React from 'react';

export const profileImgErrorHandler = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.src = '/favicon.png';
};
