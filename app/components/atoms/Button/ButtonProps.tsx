// ButtonProps.ts
import { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'; // Add more variants as needed
  icon?: IconDefinition;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
