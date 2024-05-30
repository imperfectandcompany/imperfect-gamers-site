/**
 *
 * CREDITS TO https://github.com/remix-run/examples/blob/main/google-analytics/app/utils/gtags.client.ts
 *
 */
declare global {
	interface Window {
		gtag: (
			option: string,
			gaTrackingId: string,
			options: Record<string, unknown>,
		) => void
	}
}

/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
export const pageview = (url: string, trackingId: string) => {
	if (!window.gtag) {
		console.warn(
			'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
		)
		return
	}
	window.gtag('config', trackingId, {
		page_path: url,
	})
}

/**
 * @example
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
export const event = ({
	action,
	category,
	label,
	value,
}: Record<string, string>) => {
	if (!window.gtag) {
		console.warn(
			'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
		)
		return
	}
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	})
}

/**
 * @example
 * https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced#gtag.js_1
 */
export const consent = ({
	action,
	ad_storage,
	user_data,
	personalization,
	analytics_storage,
	w4update,
}: {
	action: 'update' | 'default'
	ad_storage: 'granted' | 'denied'
	user_data: 'granted' | 'denied'
	personalization: 'granted' | 'denied'
	analytics_storage: 'granted' | 'denied'
	w4update: number
}) => {
	if (!window.gtag) {
		console.warn(
			'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
		)
		return
	}
	window.gtag('consent', action, {
		ad_storage: ad_storage === 'granted' ? 'granted' : 'denied',
		ad_user_data: user_data === 'granted' ? 'granted' : 'denied',
		ad_personalization: personalization === 'granted' ? 'granted' : 'denied',
		analytics_storage: analytics_storage === 'granted' ? 'granted' : 'denied',
		wait_for_update: w4update,
	})
}
