// components/molecules/CheckoutProcess/TebexCheckout.tsx

// The TebexCheckout component is responsible for initiating the Tebex checkout process. It uses the UseTebexCheckout function to set up the Tebex checkout configuration and event listeners. The initiateCheckout function is called when the component mounts, and it checks if the basket ID and the required package (with the ID 6154841) are present before launching the Tebex checkout.
// The setCloseInterceptReason prop is used to manage the modal close intercept reason based on the Tebex checkout events.

import React, { useCallback } from 'react'
import { CloseInterceptReason } from '~/components/organism/ModalWrapper/ModalWrapper'

interface TebexCheckoutProps {
  basketId: string | null
  packages: any[]
  setCloseInterceptReason?: (reason: CloseInterceptReason) => void
}

const TebexCheckout: React.FC<TebexCheckoutProps> = ({
  basketId,
  packages,
  setCloseInterceptReason,
}) => {
  const UseTebexCheckout = useCallback(
    (checkoutId: string, theme: 'light' | 'dark') => {
      const { Tebex } = window

      if (!Tebex) return

      const config = {
        ident: checkoutId,
        theme: theme,
      }

      Tebex.checkout.init(config)

      // Listen for Tebex checkout events and set modal close intercept reasons accordingly
      Tebex.checkout.on(Tebex.events.OPEN, () => {
        console.log('Tebex Checkout Opened')
        if (setCloseInterceptReason) {
          setCloseInterceptReason(CloseInterceptReason.ActivePopup)
        }
      })

      Tebex.checkout.on(Tebex.events.CLOSE, () => {
        console.log('Tebex Checkout Closed')
        if (setCloseInterceptReason) {
          setCloseInterceptReason(CloseInterceptReason.None)
        }
      })

      Tebex.checkout.on(Tebex.events.PAYMENT_COMPLETE, () => {
        console.log('Payment Complete')
        if (setCloseInterceptReason) {
          setCloseInterceptReason(CloseInterceptReason.None)
        }
      })

      Tebex.checkout.on(Tebex.events.PAYMENT_ERROR, () => {
        console.log('Payment Error')
        if (setCloseInterceptReason) {
          setCloseInterceptReason(CloseInterceptReason.None)
        }
      })

      Tebex.checkout.launch()
    },
    [setCloseInterceptReason],
  )

  const initiateCheckout = useCallback(() => {
    if (basketId && packages.some(pkg => pkg.id === 6154841)) {
      console.log('Initiating checkout...')
      UseTebexCheckout(basketId, 'dark')
    }
  }, [basketId, packages, UseTebexCheckout])

  React.useEffect(() => {
    initiateCheckout()
  }, [initiateCheckout])

  return null
}

export default TebexCheckout