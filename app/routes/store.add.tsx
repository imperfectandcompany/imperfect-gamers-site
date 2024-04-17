// app/routes/store.add.tsx
import { json, ActionFunctionArgs } from '@remix-run/node'
import { storeCookie } from '~/auth/storage.server';
import { AddPackageToBasket } from '~/utils/tebex.server';

export async function action({ request }: ActionFunctionArgs) {
	const cookieHeader = request.headers.get('Cookie');
    let storeCookies = await storeCookie.parse(cookieHeader) || {};
	
	if (storeCookies.basketId) {
		console.log('Attempting to add a package to the existing basket.');
		try {
			const basket = await AddPackageToBasket(storeCookies.basketId);
			console.log('Package added to basket successfully.');
			// Consider providing more information about the added package or the updated basket state
			return json({ message: 'Package added to existing basket successfully.', basket }, { status: 200 });
		} catch (error) {
			console.error("Failed to add package to basket:", error);
			// Return an error message with a status indicating failure (e.g., 400 Bad Request)
			return json({ error: 'Failed to add package to basket.', details: error }, { status: 400 });
		}
	}
}