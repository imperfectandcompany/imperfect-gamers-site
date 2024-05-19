// ~/root.tsx
import { json, type LinksFunction } from '@remix-run/node'
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
import * as gtag from '~/utils/gtags.client'

import stylesheet from '~/tailwind.css?url'
import MsClarity from './utils/msclarity.client'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
]

// Load the GA tracking id from the .env
export const loader = async () => {
	return json({
		gaTrackingId: process.env.GA_TRACKING_ID,
		msClarityId: process.env.MS_CLARITY_ID,
	})
}

// http://localhost:5173/store/

const gTagMsClarityFlag = false;

export function Layout({ children }: { children: React.ReactNode }) {
	const { gaTrackingId, msClarityId } = useLoaderData<typeof loader>()
	if (process.env.NODE_ENV !== 'development' && gTagMsClarityFlag) {
		useEffect(() => {
			if (gaTrackingId) {
				gtag.pageview(window.location.pathname, gaTrackingId)
			}
			if (msClarityId) {
				MsClarity({ id: msClarityId, enableInDevMode: false })
			}
		}, [gaTrackingId, msClarityId])
	}
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="background-svg relative flex flex-col bg-black px-4 text-white sm:px-8 md:px-12">
				{/* {process.env.NODE_ENV === 'development' || !gaTrackingId ? null : (
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
				)} */}
				<main className="space-y-24 md:mx-72 md:space-y-12">{children}</main>
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
