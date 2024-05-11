// components/atoms/LottieAnimation.tsx

import { Controls, Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

interface LottieAnimationProps {
    src: string
    style?: React.CSSProperties
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ src, style }) => (
    <Player autoplay loop={false} src={src} style={style} keepLastFrame={true}>
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
    </Player>
)

export default LottieAnimation