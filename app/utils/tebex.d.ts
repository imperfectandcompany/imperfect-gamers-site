// ~/utils/tebex.d.ts
import type { TebexCheckout } from './tebex.interface'

declare global {
	interface Window {
		Tebex?: {
			checkout: TebexCheckout
			events: {
				[key: string]: string
			}
		}
	}
}
