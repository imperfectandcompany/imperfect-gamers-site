// ~/root.tsx
import { json, type LinksFunction } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from '@remix-run/react'
import { useEffect, type ReactNode } from 'react'
import { ExternalScripts } from 'remix-utils/external-scripts'
import stylesheet from '~/tailwind.css?url'
import * as gtag from '~/utils/gtags.client'

// import MsClarity from './utils/msclarity.client'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: stylesheet },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '194x194',
			href: '/favicon-194x194.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192x192',
			href: '/android-chrome-192x192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{ rel: 'manifest', href: '/site.webmanifest' },
		{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#e50f0f' },
	]
}

export const meta: MetaFunction = () => {
	return [
		{
			'msapplication-TileColor': '#b91d47',
			'theme-color': '#333333',
			'script:ld+json': {
				'@context': 'https://schema.org',
				'@type': 'Imperfect and Company',
				name: 'Imperfect and Company',
				url: 'https://imperfectandcompany.com',
			},
		},
	]
}

// Load the GA tracking id from the .env
export const loader = async () => {
	return json({
		gaTrackingId: process.env.GA_TRACKING_ID,
		msClarityId: process.env.MS_CLARITY_ID,
	})
}

const gTagMsClarityFlag = true

declare global {
	interface Window {
		clarity: (command: string) => void
	}
}

// function loadClarityScript() {
// 	const msClarityId = process.env.MS_CLARITY_ID;
// 	if (!msClarityId) return;

// 	const clarityScript = document.createElement('script');
// 	clarityScript.src = `https://www.clarity.ms/tag/${msClarityId}`;
// 	clarityScript.async = true;
// 	clarityScript.onload = () => {
// 		console.log('Clarity script loaded successfully.');
// 		// Check for consent immediately after loading
// 		checkAndApplyConsent();
// 	};
// 	clarityScript.onerror = () => {
// 		console.error('Failed to load the Clarity script');
// 	};
// 	document.head.appendChild(clarityScript);
// }

// function checkAndApplyConsent() {
// 	const storedSettings = localStorage.getItem('cookieSettings');
// 	if (storedSettings) {
// 		const settings = JSON.parse(storedSettings);
// 		if (settings.analytics.microsoftClarity) {
// 			window.clarity('consent');
// 		}
// 	}
// }

export function Layout({ children }: { children: React.ReactNode }) {
	const { gaTrackingId, msClarityId } = useLoaderData<typeof loader>()

	const consentListener = () => {
		const storedSettings = localStorage.getItem('cookieSettings')
		if (storedSettings) {
			const settings = JSON.parse(storedSettings)
			if (settings.analytics.microsoftClarity && msClarityId) {
				if (!window.clarity) {
					console.warn(
						'window.clarity is not defined. This could mean the Microsoft Clarity script has not loaded on the page yet.',
					)
				} else {
					window.clarity('consent')
				}
			}

			if (settings.analytics.googleAnalytics && gaTrackingId) {
				console.info('Consent Granted for GA4.')
				gtag.consent({
					action: 'default',
					ad_storage: 'granted',
					user_data: 'granted',
					personalization: 'granted',
					analytics_storage: 'granted',
					// Our consent banner comes up after 500ms
					w4update: 550, // milliseconds
				})
			} else {
				console.info('Consent Not Granted for GA4.')
			}
		}
	}
	useEffect(() => {
		if (gTagMsClarityFlag) {
			if (gaTrackingId) {
				gtag.pageview(window.location.pathname, gaTrackingId)
			}

			const storedSettings = localStorage.getItem('cookieSettings')
			if (storedSettings) {
				const settings = JSON.parse(storedSettings)
				if (settings.analytics.microsoftClarity && msClarityId) {
					if (!window.clarity) {
						console.warn(
							'window.clarity is not defined. This could mean the Microsoft Clarity script has not loaded on the page yet.',
						)
					} else {
						window.clarity('consent')
					}
				}

				if (settings.analytics.googleAnalytics && gaTrackingId) {
					console.info('Consent Granted for GA4.')
					gtag.consent({
						action: 'default',
						ad_storage: 'granted',
						user_data: 'granted',
						personalization: 'granted',
						analytics_storage: 'granted',
						// Our consent banner comes up after 500ms
						w4update: 550, // milliseconds
					})
				} else {
					console.warn('Consent Not Granted for GA4.')
				}
			}

			// if (msClarityId) {
			// 	// Loads MsClarity - session cookies disabled - requires consent
			// 	MsClarity({ id: msClarityId, enableInDevMode: true })
			// }

			window.addEventListener('consentGranted', consentListener)

			// Cleanup event listeners when the component unmounts
			return () => {
				window.removeEventListener('consentGranted', consentListener)
			}
		}
	}, [gaTrackingId, msClarityId])

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
				<Meta />
				<Links />
			</head>
			<body className="background-svg relative flex flex-col bg-black">
				{process.env.NODE_ENV === 'development' || !gaTrackingId ? null : (
					<>
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
						/>
						<script
							async
							id="gtag-init"
							dangerouslySetInnerHTML={{
								__html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
							}}
						/>
					</>
				)}
				{process.env.NODE_ENV === 'development' || !msClarityId ? null : (
					<>
						<script async src={`https://www.clarity.ms/tag/${msClarityId}`} />
						<script
							async
							id="clarity-init"
							dangerouslySetInnerHTML={{
								__html: `
                    (function(c,l,a,r,i,t,y){
                        c[a] = c[a] || function() {(c[a].q = c[a].q || []).push(arguments)};
                        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/"+i;
                        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
                    })(window, document, "clarity", "script", "${msClarityId}");
                `,
							}}
						/>
					</>
				)}

				<main>{children}</main>
				<ScrollRestoration />
				<Scripts />
				<ExternalScripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary() {
	const error = useRouteError()
	if (isRouteErrorResponse(error)) {
		return (
			<Document title={error.statusText}>
				<section className="h-svh w-full bg-red-100 text-red-600">
					<h1 className="text-3xl">Oops!</h1>
					<p>There was an error:</p>
					<pre>
						{error.status} {error.statusText || error.data}
					</pre>
					<Link to="/">Go home</Link>
				</section>
			</Document>
		)
	}
	if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		)
	}
	return <h1>Unknown Error</h1>
}

function Document(props: { children: ReactNode; title?: string }) {
	return (
		<html lang="en">
			<head>
				{props.title ? <title>{props.title}</title> : null}
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{props.children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
