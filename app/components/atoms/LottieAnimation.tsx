import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

interface LottieAnimationProps {
  src: string;
  style?: React.CSSProperties;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ src, style }) => (
  <Player autoplay loop src={src} style={style} background="transparent" keepLastFrame={true} />
);

export default LottieAnimation;
