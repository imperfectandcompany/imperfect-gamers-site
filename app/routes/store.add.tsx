import { json } from '@remix-run/node'
import type { ActionFunctionArgs } from '@remix-run/node'
import { storeCookie } from '~/auth/storage.server'
import { AddPackageToBasket } from '~/utils/tebex.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	try {
		const cookieHeader = request.headers.get('Cookie')

		if (!cookieHeader) {
			throw new Error('Cookie header not found.')
		}

		const storeCookies = (await storeCookie.parse(cookieHeader)) || {}

		if (!storeCookies.basketId) {
			throw new Error('User does not have a basket to add a package to.')
		}

		if (storeCookies.packages) {
			if (storeCookies.packages.some(pkg => pkg.id === 6288193)) {
				console.log('User already has a package added to a basket.')
				return json(
					{ error: 'User already has this package in their basket.' },
					{ status: 401 },
				)
			}
		}

		console.log('Attempting to add a package to the existing basket.')
		const packageResponse = await AddPackageToBasket(storeCookies.basketId)

		if (packageResponse?.packages && packageResponse.links.checkout) {
			const strippedPackages = packageResponse.packages.map(pkg => ({
				...pkg,
				description: '',
			}))

			const checkoutUrl = packageResponse.links.checkout
			storeCookies.packages = strippedPackages
			storeCookies.checkoutUrl = checkoutUrl

			return json(
				{ packages: strippedPackages, checkoutUrl },
				{
					headers: {
						'Set-Cookie': await storeCookie.serialize(storeCookies),
					},
				},
			)
		} else {
			return json({ error: 'Failed to add package to basket' }, { status: 400 })
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error adding package to basket:', error)
			return json({ error: error.message }, { status: 500 })
		} else {
			console.error('An unexpected error occurred:', error)
			return json({ error: 'An unexpected error occurred' }, { status: 500 })
		}
	}
}
