// components/molecules/CheckoutProcess/BasketManager.tsx

//In this implementation, the BasketManager component handles the creation of a basket if it doesn't exist. It uses the useFetcherWithPromise hook to submit a POST request to the /store/create route and updates the basketId state with the response.
import { useFetcherWithPromise } from '~/utils/general'

export const useCreateBasket = async () => {
	const { submit } = useFetcherWithPromise()

	console.log('Creating basket...')
	try {
		const response = await submit(null, {
			method: 'post',
			action: '/store/create',
		})
		return response.basketId
	} catch (error) {
		console.error('Failed to create basket:', error)
		throw error
	}
}

export const useAddPackageToBasket = async (basketId: string) => {
	const { submit } = useFetcherWithPromise()

	console.log('Adding package to basket...')
	try {
		const response = await submit(
			{ basketId },
			{ method: 'post', action: '/store/add' },
		)
		return response.packages
	} catch (error) {
		console.error('Failed to add package:', error)
		throw error
	}
}
