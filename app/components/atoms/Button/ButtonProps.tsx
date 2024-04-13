// components/atoms/Button/ButtonProps.tsx
import { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Represents the props for the Button component.
 */
export interface ButtonProps {
  /**
   * The variant of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';
  
  /**
   * The type of the button.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * The icon to be displayed on the button.
   */
  icon?: IconDefinition;
  
  /**
   * The content to be displayed inside the button.
   */
  children: ReactNode;
  
  /**
   * The function to be called when the button is clicked.
   */
  onClick?: () => void;
  
  /**
   * The CSS class name for the button.
   */
  className?: string;
}