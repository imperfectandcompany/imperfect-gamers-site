// TextElement.tsx
import React from 'react';

interface TextElementProps {
  text: string;
  className?: string;
}

const TextElement: React.FC<TextElementProps> = ({ text, className }) => (
  <span className={className}>{text}</span>
);

export default TextElement;
