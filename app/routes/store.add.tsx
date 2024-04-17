// app/routes/store.add.tsx
import { json, ActionFunctionArgs } from '@remix-run/node'
import { storeCookie } from '~/auth/storage.server'
import { AddPackageToBasket } from '~/utils/tebex.server'

export async function action({ request }: ActionFunctionArgs) {
	try {
		const cookieHeader = request.headers.get('Cookie');
		
		if (!cookieHeader) {
			throw new Error('Cookie header not found.')
		}

		let storeCookies = await storeCookie.parse(cookieHeader) || {};

		if (!storeCookies.basketId) {
			throw new Error('User does not have a basket to add a package to.')
		}

		// Check if basketId already exists
		if (storeCookies.packages) {
			if (storeCookies.packages.some(pkg => pkg.id === 6154841)) {
				console.log('User already has a package added to a basket.')
				return json(
					{ error: 'User already has this package in their basket.' },
					{ status: 401 },
				)
			}
		}

		console.log('Attempting to add a package to the existing basket.')
		const packageResponse = await AddPackageToBasket(storeCookies.basketId)

		if (packageResponse && packageResponse.packages && packageResponse.links.checkout) {
			// Simplify package details
			const strippedPackages = packageResponse.packages.map((pkg) => {
				return {
					...pkg,
					description: '', // Empty out the description field
				};
			});

			const checkoutUrl = packageResponse.links.checkout;
		  
			// Store simplified data in the cookie
			storeCookies.packages = strippedPackages;
			storeCookies.checkoutUrl = checkoutUrl;
			const serializedCookie = await storeCookie.serialize(storeCookies);

			  // Set cookie or return response
			return json({ packages: strippedPackages, checkoutUrl: checkoutUrl }, {
				headers: {
				"Set-Cookie": serializedCookie
				}
			});
			} else {
			return json({ error: "Failed to add package to basket" }, { status: 400 });
			}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error adding package to basket:', error)
			return json({ error: error.message }, { status: 500 });
		} else {
			console.error("An unexpected error occurred during package add:", error);
			return json({ error: "An unexpected error occurred" }, { status: 500 });
		}
	}
};