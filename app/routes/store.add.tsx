// app/routes/store.add.tsx
import { json, ActionFunctionArgs } from '@remix-run/node'
import { storeCookie } from '~/auth/storage.server';
import { AddPackageToBasket } from '~/utils/tebex.server';

export async function action({ request }: ActionFunctionArgs) {
	try {
		const cookieHeader = request.headers.get('Cookie');
		if (!cookieHeader) {
			throw new Error('Cookie header not found.');
		}
		
		let storeCookies = (await storeCookie.parse(cookieHeader)) || {}

		if (!storeCookies.basketId) {
			throw new Error('User does not have a basket to add a package to.');
		}
		
		console.log('Attempting to add a package to the existing basket.');
		const basket = await AddPackageToBasket(storeCookies.basketId);

		// Consider providing more information about the added package or the updated basket state
		return json({ message: 'Package added to existing basket successfully.', basket }, { status: 200 });
	} catch (error: unknown) {
		console.error('Error adding package to basket:', error);
		return json({ error: (error as Error).message || 'An unexpected error occurred.' }, { status: 400 });
	}
}
