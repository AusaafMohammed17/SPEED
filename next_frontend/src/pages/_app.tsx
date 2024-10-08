import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global styles

const SPEED: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default SPEED;