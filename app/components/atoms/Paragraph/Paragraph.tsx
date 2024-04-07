// components/atoms/Paragraph/Paragraph.tsx
import React, { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <p className={`mt-4 ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;