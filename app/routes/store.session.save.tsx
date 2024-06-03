import { json, type ActionFunctionArgs } from '@remix-run/node'
import { getSession } from '~/auth/storage.server'

async function updateCheckoutDetails(
	userToken: string,
	data: { basket_id: string; package_id: number; checkout_url: string },
) {
	const response = await fetch(
		'https://api.imperfectgamers.org/user/updateCheckoutDetails',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `${userToken}`,
			},
			body: JSON.stringify(data),
		},
	)

	if (response.ok) {
		const result = await response.json()
		return result
	} else {
		throw new Error('Failed to update checkout details')
	}
}

export const action = async ({ request }: ActionFunctionArgs) => {
	try {
		const cookieHeader = request.headers.get('Cookie')
		const session = await getSession(cookieHeader)
		const userToken = session.get('userToken')
		const formData = await request.formData()

		const basket_id = formData.get('basket_id')
		const checkout_url = formData.get('checkout_url')
		const package_id = formData.get('package_id')

		if (!cookieHeader) {
			throw new Error('Cookie header not found.')
		}

		if (!userToken) {
			throw new Error('User token not found.')
		}

		if (!basket_id) {
			throw new Error('User does not have a basket to add to the database.')
		}

		if (!checkout_url) {
			throw new Error(
				'User does not have a checkout URL to add to the database.',
			)
		}

		if (!package_id) {
			throw new Error('User does not have a package_id to add to the database.')
		}

		let data = {
			basket_id: basket_id as string,
			package_id: package_id as unknown as number,
			checkout_url: checkout_url as string,
		}

		const checkOutDetails = await updateCheckoutDetails(userToken, data)
		if (
			checkOutDetails?.status &&
			checkOutDetails.status === 'success' &&
			checkOutDetails.message
		) {
			return json(
				{
					message: checkOutDetails.message,
				},
				{
					status: 200, // Assuming you want to return a 200 OK status
				},
			)
		} else {
			return json(
				{ error: 'Failed to update checkout details' },
				{ status: 400 },
			)
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('An error occurred while updating checkout details:', error)
			return json({ error: error.message }, { status: 500 })
		} else {
			console.error(
				'[store.session.save.tsx] An unexpected error occurred:',
				error,
			)
			return json(
				{ error: '[store.session.save.tsx] An unexpected error occurred' },
				{ status: 500 },
			)
		}
	}
}
