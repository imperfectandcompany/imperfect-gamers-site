// Image.tsx
import type React from 'react'

type ImageProps = {
	src: string
	alt: string
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
	return <img src={src} alt={alt} />
}

export default Image
