// components/molecules/CheckoutProcess/TebexCheckout.tsx

// The TebexCheckout component is responsible for initiating the Tebex checkout process. It uses the UseTebexCheckout function to set up the Tebex checkout configuration and event listeners. The initiateCheckout function is called when the component mounts.
// The setCloseInterceptReason prop is used to manage the modal close intercept reason based on the Tebex checkout events.

import { useCallback } from 'react';
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper';
import type { TebexCheckoutConfig } from '~/utils/tebex.interface';

interface TebexCheckoutProps {
  setCloseInterceptReason?: (reason: CloseInterceptReason) => void;
}

const TebexCheckout = ({ setCloseInterceptReason }: TebexCheckoutProps) => {
  const UseTebexCheckout = useCallback(
    (checkoutId: string, theme: 'light' | 'dark') => {
      const { Tebex } = window;

      if (!Tebex) return;

      const config: TebexCheckoutConfig = {
        ident: checkoutId,
        theme: theme,
      };

      Tebex.checkout.init(config);

      // Listen for Tebex checkout events and set modal close intercept reasons accordingly
      Tebex.checkout.on(Tebex.events.OPEN, () => {
        console.log('Tebex Checkout Opened');
        setCloseInterceptReason?.(CloseInterceptReason.ActivePopup);
      });

      Tebex.checkout.on(Tebex.events.CLOSE, () => {
        console.log('Tebex Checkout Closed');
        setCloseInterceptReason?.(CloseInterceptReason.None);
      });

      Tebex.checkout.on(Tebex.events.PAYMENT_COMPLETE, () => {
        console.log('Payment Complete');
        setCloseInterceptReason?.(CloseInterceptReason.None);
      });

      Tebex.checkout.on(Tebex.events.PAYMENT_ERROR, () => {
        console.log('Payment Error');
        setCloseInterceptReason?.(CloseInterceptReason.None);
      });

      Tebex.checkout.launch();
    },
    [setCloseInterceptReason],
  );

  const initiateCheckout = (basketId: string) => {
    console.log('Initiating Tebex checkout...');
    setCloseInterceptReason?.(CloseInterceptReason.RequestInProgress);
    UseTebexCheckout(basketId, 'dark');
  };

  return { initiateCheckout };
};

export default TebexCheckout;