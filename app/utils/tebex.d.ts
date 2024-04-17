// ~/utils/tebex.d.ts
import { TebexCheckout } from './tebex.interface';

declare global {
  interface Window {
    Tebex?: {
      checkout: TebexCheckout;
      events: {
        [key: string]: string;
      };
    };
  }
}