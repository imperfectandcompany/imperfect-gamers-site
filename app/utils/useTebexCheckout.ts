// ~/utils/useTebexCheckout.ts
import { useEffect } from 'react'
import { useHydrated } from 'remix-utils/use-hydrated'

export function useTebexCheckout(checkoutId: string, theme: 'light' | 'dark') {
	const isHydrated = useHydrated()

	useEffect(() => {
		if (isHydrated && window.Tebex) {
			const config = {
				ident: checkoutId,
				theme: theme,
			}
			window.Tebex.checkout.init(config)
			window.Tebex.checkout.launch()
		}
	}, [isHydrated, checkoutId, theme])
}
