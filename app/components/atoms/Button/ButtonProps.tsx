// components/atoms/Button/ButtonProps.tsx
import { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  icon?: IconDefinition;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}