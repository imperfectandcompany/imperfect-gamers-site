// ~/root.tsx
import { type LinksFunction } from '@remix-run/node'
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from '@remix-run/react'
import { ReactNode } from 'react'
import { ExternalScripts } from 'remix-utils/external-scripts'

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
				<ExternalScripts />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}



export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
	  return (
		<Document title={error.statusText}>
		  <section className="w-full h-svh bg-red-100 text-red-600">
			<h1 className="text-3xl">Oops!</h1>
			<p>There was an error:</p>
			<pre>
			  {error.status} {error.statusText || error.data}
			</pre>
			<Link to="/">Go home</Link>
		  </section>
		</Document>
	  );
	}
	if (error instanceof Error) {
	  return (
		<div>
		  <h1>Error</h1>
		  <p>{error.message}</p>
		  <p>The stack trace is:</p>
		  <pre>{error.stack}</pre>
		</div>
	  );
	}
	return <h1>Unknown Error</h1>;
  }
  
  function Document(props: { children: ReactNode, title?: string }) {
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
	);
  }
