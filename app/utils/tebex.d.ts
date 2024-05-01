// ~/utils/tebex.d.ts
import type { TebexCheckout, TebexEvents } from './tebex.interface'

declare global {
	interface Window {
		Tebex?: {
			checkout: TebexCheckout
			events: TebexEvents
		}
	}
}
