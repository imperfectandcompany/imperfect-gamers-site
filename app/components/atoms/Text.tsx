// Text.tsx
import React from 'react';

type TextProps = {
	children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({children}) => {
	return <p>{children}</p>;
};

export default Text;
