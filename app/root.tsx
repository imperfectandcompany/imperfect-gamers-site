import { type LinksFunction } from '@remix-run/node'

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import stylesheet from '~/tailwind.css?url'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
]

// http://localhost:5173/store/

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="background-svg relative flex flex-col bg-black px-4 text-white sm:px-8 md:px-12">
				<main className="space-y-24 md:mx-72 md:space-y-12">{children}</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
